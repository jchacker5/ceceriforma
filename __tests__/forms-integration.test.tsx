/**
 * Forms Integration Tests
 * 
 * Tests all forms to ensure they work correctly before schema migration
 * Run with: pnpm test forms-integration
 */

import { POST as contactPost } from "@/app/api/contact/route";
import { POST as volunteerPost } from "@/app/api/volunteer/route";
import { POST as donationPost } from "@/app/api/create-checkout-session/route";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { volunteers } from "@/lib/db/schema";

// Mock environment variables
const mockEnv = {
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "test@example.com",
  SMTP_PASS: "test-password",
  CONTACT_TO: "test@example.com",
  CONTACT_FROM: "test@example.com",
  STRIPE_SECRET_KEY: "sk_test_1234567890",
  POSTGRES_URL: "postgresql://test:test@localhost:5432/test",
};

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: "test-message-id" }),
  })),
}));

// Mock Stripe
jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({
          url: "https://checkout.stripe.com/test",
          id: "cs_test_1234567890",
        }),
      },
    },
    paymentMethods: {
      list: jest.fn().mockResolvedValue({ data: [] }),
    },
  }));
});

// Mock database
jest.mock("@/lib/db", () => ({
  db: {
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn().mockResolvedValue([{ id: "test-id" }]),
      })),
    })),
    execute: jest.fn().mockResolvedValue({}),
  },
}));

const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv, ...mockEnv };
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

describe("Forms Integration Tests", () => {
  const createMockRequest = (body: any, endpoint: string): NextRequest => {
    return new NextRequest(`http://localhost:3000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "127.0.0.1",
      },
      body: JSON.stringify(body),
    });
  };

  describe("Contact Form", () => {
    it("should handle valid contact submission", async () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-123-4567",
        subject: "general",
        message: "This is a test message to verify the contact form is working properly.",
      };

      const request = createMockRequest(validData, "contact");
      const response = await contactPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.ok).toBe(true);
    });

    it("should reject invalid contact data", async () => {
      const invalidData = {
        name: "Test User",
        email: "invalid-email",
        subject: "general",
        message: "Hi", // too short
      };

      const request = createMockRequest(invalidData, "contact");
      const response = await contactPost(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.ok).toBe(false);
    });
  });

  describe("Volunteer Form", () => {
    it("should handle valid volunteer submission", async () => {
      const validData = {
        name: "Test Volunteer",
        email: "volunteer@example.com",
        phone: "555-123-4567",
        tasks: ["Canvassing", "Phone Banking"],
        availability: "Weekends",
        message: "I want to help with the campaign.",
      };

      const request = createMockRequest(validData, "volunteer");
      const response = await volunteerPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it("should handle volunteer submission with minimal data", async () => {
      const minimalData = {
        name: "Test Volunteer",
        email: "volunteer@example.com",
        tasks: [],
        availability: "",
        message: "",
      };

      const request = createMockRequest(minimalData, "volunteer");
      const response = await volunteerPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
    });
  });

  describe("Donation Form", () => {
    it("should create checkout session for valid donation", async () => {
      const validData = {
        amount: 2500, // $25.00 in cents
        donorInfo: {
          name: "Test Donor",
          email: "donor@example.com",
          address: "123 Test St",
          city: "Test City",
          state: "MA",
          zip: "02101",
          occupation: "Software Engineer",
          employer: "Test Company",
        },
      };

      const request = createMockRequest(validData, "create-checkout-session");
      const response = await donationPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.url).toBeDefined();
      expect(result.url).toContain("checkout.stripe.com");
    });

    it("should handle donation without required info for small amounts", async () => {
      const smallDonationData = {
        amount: 1000, // $10.00 in cents
        donorInfo: {
          name: "Test Donor",
          email: "donor@example.com",
          // No address/occupation required for amounts under $200
        },
      };

      const request = createMockRequest(smallDonationData, "create-checkout-session");
      const response = await donationPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.url).toBeDefined();
    });

    it("should reject donation without Stripe configuration", async () => {
      // Temporarily remove Stripe key
      delete process.env.STRIPE_SECRET_KEY;

      const validData = {
        amount: 2500,
        donorInfo: {
          name: "Test Donor",
          email: "donor@example.com",
        },
      };

      const request = createMockRequest(validData, "create-checkout-session");
      const response = await donationPost(request);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.error).toBeDefined();
    });
  });

  describe("Form Validation", () => {
    it("should validate email formats across all forms", async () => {
      const invalidEmails = [
        "invalid-email",
        "test@",
        "@example.com",
        "test..test@example.com",
      ];

      for (const email of invalidEmails) {
        const contactData = {
          name: "Test User",
          email,
          subject: "general",
          message: "Test message",
        };

        const request = createMockRequest(contactData, "contact");
        const response = await contactPost(request);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.ok).toBe(false);
      }
    });

    it("should validate required fields across all forms", async () => {
      // Test contact form without required fields
      const incompleteContact = {
        name: "Test User",
        // missing email, subject, message
      };

      const contactRequest = createMockRequest(incompleteContact, "contact");
      const contactResponse = await contactPost(contactRequest);
      const contactResult = await contactResponse.json();

      expect(contactResponse.status).toBe(400);
      expect(contactResult.ok).toBe(false);

      // Test volunteer form without required fields
      const incompleteVolunteer = {
        // missing name and email
        tasks: [],
      };

      const volunteerRequest = createMockRequest(incompleteVolunteer, "volunteer");
      const volunteerResponse = await volunteerPost(volunteerRequest);
      const volunteerResult = await volunteerResponse.json();

      expect(volunteerResponse.status).toBe(500); // Database constraint error
    });
  });

  describe("Rate Limiting", () => {
    it("should enforce rate limiting on contact form", async () => {
      const testData = {
        name: "Rate Test User",
        email: "ratetest@example.com",
        subject: "general",
        message: "Testing rate limiting",
      };

      // Send 6 requests (limit is 5 per minute)
      const requests = [];
      for (let i = 0; i < 6; i++) {
        const request = createMockRequest(testData, "contact");
        requests.push(contactPost(request));
      }

      const responses = await Promise.all(requests);
      const results = await Promise.all(responses.map((r) => r.json()));

      // Last request should be rate limited
      expect(responses[5].status).toBe(429);
      expect(results[5].error).toBe("Rate limit exceeded");
    });
  });

  describe("Database Integration", () => {
    it("should save volunteer data to database", async () => {
      const volunteerData = {
        name: "Database Test Volunteer",
        email: "db-test@example.com",
        phone: "555-123-4567",
        tasks: ["Canvassing"],
        availability: "Weekends",
        message: "Database test",
      };

      const request = createMockRequest(volunteerData, "volunteer");
      const response = await volunteerPost(request);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data[0].id).toBe("test-id");
    });
  });
}); 