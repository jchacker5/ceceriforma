"use client";

import { useTranslation } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, PlusCircle } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Town Hall Meeting - Westport",
    description:
      "Join Steven for a community discussion on the issues that matter most to Westport residents.",
    date: "2025-08-15T19:00:00-04:00",
    location: "Westport Town Hall",
    address: "816 Main Rd, Westport, MA 02790",
  },
  {
    id: 2,
    title: "Coffee with the Candidate - Fall River",
    description:
      "Informal meet and greet over coffee. Come share your thoughts and concerns.",
    date: "2025-08-20T09:00:00-04:00",
    location: "Tipsy Seagull Cafe",
    address: "1234 Pleasant St, Fall River, MA 02720",
  },
  {
    id: 3,
    title: "Campaign Kickoff Rally",
    description:
      "Join us for the official campaign kickoff! Food, music, and special guests.",
    date: "2025-08-25T14:00:00-04:00",
    location: "New Bedford Waterfront",
    address: "State Pier, New Bedford, MA 02740",
  },
  {
    id: 4,
    title: "Acushnet Senior Center Visit",
    description:
      "Steven will be meeting with seniors to discuss healthcare and social security.",
    date: "2025-09-05T11:00:00-04:00",
    location: "Acushnet Senior Center",
    address: "59 1/2 S Main St, Acushnet, MA 02743",
  },
];

export default function EventsPage() {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.events.title}
        </h1>
        <p className="text-xl text-gray-600">{t.events.subtitle}</p>
      </div>

      <div className="space-y-8">
        {events.map((event) => {
          const { month, day, time, fullDate } = formatDate(event.date);
          return (
            <Card
              key={event.id}
              className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-campaign-blue text-white flex flex-col items-center justify-center p-6 text-center w-full md:w-32">
                <div className="text-3xl font-bold">{day}</div>
                <div className="text-lg font-semibold">{month}</div>
              </div>
              <div className="flex-grow">
                <CardHeader>
                  <CardTitle className="text-xl text-campaign-blue">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {fullDate} at {time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>
                      {event.location} - {event.address}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Link
                        href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                          event.title
                        )}&dates=${new Date(event.date)
                          .toISOString()
                          .replace(/-|:|\.\d\d\d/g, "")}/${new Date(
                          new Date(event.date).getTime() + 60 * 60 * 1000
                        )
                          .toISOString()
                          .replace(
                            /-|:|\.\d\d\d/g,
                            ""
                          )}&details=${encodeURIComponent(
                          event.description
                        )}&location=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add to Google Calendar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
