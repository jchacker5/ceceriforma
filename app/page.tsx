import { Hero } from "@/components/hero"
import { SocialFeed } from "@/components/social-feed"
import { IssuesCarousel } from "@/components/issues-carousel"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-lg text-gray-600">Stay connected with the campaign</p>
        </div>
        <SocialFeed limit={6} />
      </section>
      <IssuesCarousel />
      <Testimonials />
    </div>
  )
}
