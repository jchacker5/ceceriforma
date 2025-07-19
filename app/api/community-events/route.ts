import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { events } from "@/lib/db/schema"
import { gte, asc, eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const town = searchParams.get('town')
    const eventType = searchParams.get('type') || 'community'

    let query = db
      .select()
      .from(events)
      .where(gte(events.startDate, new Date()))

    // Filter by event type
    if (eventType) {
      query = query.where(eq(events.eventType, eventType))
    }

    // Filter by town if specified
    if (town && town !== 'All') {
      // Extract town from location or address
      query = query.where(
        // This is a simplified approach - you might want to add a town field to the schema
        // For now, we'll filter based on location containing the town name
        // In a real implementation, you'd want to add a 'town' column to the events table
      )
    }

    const eventsData = await query.orderBy(asc(events.startDate))

    // Add town information based on location/address
    const eventsWithTown = eventsData.map(event => {
      let town = 'Unknown'
      
      // Extract town from location or address
      if (event.location) {
        const locationLower = event.location.toLowerCase()
        if (locationLower.includes('westport')) town = 'Westport'
        else if (locationLower.includes('fall river')) town = 'Fall River'
        else if (locationLower.includes('freetown')) town = 'Freetown'
        else if (locationLower.includes('acushnet')) town = 'Acushnet'
        else if (locationLower.includes('new bedford')) town = 'New Bedford'
      }
      
      if (event.address) {
        const addressLower = event.address.toLowerCase()
        if (addressLower.includes('westport')) town = 'Westport'
        else if (addressLower.includes('fall river')) town = 'Fall River'
        else if (addressLower.includes('freetown')) town = 'Freetown'
        else if (addressLower.includes('acushnet')) town = 'Acushnet'
        else if (addressLower.includes('new bedford')) town = 'New Bedford'
      }

      return {
        ...event,
        town
      }
    })

    // Filter by town if specified (after adding town info)
    const filteredEvents = town && town !== 'All' 
      ? eventsWithTown.filter(event => event.town === town)
      : eventsWithTown

    return NextResponse.json({ events: filteredEvents })
  } catch (error) {
    console.error("Events API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
