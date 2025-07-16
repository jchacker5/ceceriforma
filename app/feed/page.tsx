"use client";

import { useTranslation } from "@/components/language-provider";
import { SocialFeed } from "@/components/social-feed";
import { Rss } from "lucide-react";

export default function FeedPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.feed.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.feed.subtitle}
        </p>
        <div className="mt-4">
          <a
            href="/api/feed/rss"
            className="inline-flex items-center text-sm text-campaign-blue hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            <Rss className="h-4 w-4 mr-2" />
            {t.feed.subscribeRss}
          </a>
        </div>
      </div>
      {/* The SocialFeed component will fetch and display all posts */}
      <SocialFeed />
      {/* In a real application, an "infinite scroll" or "load more" button would be implemented here */}
      <div className="text-center mt-12">
        <p className="text-gray-500">{t.feed.endOfFeed}</p>
      </div>
    </div>
  );
}
