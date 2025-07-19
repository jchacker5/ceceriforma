"use client" // Mark this page as a Client Component

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from "@/components/language-provider"

export default function IssuesPage() {
  const { t } = useTranslation();

  const issues = [
    {
      id: "economy",
      title: t.issues.economy.title,
      description: t.issues.economy.description,
      content: t.issues.economy.content,
    },
    {
      id: "education",
      title: t.issues.education.title,
      description: t.issues.education.description,
      content: t.issues.education.content,
    },
    {
      id: "safety",
      title: t.issues.safety.title,
      description: t.issues.safety.description,
      content: t.issues.safety.content,
    },
    {
      id: "veterans",
      title: t.issues.veterans.title,
      description: t.issues.veterans.description,
      content: t.issues.veterans.content,
    },
    {
      id: "environment",
      title: t.issues.environment.title,
      description: t.issues.environment.description,
      content: t.issues.environment.content,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">{t.issues.title}</h1>
        <p className="text-xl text-gray-600">{t.issues.subtitle}</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {issues.map((issue) => (
          <AccordionItem
            key={issue.id}
            value={issue.id}
            className="border rounded-lg bg-white hover:bg-gray-50/50 transition-colors"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-campaign-blue">{issue.title}</h3>
                <p className="text-base text-gray-500 mt-1">{issue.description}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="prose max-w-none text-gray-700">
                {issue.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
