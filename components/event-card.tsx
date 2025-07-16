import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, PlusCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export interface Event {
  id: number | string
  title: string
  description: string
  date: string
  location: string
  address: string
  type: "campaign" | "community"
  town: string
  sourceUrl?: string
}

interface EventCardProps {
  event: Event
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    fullDate: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }
}

export function EventCard({ event }: EventCardProps) {
  const { month, day, time, fullDate } = formatDate(event.date)

  const gCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title,
  )}&dates=${new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, "")}/${new Date(
    new Date(event.date).getTime() + 60 * 60 * 1000,
  )
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(
    event.description,
  )}&location=${encodeURIComponent(event.address)}`

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow">
      <div
        className={`text-white flex flex-col items-center justify-center p-6 text-center w-full md:w-32 ${
          event.type === "campaign" ? "bg-campaign-blue" : "bg-gray-600"
        }`}
      >
        <div className="text-3xl font-bold">{day}</div>
        <div className="text-lg font-semibold">{month}</div>
        <div className="text-xs mt-1 uppercase">{event.town}</div>
      </div>
      <div className="flex-grow">
        <CardHeader>
          <CardTitle className={`text-xl ${event.type === "campaign" ? "text-campaign-blue" : "text-gray-800"}`}>
            {event.title}
          </CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {fullDate} at {time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {event.location} - {event.address}
            </span>
          </div>
          <div className="pt-2 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href={gCalUrl} target="_blank" rel="noopener noreferrer">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add to Calendar
              </Link>
            </Button>
            {event.sourceUrl && (
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
