import { NextResponse } from "next/server"
import type { Event } from "@/components/event-card"

const communityEvents: Event[] = [
  {
    id: "nb-101",
    title: "New Bedford Farmers Market",
    description: "Weekly market featuring local produce, artisans, and food trucks.",
    date: "2025-08-17T14:00:00-04:00",
    location: "Clasky Common Park",
    address: "761 Pleasant St, New Bedford, MA 02740",
    type: "community",
    town: "New Bedford",
    sourceUrl: "https://www.newbedfordguide.com/new-bedford-farmers-market/2024/05/15",
  },
  {
    id: "fr-201",
    title: "Fall River Celebrates America",
    description: "Annual waterfront festival with live music, fireworks, and family activities.",
    date: "2025-08-23T16:00:00-04:00",
    location: "Fall River Heritage State Park",
    address: "200 Davol St, Fall River, MA 02720",
    type: "community",
    town: "Fall River",
    sourceUrl: "https://www.fallriverma.gov/events/fall-river-celebrates-america/",
  },
  {
    id: "wp-301",
    title: "Westport Fair",
    description: "A classic agricultural fair with rides, games, and livestock shows.",
    date: "2025-08-29T17:00:00-04:00",
    location: "Westport Fair Grounds",
    address: "200 Pine Hill Rd, Westport, MA 02790",
    type: "community",
    town: "Westport",
    sourceUrl: "https://www.westportfair.com/",
  },
  {
    id: "ac-401",
    title: "Acushnet Apple-Peach Festival",
    description: "Celebrate the local harvest with delicious food, crafts, and entertainment.",
    date: "2025-09-06T10:00:00-04:00",
    location: "Long Plain Museum",
    address: "1203 Main St, Acushnet, MA 02743",
    type: "community",
    town: "Acushnet",
    sourceUrl: "https://www.applepeachfestival.com/",
  },
  {
    id: "ft-501",
    title: "Freetown Historical Society Meeting",
    description: "Monthly meeting open to the public, featuring a guest speaker on local history.",
    date: "2025-09-10T19:00:00-04:00",
    location: "Freetown Historical Society Museum",
    address: "1 Slab Bridge Rd, Freetown, MA 02717",
    type: "community",
    town: "Freetown",
    sourceUrl: "https://www.freetownhistoricalsociety.org/events",
  },
  {
    id: "nb-102",
    title: "AHA! Night (Art, History, Architecture)",
    description: "A free arts & culture event held downtown every second Thursday of the month.",
    date: "2025-09-11T17:00:00-04:00",
    location: "Downtown New Bedford",
    address: "Various locations, New Bedford, MA 02740",
    type: "community",
    town: "New Bedford",
    sourceUrl: "https://ahanewbedford.org/",
  },
]

export async function GET() {
  // In a real application, you would fetch this data from your Supabase database,
  // which would be populated by a Vercel Cron Job.
  return NextResponse.json({ events: communityEvents })
}
