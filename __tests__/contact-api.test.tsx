/**
 * Contact API Integration Tests
 *
 * Run these tests after setting up your .env.local file:
 * pnpm test contact-api
 *
 * Or run all tests:
 * pnpm test
 */

import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

// Mock environment variables for testing
const mockEnv = {
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "test@example.com",
  SMTP_PASS: "test-password",
  CONTACT_TO: "test@example.com",
  CONTACT_FROM: "test@example.com",
};

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: "test-message-id" }),
  })),
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv, ...mockEnv };
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

describe("Contact API", () => {
  const createMockRequest = (body: any): NextRequest => {
    return new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.1",
      },
      body: JSON.stringify(body),
    });
  };

  describe("POST /api/contact", () => {
    it("should accept valid contact submission", async () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-123-4567",
        subject: "general",
        message:
          "This is a test message to verify the contact form is working properly.",
      };

      const request = createMockRequest(validData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.ok).toBe(true);
    });

    it("should handle honeypot field correctly", async () => {
      const honeypotData = {
        name: "Spam Bot",
        email: "spam@bot.com",
        subject: "general",
        message: "Spam message",
        website: "http://spam.com", // honeypot field
      };

      const request = createMockRequest(honeypotData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.ok).toBe(true);
    });

    it("should reject invalid email format", async () => {
      const invalidData = {
        name: "Test User",
        email: "invalid-email",
        subject: "general",
        message: "Test message",
      };

      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should reject missing required fields", async () => {
      const incompleteData = {
        name: "Test User",
        email: "test@example.com",
        // missing subject and message
      };

      const request = createMockRequest(incompleteData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should reject message that is too short", async () => {
      const shortMessageData = {
        name: "Test User",
        email: "test@example.com",
        subject: "general",
        message: "Hi", // too short
      };

      const request = createMockRequest(shortMessageData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should reject name that is too long", async () => {
      const longNameData = {
        name: "A".repeat(150), // too long
        email: "test@example.com",
        subject: "general",
        message: "Test message",
      };

      const request = createMockRequest(longNameData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should handle server errors gracefully", async () => {
      // Mock nodemailer to throw an error
      const nodemailer = require("nodemailer");
      nodemailer.createTransport.mockReturnValue({
        sendMail: jest.fn().mockRejectedValue(new Error("SMTP Error")),
      });

      const validData = {
        name: "Test User",
        email: "test@example.com",
        subject: "general",
        message: "Test message",
      };

      const request = createMockRequest(validData);
      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.ok).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("Rate Limiting", () => {
    it("should enforce rate limiting", async () => {
      const testData = {
        name: "Rate Test User",
        email: "ratetest@example.com",
        subject: "general",
        message: "Testing rate limiting",
      };

      // Send 6 requests (limit is 5 per minute)
      const requests = [];
      for (let i = 0; i < 6; i++) {
        const request = createMockRequest(testData);
        requests.push(POST(request));
      }

      const responses = await Promise.all(requests);
      const results = await Promise.all(responses.map((r) => r.json()));

      // First 5 should succeed
      for (let i = 0; i < 5; i++) {
        expect(responses[i].status).toBe(200);
        expect(results[i].ok).toBe(true);
      }

      // 6th should be rate limited
      expect(responses[5].status).toBe(429);
      expect(results[5].ok).toBe(false);
      expect(results[5].error).toBe("Rate limit exceeded");
    });
  });
});

// Integration test for email sending (only run if SMTP is configured)
describe("Email Integration (requires .env.local)", () => {
  const isEmailConfigured = () => {
    return (
      process.env.SMTP_PASS &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS !== "test-password"
    );
  };

  it("should send email when SMTP is properly configured", async () => {
    if (!isEmailConfigured()) {
      console.log("⚠️  Skipping email integration test - SMTP not configured");
      return;
    }

    const validData = {
      name: "Integration Test User",
      email: "integration@example.com",
      phone: "555-987-6543",
      subject: "integration",
      message: "This is an integration test to verify email sending works.",
    };

    const request = createMockRequest(validData);
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.ok).toBe(true);
  }, 10000); // 10 second timeout for email sending
});
