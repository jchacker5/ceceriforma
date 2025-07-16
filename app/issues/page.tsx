"use client" // Mark this page as a Client Component

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const issues = [
  {
    id: "economy",
    title: "Economy & Jobs",
    description: "Creating opportunities for working families",
    content: `Our district needs good-paying jobs that allow families to thrive. I will work to:\n\n• Support small businesses with reduced red tape and tax incentives\n• Attract new industries while preserving our maritime heritage\n• Invest in workforce development and job training programs\n• Advocate for fair wages and worker protections\n• Promote economic development that benefits all residents\n\nThe South Coast has tremendous potential. With the right policies, we can create an economy that works for everyone.`,
  },
  {
    id: "education",
    title: "Education",
    description: "Investing in our children's future",
    content: `Every child deserves access to quality education. My priorities include:\n\n• Fully funding our public schools and supporting our teachers\n• Expanding access to early childhood education\n• Improving school infrastructure and technology\n• Supporting vocational and technical education programs\n• Making higher education more affordable and accessible\n\nEducation is the foundation of opportunity. We must ensure every student has the tools they need to succeed.`,
  },
  {
    id: "safety",
    title: "Public Safety",
    description: "Keeping our communities safe",
    content: `Safe communities are the foundation of strong neighborhoods. I will:\n\n• Support our police, fire, and emergency services with proper funding\n• Address the opioid crisis with treatment and prevention programs\n• Improve emergency preparedness and response capabilities\n• Work on traffic safety improvements throughout the district\n• Support community policing initiatives that build trust\n\nPublic safety requires partnership between law enforcement and the community.`,
  },
  {
    id: "veterans",
    title: "Veterans",
    description: "Honoring those who served",
    content: `Our veterans deserve our unwavering support. I am committed to:\n\n• Expanding access to veterans' healthcare and mental health services\n• Supporting job training and placement programs for veterans\n• Improving veterans' housing assistance programs\n• Ensuring proper funding for veterans' services\n• Honoring our veterans through community recognition programs\n\nThose who served our country deserve our continued service to them.`,
  },
  {
    id: "environment",
    title: "Environment",
    description: "Protecting our natural resources",
    content: `The South Coast's natural beauty is one of our greatest assets. I will:\n\n• Protect our waterways and coastal areas from pollution\n• Support renewable energy initiatives and green jobs\n• Preserve open space and recreational areas\n• Address climate change impacts on our coastal communities\n• Promote sustainable development practices\n\nWe must be good stewards of our environment for future generations.`,
  },
]

export default function IssuesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Issues & Priorities</h1>
        <p className="text-xl text-gray-600">Common-sense solutions for the challenges facing our district</p>
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
