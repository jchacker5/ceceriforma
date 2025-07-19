import { SocialFeed } from "@/components/social-feed"
import { Rss } from "lucide-react"

export default function FeedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Campaign Feed</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay up-to-date with the latest news and updates from the campaign trail, all in one place.
        </p>
        <div className="mt-4">
          <a
            href="/api/feed/rss"
            className="inline-flex items-center text-sm text-campaign-blue hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            <Rss className="h-4 w-4 mr-2" />
            Subscribe via RSS
          </a>
        </div>
      </div>

      {/* The SocialFeed component will fetch and display all posts */}
      <SocialFeed />

      {/* In a real application, an "infinite scroll" or "load more" button would be implemented here */}
      <div className="text-center mt-12">
        <p className="text-gray-500">You&apos;ve reached the end of the feed.</p>
      </div>
    </div>
  )
}
