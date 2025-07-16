import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    console.error("Stripe secret key is not set.")
    return NextResponse.json({ error: "Payment processing is not configured." }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2024-06-20",
  })

  try {
    const { amount, donorInfo } = await request.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Campaign Contribution - Steven V. Ceceri for State Rep",
              description: "Political contribution to Steven V. Ceceri for Massachusetts State Representative",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
      customer_email: donorInfo.email,
      metadata: {
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        donor_address: donorInfo.address || "",
        donor_city: donorInfo.city || "",
        donor_state: donorInfo.state || "",
        donor_zip: donorInfo.zip || "",
        donor_occupation: donorInfo.occupation || "",
        donor_employer: donorInfo.employer || "",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Payment processing error" }, { status: 500 })
  }
}
