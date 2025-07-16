"use client";

import { useTranslation } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const issues = [
  {
    id: "economy",
    title: "Economy & Jobs",
    description: "Creating opportunities for working families",
    summary:
      "Support small businesses, attract new industries, and invest in workforce development programs.",
    icon: "💼",
  },
  {
    id: "education",
    title: "Education",
    description: "Investing in our children's future",
    summary:
      "Fully fund public schools, expand early childhood education, and support our teachers.",
    icon: "🎓",
  },
  {
    id: "safety",
    title: "Public Safety",
    description: "Keeping our communities safe",
    summary:
      "Support first responders, address the opioid crisis, and improve emergency preparedness.",
    icon: "🚔",
  },
  {
    id: "veterans",
    title: "Veterans",
    description: "Honoring those who served",
    summary:
      "Expand healthcare access, support job training, and improve housing assistance for veterans.",
    icon: "🇺🇸",
  },
  {
    id: "environment",
    title: "Environment",
    description: "Protecting our natural resources",
    summary:
      "Protect waterways, support renewable energy, and address climate change impacts.",
    icon: "🌊",
  },
];

export function IssuesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % issues.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + issues.length) % issues.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            {t.issuesCarousel.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.issuesCarousel.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Desktop view - show all cards */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6">
            {issues.map((issue, index) => (
              <Card
                key={issue.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-2">{issue.icon}</div>
                  <CardTitle className="text-lg text-campaign-blue">
                    {issue.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {issue.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">{issue.summary}</p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <Link href={`/issues#${issue.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile/Tablet carousel */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {issues.map((issue, index) => (
                  <div key={issue.id} className="w-full flex-shrink-0 px-4">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center pb-4">
                        <div className="text-4xl mb-2">{issue.icon}</div>
                        <CardTitle className="text-xl text-campaign-blue">
                          {issue.title}
                        </CardTitle>
                        <CardDescription>{issue.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-gray-600 mb-6">{issue.summary}</p>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <Link href={`/issues#${issue.id}`}>Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{t.issuesCarousel.previous}</span>
              </Button>

              {/* Dots indicator */}
              <div className="flex space-x-2">
                {issues.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? "bg-campaign-blue"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="flex items-center space-x-2 bg-transparent"
              >
                <span>{t.issuesCarousel.next}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-campaign-blue hover:bg-campaign-blue/90"
          >
            <Link href="/issues">{t.issuesCarousel.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
