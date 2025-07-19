import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { socialPosts } from "@/lib/db/schema"
import { desc } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitValue = Number.parseInt(searchParams.get("limit") || "20")

    const posts = await db
      .select()
      .from(socialPosts)
      .orderBy(desc(socialPosts.publishedAt))
      .limit(limitValue)

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Feed API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
