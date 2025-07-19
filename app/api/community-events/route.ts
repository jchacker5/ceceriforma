import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { events } from "@/lib/db/schema"
import { gte, asc } from "drizzle-orm"

export async function GET() {
  try {
    // Get events from today onwards, ordered by start date
    const eventsData = await db
      .select()
      .from(events)
      .where(gte(events.startDate, new Date()))
      .orderBy(asc(events.startDate))

    return NextResponse.json({ events: eventsData })
  } catch (error) {
    console.error("Events API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
