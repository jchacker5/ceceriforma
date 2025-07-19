import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { volunteers } from "@/lib/db/schema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, tasks, availability, message } = body

    const data = await db.insert(volunteers).values({
      name,
      email,
      phone,
      preferredTasks: tasks,
      availability,
      message,
    }).returning()

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Volunteer signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
