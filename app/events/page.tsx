"use client"

import { useState, useEffect, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCard, type Event } from "@/components/event-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

const campaignEvents: Event[] = [
  {
    id: 1,
    title: "Town Hall Meeting - Westport",
    description: "Join Steven for a community discussion on the issues that matter most to Westport residents.",
    date: "2025-08-15T19:00:00-04:00",
    location: "Westport Town Hall",
    address: "816 Main Rd, Westport, MA 02790",
    type: "campaign",
    town: "Westport",
  },
  {
    id: 2,
    title: "Coffee with the Candidate - Fall River",
    description: "Informal meet and greet over coffee. Come share your thoughts and concerns.",
    date: "2025-08-20T09:00:00-04:00",
    location: "Tipsy Seagull Cafe",
    address: "1234 Pleasant St, Fall River, MA 02720",
    type: "campaign",
    town: "Fall River",
  },
  {
    id: 3,
    title: "Campaign Kickoff Rally",
    description: "Join us for the official campaign kickoff! Food, music, and special guests.",
    date: "2025-08-25T14:00:00-04:00",
    location: "New Bedford Waterfront",
    address: "State Pier, New Bedford, MA 02740",
    type: "campaign",
    town: "New Bedford",
  },
]

const towns = ["All", "Westport", "Fall River", "Freetown", "Acushnet", "New Bedford"]

export default function EventsPage() {
  const [communityEvents, setCommunityEvents] = useState<Event[]>([])
  const [filteredTown, setFilteredTown] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunityEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/community-events")
        if (!response.ok) {
          throw new Error("Failed to fetch community events")
        }
        const data = await response.json()
        setCommunityEvents(data.events)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchCommunityEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    if (filteredTown === "All") {
      return communityEvents
    }
    return communityEvents.filter((event) => event.town === filteredTown)
  }, [communityEvents, filteredTown])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Events</h1>
        <p className="text-xl text-gray-600">Find out where to meet Steven and what&apos;s happening in our community.</p>
      </div>

      <Tabs defaultValue="campaign" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaign">Campaign Events</TabsTrigger>
          <TabsTrigger value="community">Community Events</TabsTrigger>
        </TabsList>

        <TabsContent value="campaign" className="mt-8">
          <div className="space-y-8">
            {campaignEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-8">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Community Events Notice</AlertTitle>
            <AlertDescription>
              These events are not hosted by the campaign but are listed for community awareness. Please verify details
              with the event organizers.
            </AlertDescription>
          </Alert>

          <div className="mb-6">
            <Select value={filteredTown} onValueChange={setFilteredTown}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Filter by town..." />
              </SelectTrigger>
              <SelectContent>
                {towns.map((town) => (
                  <SelectItem key={town} value={town}>
                    {town}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            {loading && <p>Loading community events...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && filteredEvents.length > 0
              ? filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
              : !loading && <p>No events found for the selected town.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
