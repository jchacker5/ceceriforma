#!/usr/bin/env node

/**
 * Manual Cron Job Test Script
 *
 * Run this to test the cron job functionality:
 * node scripts/test-cron-manual.js [city]
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3003";
const city = process.argv[2];

async function testCronJob() {
  console.log("🧪 Testing Community Events Cron Job");
  console.log(`📍 Testing against: ${BASE_URL}`);
  console.log(`🏙️  City: ${city || "All cities"}`);
  console.log("");

  try {
    const payload = city ? { city } : {};

    console.log("📤 Sending request...");
    const response = await fetch(`${BASE_URL}/api/cron/update-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log("📊 Response Status:", response.status);
    console.log("📋 Response:");
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("\n✅ Cron job completed successfully!");

      if (result.results) {
        console.log("\n📈 Summary:");
        result.results.forEach((cityResult) => {
          console.log(`  ${cityResult.city}:`);
          console.log(
            `    - Total events found: ${cityResult.totalEventsFound}`
          );
          console.log(`    - New events added: ${cityResult.newEventsAdded}`);
          console.log(`    - Events updated: ${cityResult.eventsUpdated}`);
          if (cityResult.errors.length > 0) {
            console.log(`    - Errors: ${cityResult.errors.length}`);
          }
        });
      }
    } else {
      console.log("\n❌ Cron job failed:", result.error);
    }
  } catch (error) {
    console.error("💥 Test failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure your dev server is running (pnpm dev)");
    console.log("2. Check that the cron endpoint is accessible");
    console.log("3. Verify your database connection");
    console.log("4. Check the server logs for more details");
  }
}

// Test the community events API to see if events were added
async function testEventsAPI() {
  console.log("\n🔍 Testing Community Events API...");

  try {
    const response = await fetch(`${BASE_URL}/api/community-events`);
    const result = await response.json();

    console.log(`📊 Found ${result.events?.length || 0} events in database`);

    if (result.events && result.events.length > 0) {
      console.log("\n📅 Sample events:");
      result.events.slice(0, 3).forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.title}`);
        console.log(
          `     Date: ${new Date(event.startDate).toLocaleDateString()}`
        );
        console.log(`     Location: ${event.location || "N/A"}`);
        console.log(`     Type: ${event.eventType}`);
        console.log("");
      });
    }
  } catch (error) {
    console.error("❌ Failed to fetch events:", error.message);
  }
}

// Main execution
async function main() {
  await testCronJob();
  await testEventsAPI();

  console.log("\n🎉 Test completed!");
  console.log("\n📝 Next steps:");
  console.log("1. Check your database for new events");
  console.log("2. Visit your events page to see the results");
  console.log("3. Monitor Vercel logs for production cron jobs");
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testCronJob, testEventsAPI };
