import { sendContactGmail } from "@/lib/email/gmailTransport";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

// Simple in-memory rate limit
const WINDOW = 60_000; // 1 minute
const LIMIT = 5; // 5 requests per minute
const hits = new Map<string, { count: number; exp: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.exp < now) {
    hits.set(ip, { count: 1, exp: now + WINDOW });
    return;
  }
  rec.count++;
  if (rec.count > LIMIT) throw new Error("Rate limit exceeded");
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    rateLimit(ip);

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    // Honeypot check
    if (parsed.data.website) {
      return NextResponse.json({ ok: true }); // honeypot triggered
    }

    const { name, email, phone, subject, message } = parsed.data;

    // TODO: (Optional) persist to database here if you want a record

    await sendContactGmail({ name, email, phone, subject, message });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = e.message || "Server error";
    const status = msg === "Rate limit exceeded" ? 429 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}
