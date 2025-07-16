import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are not set.")
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const body = await request.json()
    const { name, email, phone, tasks, availability, message } = body

    const { data, error } = await supabase.from("volunteers").insert([
      {
        name,
        email,
        phone,
        preferred_tasks: tasks,
        availability,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Volunteer signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
