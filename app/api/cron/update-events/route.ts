import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { updateCommunityEvents } from "@/lib/events/event-scraper";
import { and, eq, gte, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Vercel Cron Job - runs every 6 hours
export const runtime = "nodejs";

// Define the 8th Bristol District cities
const DISTRICT_CITIES = [
  "Westport",
  "Fall River",
  "Freetown",
  "Acushnet",
  "New Bedford",
];

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request from Vercel
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🕐 Starting community events update cron job...");

    const results = {
      totalEventsFound: 0,
      newEventsAdded: 0,
      eventsUpdated: 0,
      errors: [] as string[],
      citiesProcessed: [] as string[],
    };

    // Process each city in the district
    for (const city of DISTRICT_CITIES) {
      try {
        console.log(`📍 Processing events for ${city}...`);

        const cityResults = await updateCommunityEvents(city);

        results.totalEventsFound += cityResults.totalEventsFound;
        results.newEventsAdded += cityResults.newEventsAdded;
        results.eventsUpdated += cityResults.eventsUpdated;
        results.citiesProcessed.push(city);

        console.log(
          `✅ ${city}: ${cityResults.newEventsAdded} new, ${cityResults.eventsUpdated} updated`
        );

        // Small delay between cities to be respectful to servers
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        const errorMsg = `Error processing ${city}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`;
        console.error(errorMsg);
        results.errors.push(errorMsg);
      }
    }

    // Clean up old events (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { rowCount: deletedCount } = await db
      .delete(events)
      .where(
        and(
          lt(events.startDate, thirtyDaysAgo),
          eq(events.eventType, "community")
        )
      );

    console.log(`🗑️ Cleaned up ${deletedCount} old events`);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        citiesProcessed: results.citiesProcessed.length,
        totalEventsFound: results.totalEventsFound,
        newEventsAdded: results.newEventsAdded,
        eventsUpdated: results.eventsUpdated,
        oldEventsDeleted: deletedCount,
        errors: results.errors.length,
      },
      details: results,
    };

    console.log("✅ Community events update completed:", response.summary);

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Manual trigger endpoint for testing
export async function POST(request: NextRequest) {
  try {
    const { city } = await request.json();

    if (city && !DISTRICT_CITIES.includes(city)) {
      return NextResponse.json(
        { error: `City must be one of: ${DISTRICT_CITIES.join(", ")}` },
        { status: 400 }
      );
    }

    const citiesToProcess = city ? [city] : DISTRICT_CITIES;
    const results = [];

    for (const cityName of citiesToProcess) {
      const cityResults = await updateCommunityEvents(cityName);
      results.push({ city: cityName, ...cityResults });
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Manual update failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
