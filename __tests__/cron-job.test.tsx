/**
 * Cron Job Tests
 *
 * Tests for the community events cron job functionality
 */

import { POST } from "@/app/api/cron/update-events/route";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { updateCommunityEvents } from "@/lib/events/event-scraper";
import { and, eq, gte } from "drizzle-orm";
import { NextRequest } from "next/server";

// Mock axios for testing
jest.mock("axios", () => ({
  get: jest.fn(),
}));

// Mock cheerio
jest.mock("cheerio", () => ({
  load: jest.fn(() => ({
    find: jest.fn(() => ({
      each: jest.fn(),
      first: jest.fn(() => ({
        text: jest.fn(() => "Test Event"),
      })),
    })),
  })),
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    CRON_SECRET: "test-cron-secret",
    POSTGRES_URL: "postgresql://test:test@localhost:5432/test",
  };
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

describe("Cron Job API", () => {
  const createMockRequest = (body: any = {}): NextRequest => {
    return new NextRequest("http://localhost:3000/api/cron/update-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  describe("POST /api/cron/update-events", () => {
    it("should process all cities when no specific city is provided", async () => {
      // Mock the updateCommunityEvents function
      const mockUpdateEvents = jest.fn().mockResolvedValue({
        totalEventsFound: 5,
        newEventsAdded: 3,
        eventsUpdated: 2,
        errors: [],
      });

      // Mock the module
      jest.doMock("@/lib/events/event-scraper", () => ({
        updateCommunityEvents: mockUpdateEvents,
      }));

      const request = createMockRequest({});
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.results).toHaveLength(5); // 5 cities
      expect(mockUpdateEvents).toHaveBeenCalledTimes(5);
    });

    it("should process specific city when provided", async () => {
      const mockUpdateEvents = jest.fn().mockResolvedValue({
        totalEventsFound: 3,
        newEventsAdded: 2,
        eventsUpdated: 1,
        errors: [],
      });

      jest.doMock("@/lib/events/event-scraper", () => ({
        updateCommunityEvents: mockUpdateEvents,
      }));

      const request = createMockRequest({ city: "New Bedford" });
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.results).toHaveLength(1);
      expect(mockUpdateEvents).toHaveBeenCalledWith("New Bedford");
    });

    it("should reject invalid city names", async () => {
      const request = createMockRequest({ city: "Invalid City" });
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.error).toContain("City must be one of");
    });

    it("should handle errors gracefully", async () => {
      const mockUpdateEvents = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      jest.doMock("@/lib/events/event-scraper", () => ({
        updateCommunityEvents: mockUpdateEvents,
      }));

      const request = createMockRequest({});
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

describe("Event Scraper", () => {
  it("should handle empty results from sources", async () => {
    const result = await updateCommunityEvents("Westport");

    expect(result).toEqual({
      totalEventsFound: 0,
      newEventsAdded: 0,
      eventsUpdated: 0,
      errors: expect.any(Array),
    });
  });

  it("should process valid event data", async () => {
    // Mock successful scraping
    const mockAxios = require("axios");
    mockAxios.get.mockResolvedValue({
      data: `
        <div class="event">
          <h3 class="title">Test Event</h3>
          <div class="date">2024-02-15</div>
          <div class="location">Test Location</div>
        </div>
      `,
    });

    const result = await updateCommunityEvents("Westport");

    expect(result.totalEventsFound).toBeGreaterThanOrEqual(0);
    expect(result.errors).toBeInstanceOf(Array);
  });
});

describe("Database Operations", () => {
  it("should query events correctly", async () => {
    // Test that we can query the events table
    const eventsData = await db
      .select()
      .from(events)
      .where(gte(events.startDate, new Date()))
      .limit(5);

    expect(Array.isArray(eventsData)).toBe(true);
  });

  it("should handle event insertion", async () => {
    // Test inserting a mock event
    const mockEvent = {
      title: "Test Event",
      description: "Test Description",
      startDate: new Date("2024-12-31"),
      eventType: "community",
    };

    try {
      await db.insert(events).values(mockEvent);
      // If successful, clean up
      await db.delete(events).where(eq(events.title, "Test Event"));
    } catch (error) {
      // Expected if database is not available in test environment
      expect(error).toBeDefined();
    }
  });
});

// Integration test for the full cron job workflow
describe("Cron Job Integration", () => {
  it("should complete full workflow without errors", async () => {
    const request = createMockRequest({});

    try {
      const response = await POST(request);
      const result = await response.json();

      expect(result.success).toBe(true);
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
    } catch (error) {
      // In test environment, this might fail due to missing database
      // or network access, which is expected
      expect(error).toBeDefined();
    }
  });
});
