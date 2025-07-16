"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

interface SocialPost {
  id: string
  platform: "twitter" | "facebook" | "instagram" | "youtube" | "blog"
  content: string
  published_at: string
  media_url?: string
  external_url?: string
  author: string
}

interface SocialFeedProps {
  limit?: number
}

const platformIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  blog: ExternalLink,
}

const platformColors = {
  twitter: "text-blue-500",
  facebook: "text-blue-600",
  instagram: "text-pink-500",
  youtube: "text-red-500",
  blog: "text-campaign-blue",
}

// Mock data for demonstration
const mockPosts: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    content:
      "Great turnout at today's town hall in Westport! Thank you to everyone who came out to discuss the issues that matter most to our community. Together, we can build a stronger future for the 8th Bristol District. #CeceriForStateRep",
    published_at: "2024-01-15T10:30:00Z",
    external_url: "https://twitter.com/cecerep/status/1",
    author: "Steven V. Ceceri",
  },
  {
    id: "2",
    platform: "facebook",
    content:
      "Small businesses are the backbone of our economy. That's why I'm committed to reducing red tape and supporting local entrepreneurs. When our businesses thrive, our communities thrive.",
    published_at: "2024-01-14T15:45:00Z",
    media_url: "/placeholder.svg?height=300&width=500",
    external_url: "https://facebook.com/cecerep/posts/1",
    author: "Steven V. Ceceri",
  },
  {
    id: "3",
    platform: "blog",
    content:
      "My Plan for Education: Investing in Our Children's Future. Every child in the 8th Bristol District deserves access to quality education. Here's how we can make that happen...",
    published_at: "2024-01-13T09:00:00Z",
    external_url: "/blog/education-plan",
    author: "Steven V. Ceceri",
  },
  {
    id: "4",
    platform: "instagram",
    content:
      "Honored to receive the endorsement of the South Coast Labor Council. Together, we'll fight for good-paying jobs and worker protections.",
    published_at: "2024-01-12T14:20:00Z",
    media_url: "/placeholder.svg?height=400&width=400",
    external_url: "https://instagram.com/p/cecerep1",
    author: "Steven V. Ceceri",
  },
  {
    id: "5",
    platform: "youtube",
    content:
      "Watch my latest video on public safety initiatives for our district. We need to support our first responders while building stronger community partnerships.",
    published_at: "2024-01-11T16:00:00Z",
    media_url: "/placeholder.svg?height=300&width=500",
    external_url: "https://youtube.com/watch?v=cecerep1",
    author: "Steven V. Ceceri",
  },
  {
    id: "6",
    platform: "twitter",
    content:
      "Veterans Day reminder: Our veterans deserve our unwavering support. I'm committed to expanding access to healthcare, job training, and housing assistance for those who served our country.",
    published_at: "2024-01-10T11:00:00Z",
    external_url: "https://twitter.com/cecerep/status/2",
    author: "Steven V. Ceceri",
  },
]

export function SocialFeed({ limit }: SocialFeedProps) {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setPosts(limit ? mockPosts.slice(0, limit) : mockPosts)
      setLoading(false)
    }, 1000)
  }, [limit])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const PlatformIcon = platformIcons[post.platform]
        const platformColor = platformColors[post.platform]

        return (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PlatformIcon className={`h-5 w-5 ${platformColor}`} />
                  <span className="text-sm font-medium capitalize">{post.platform}</span>
                </div>
                <span className="text-xs text-gray-500">{formatDate(post.published_at)}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.media_url && (
                <img
                  src={post.media_url || "/placeholder.svg"}
                  alt="Post media"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <p className="text-sm text-gray-700 line-clamp-4">{post.content}</p>
              {post.external_url && (
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href={post.external_url} target="_blank" rel="noopener noreferrer">
                    View Original <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
