#!/usr/bin/env node

/**
 * Schema Validation Script
 *
 * Validates that the current Drizzle schema matches form requirements
 * Run with: node scripts/validate-schema.js
 */

const { db } = require("../lib/db/index.ts");
const {
  volunteers,
  donations,
  socialPosts,
  events,
  issues,
} = require("../lib/db/schema.ts");

async function validateSchema() {
  console.log("🔍 Validating Database Schema...\n");

  try {
    // Test database connection
    await db.execute("SELECT 1");
    console.log("✅ Database connection successful");

    // Validate volunteers table structure
    console.log("\n📋 Validating Volunteers Table...");
    const volunteerFields = [
      "id",
      "name",
      "email",
      "phone",
      "preferred_tasks",
      "availability",
      "message",
      "created_at",
      "updated_at",
    ];

    const volunteerResult = await db.execute(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'volunteers'
      ORDER BY ordinal_position
    `);

    const actualVolunteerFields = volunteerResult.rows.map(
      (row) => row.column_name
    );
    console.log("Expected fields:", volunteerFields);
    console.log("Actual fields:", actualVolunteerFields);

    const missingVolunteerFields = volunteerFields.filter(
      (field) => !actualVolunteerFields.includes(field)
    );

    if (missingVolunteerFields.length > 0) {
      console.log("❌ Missing volunteer fields:", missingVolunteerFields);
    } else {
      console.log("✅ Volunteers table structure is correct");
    }

    // Validate donations table structure
    console.log("\n💰 Validating Donations Table...");
    const donationFields = [
      "id",
      "stripe_session_id",
      "donor_name",
      "donor_email",
      "donor_address",
      "donor_city",
      "donor_state",
      "donor_zip",
      "donor_occupation",
      "donor_employer",
      "amount_cents",
      "status",
      "processed_at",
      "created_at",
    ];

    const donationResult = await db.execute(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'donations'
      ORDER BY ordinal_position
    `);

    const actualDonationFields = donationResult.rows.map(
      (row) => row.column_name
    );
    console.log("Expected fields:", donationFields);
    console.log("Actual fields:", actualDonationFields);

    const missingDonationFields = donationFields.filter(
      (field) => !actualDonationFields.includes(field)
    );

    if (missingDonationFields.length > 0) {
      console.log("❌ Missing donation fields:", missingDonationFields);
    } else {
      console.log("✅ Donations table structure is correct");
    }

    // Check for required indexes
    console.log("\n🔍 Validating Indexes...");
    const indexResult = await db.execute(`
      SELECT indexname, tablename 
      FROM pg_indexes 
      WHERE tablename IN ('volunteers', 'donations')
      ORDER BY tablename, indexname
    `);

    console.log("Existing indexes:");
    indexResult.rows.forEach((row) => {
      console.log(`  - ${row.indexname} on ${row.tablename}`);
    });

    // Validate data types
    console.log("\n📊 Validating Data Types...");
    const volunteerTypes = await db.execute(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'volunteers' 
      AND column_name IN ('name', 'email', 'phone', 'preferred_tasks')
    `);

    console.log("Volunteer field types:");
    volunteerTypes.rows.forEach((row) => {
      console.log(
        `  - ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`
      );
    });

    // Test form data compatibility
    console.log("\n🧪 Testing Form Data Compatibility...");

    // Test volunteer data insertion
    try {
      const testVolunteer = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-123-4567",
        preferredTasks: ["Canvassing"],
        availability: "Weekends",
        message: "Test message",
      };

      const insertResult = await db
        .insert(volunteers)
        .values(testVolunteer)
        .returning();
      console.log("✅ Volunteer data insertion test passed");

      // Clean up test data
      await db.execute(
        `DELETE FROM volunteers WHERE email = 'test@example.com'`
      );
      console.log("✅ Test data cleaned up");
    } catch (error) {
      console.log("❌ Volunteer data insertion test failed:", error.message);
    }

    console.log("\n🎉 Schema validation completed!");
    console.log("\nNext steps:");
    console.log("1. If all tests passed, run: pnpm db:generate");
    console.log("2. Review generated migration files");
    console.log("3. Run: pnpm db:migrate");
    console.log("4. Test forms again after migration");
  } catch (error) {
    console.error("❌ Schema validation failed:", error.message);
    process.exit(1);
  }
}

// Run validation
validateSchema().catch(console.error);
