"use client";

import { useTranslation } from "@/components/language-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const issues = [
  {
    id: "economy",
    title: "Economy & Jobs",
    description: "Creating opportunities for working families",
    content: `Our district needs good-paying jobs that allow families to thrive. I will work to:

• Support small businesses with reduced red tape and tax incentives
• Attract new industries while preserving our maritime heritage
• Invest in workforce development and job training programs
• Advocate for fair wages and worker protections
• Promote economic development that benefits all residents

The South Coast has tremendous potential. With the right policies, we can create an economy that works for everyone.`,
  },
  {
    id: "education",
    title: "Education",
    description: "Investing in our children's future",
    content: `Every child deserves access to quality education. My priorities include:

• Fully funding our public schools and supporting our teachers
• Expanding access to early childhood education
• Improving school infrastructure and technology
• Supporting vocational and technical education programs
• Making higher education more affordable and accessible

Education is the foundation of opportunity. We must ensure every student has the tools they need to succeed.`,
  },
  {
    id: "safety",
    title: "Public Safety",
    description: "Keeping our communities safe",
    content: `Safe communities are the foundation of strong neighborhoods. I will:

• Support our police, fire, and emergency services with proper funding
• Address the opioid crisis with treatment and prevention programs
• Improve emergency preparedness and response capabilities
• Work on traffic safety improvements throughout the district
• Support community policing initiatives that build trust

Public safety requires partnership between law enforcement and the community.`,
  },
  {
    id: "veterans",
    title: "Veterans",
    description: "Honoring those who served",
    content: `Our veterans deserve our unwavering support. I am committed to:

• Expanding access to veterans' healthcare and mental health services
• Supporting job training and placement programs for veterans
• Improving veterans' housing assistance programs
• Ensuring proper funding for veterans' services
• Honoring our veterans through community recognition programs

Those who served our country deserve our continued service to them.`,
  },
  {
    id: "environment",
    title: "Environment",
    description: "Protecting our natural resources",
    content: `The South Coast's natural beauty is one of our greatest assets. I will:

• Protect our waterways and coastal areas from pollution
• Support renewable energy initiatives and green jobs
• Preserve open space and recreational areas
• Address climate change impacts on our coastal communities
• Promote sustainable development practices

We must be good stewards of our environment for future generations.`,
  },
];

export default function IssuesPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.issues.title}
        </h1>
        <p className="text-xl text-gray-600">{t.issues.subtitle}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {issues.map((issue) => (
          <AccordionItem key={issue.id} value={issue.id}>
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardHeader className="p-0 text-left">
                  <CardTitle className="text-xl text-campaign-blue">
                    {issue.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {issue.description}
                  </CardDescription>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none">
                    {issue.content.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
