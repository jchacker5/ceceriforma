import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import axios from "axios";
import * as cheerio from "cheerio";
import { and, eq, gte } from "drizzle-orm";

export interface EventData {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  address?: string;
  eventType: string;
  registrationRequired?: boolean;
  maxAttendees?: number;
  sourceUrl?: string;
  externalId?: string;
}

export interface ScrapingResult {
  totalEventsFound: number;
  newEventsAdded: number;
  eventsUpdated: number;
  errors: string[];
}

// Event sources for each city
const EVENT_SOURCES = {
  Westport: [
    {
      name: "Westport Town Website",
      url: "https://www.westport-ma.com/calendar",
      type: "municipal",
    },
    {
      name: "Westport Library",
      url: "https://www.westportlibraryma.org/events",
      type: "library",
    },
  ],
  "Fall River": [
    {
      name: "Fall River City Website",
      url: "https://www.fallriverma.org/calendar",
      type: "municipal",
    },
    {
      name: "Fall River Public Library",
      url: "https://www.sailsinc.org/fallriver/events",
      type: "library",
    },
    {
      name: "Battleship Cove",
      url: "https://www.battleshipcove.org/events",
      type: "museum",
    },
  ],
  Freetown: [
    {
      name: "Freetown Town Website",
      url: "https://www.freetownma.gov/calendar",
      type: "municipal",
    },
    {
      name: "Freetown Library",
      url: "https://www.sailsinc.org/freetown/events",
      type: "library",
    },
  ],
  Acushnet: [
    {
      name: "Acushnet Town Website",
      url: "https://www.acushnet.ma.us/calendar",
      type: "municipal",
    },
    {
      name: "Acushnet Library",
      url: "https://www.sailsinc.org/acushnet/events",
      type: "library",
    },
  ],
  "New Bedford": [
    {
      name: "New Bedford City Website",
      url: "https://www.newbedford-ma.gov/calendar",
      type: "municipal",
    },
    {
      name: "New Bedford Public Library",
      url: "https://www.newbedfordlibrary.org/events",
      type: "library",
    },
    {
      name: "New Bedford Whaling Museum",
      url: "https://www.whalingmuseum.org/events",
      type: "museum",
    },
    {
      name: "Zeiterion Theatre",
      url: "https://zeiterion.org/events",
      type: "theater",
    },
  ],
};

// Generic event parsing functions
function parseDate(dateString: string): Date | null {
  try {
    // Try various date formats
    const formats = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // MM/DD/YYYY
      /(\d{4})-(\d{1,2})-(\d{1,2})/, // YYYY-MM-DD
      /(\w+)\s+(\d{1,2}),?\s+(\d{4})/, // Month DD, YYYY
      /(\d{1,2})\s+(\w+)\s+(\d{4})/, // DD Month YYYY
    ];

    for (const format of formats) {
      const match = dateString.match(format);
      if (match) {
        return new Date(dateString);
      }
    }

    // Try direct parsing
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();
}

// Scrape events from a specific source
async function scrapeSource(source: any, city: string): Promise<EventData[]> {
  const scrapedEvents: EventData[] = [];

  try {
    console.log(`🔍 Scraping ${source.name} for ${city}...`);

    const response = await axios.get(source.url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CeceriCampaign/1.0; +https://ceceriforma.com)",
      },
    });

    const $ = cheerio.load(response.data);

    // Generic selectors for common event patterns
    const eventSelectors = [
      ".event",
      ".calendar-event",
      ".event-item",
      ".event-card",
      '[class*="event"]',
      ".event-listing",
      ".event-details",
    ];

    for (const selector of eventSelectors) {
      $(selector).each((_, element) => {
        try {
          const $el = $(element);

          // Extract event information
          const title = cleanText(
            $el.find("h1, h2, h3, .title, .event-title").first().text()
          );
          const description = cleanText(
            $el
              .find(".description, .event-description, .summary")
              .first()
              .text()
          );
          const dateText = cleanText(
            $el.find(".date, .event-date, .datetime").first().text()
          );
          const location = cleanText(
            $el.find(".location, .venue, .place").first().text()
          );
          const address = cleanText(
            $el.find(".address, .event-address").first().text()
          );

          if (!title || !dateText) return;

          const startDate = parseDate(dateText);
          if (!startDate) return;

          // Skip events in the past
          if (startDate < new Date()) return;

          const eventData: EventData = {
            title,
            description: description || undefined,
            startDate,
            location: location || undefined,
            address: address || undefined,
            eventType: "community",
            sourceUrl: source.url,
            externalId: `${source.name}-${title}-${startDate.getTime()}`,
          };

          scrapedEvents.push(eventData);
        } catch (error) {
          console.warn(`Error parsing event element:`, error);
        }
      });
    }

    console.log(`✅ Found ${scrapedEvents.length} events from ${source.name}`);
    return scrapedEvents;
  } catch (error) {
    console.warn(
      `⚠️ Failed to scrape ${source.name}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return [];
  }
}

// Alternative: Use Eventbrite API for events
async function fetchEventbriteEvents(city: string): Promise<EventData[]> {
  try {
    const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;
    if (!EVENTBRITE_API_KEY) {
      console.log(
        "No Eventbrite API key configured, skipping Eventbrite events"
      );
      return [];
    }

    const response = await axios.get(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        params: {
          "location.address": `${city}, MA`,
          "start_date.range_start": new Date().toISOString(),
          expand: "venue",
          status: "live",
        },
        headers: {
          Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
        },
      }
    );

    return response.data.events.map((event: any) => ({
      title: event.name.text,
      description: event.description.text,
      startDate: new Date(event.start.utc),
      endDate: event.end ? new Date(event.end.utc) : undefined,
      location: event.venue?.name,
      address: event.venue?.address?.localized_address_display,
      eventType: "community",
      sourceUrl: event.url,
      externalId: `eventbrite-${event.id}`,
    }));
  } catch (error) {
    console.warn(
      `⚠️ Failed to fetch Eventbrite events for ${city}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return [];
  }
}

// Main function to update community events for a city
export async function updateCommunityEvents(
  city: string
): Promise<ScrapingResult> {
  const result: ScrapingResult = {
    totalEventsFound: 0,
    newEventsAdded: 0,
    eventsUpdated: 0,
    errors: [],
  };

  try {
    console.log(`🚀 Starting event update for ${city}...`);

    // Get all events from various sources
    const allEvents: EventData[] = [];

    // Scrape from configured sources
    const sources = EVENT_SOURCES[city as keyof typeof EVENT_SOURCES] || [];
    for (const source of sources) {
      try {
        const events = await scrapeSource(source, city);
        allEvents.push(...events);
      } catch (error) {
        result.errors.push(
          `Failed to scrape ${source.name}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    // Fetch from Eventbrite
    try {
      const eventbriteEvents = await fetchEventbriteEvents(city);
      allEvents.push(...eventbriteEvents);
    } catch (error) {
      result.errors.push(
        `Failed to fetch Eventbrite events: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    // Remove duplicates based on title and date
    const uniqueEvents = allEvents.filter(
      (event, index, self) =>
        index ===
        self.findIndex(
          (e) =>
            e.title === event.title &&
            e.startDate.getTime() === event.startDate.getTime()
        )
    );

    result.totalEventsFound = uniqueEvents.length;

    // Process each event
    for (const eventData of uniqueEvents) {
      try {
        // Check if event already exists
        const existingEvent = await db
          .select()
          .from(events)
          .where(
            and(
              eq(events.title, eventData.title),
              eq(events.startDate, eventData.startDate),
              eq(events.eventType, "community")
            )
          )
          .limit(1);

        if (existingEvent.length > 0) {
          // Update existing event
          await db
            .update(events)
            .set({
              description: eventData.description,
              endDate: eventData.endDate,
              location: eventData.location,
              address: eventData.address,
              updatedAt: new Date(),
            })
            .where(eq(events.id, existingEvent[0].id));

          result.eventsUpdated++;
        } else {
          // Insert new event
          await db.insert(events).values({
            title: eventData.title,
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            location: eventData.location,
            address: eventData.address,
            eventType: "community",
            registrationRequired: eventData.registrationRequired,
            maxAttendees: eventData.maxAttendees,
          });

          result.newEventsAdded++;
        }
      } catch (error) {
        result.errors.push(
          `Failed to save event "${eventData.title}": ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    console.log(
      `✅ ${city}: ${result.newEventsAdded} new events, ${result.eventsUpdated} updated`
    );
    return result;
  } catch (error) {
    const errorMsg = `Failed to update events for ${city}: ${
      error instanceof Error ? error.message : "Unknown error"
    }`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
