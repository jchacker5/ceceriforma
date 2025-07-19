"use client";

import { VolunteerForm } from "@/components/volunteer-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Phone, Mail } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function VolunteerPage() {
  const { t, lang } = useTranslation();

  const volunteerOpportunities = [
    {
      icon: Users,
      title: t.volunteer.opportunities.canvassing.title,
      description: t.volunteer.opportunities.canvassing.description,
    },
    {
      icon: Phone,
      title: t.volunteer.opportunities.phoneBank.title,
      description: t.volunteer.opportunities.phoneBank.description,
    },
    {
      icon: Calendar,
      title: t.volunteer.opportunities.eventSupport.title,
      description: t.volunteer.opportunities.eventSupport.description,
    },
    {
      icon: Mail,
      title: t.volunteer.opportunities.digitalOutreach.title,
      description: t.volunteer.opportunities.digitalOutreach.description,
    },
  ];

  return (
    <div key={lang} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">{t.volunteer.title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.volunteer.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">{t.volunteer.howYouCanHelp}</h2>
            <div className="grid gap-6">
              {volunteerOpportunities.map((opportunity, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-campaign-blue/10 rounded-lg">
                        <opportunity.icon className="h-6 w-6 text-campaign-blue" />
                      </div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{opportunity.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-campaign-blue text-white">
            <CardHeader>
              <CardTitle className="text-xl">{t.volunteer.whyVolunteer}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-100">
                <li>• {t.volunteer.makeImpact}</li>
                <li>• {t.volunteer.meetNeighbors}</li>
                <li>• {t.volunteer.gainExperience}</li>
                <li>• {t.volunteer.bePart}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.volunteer.signUp}</CardTitle>
              <CardDescription>
                {t.volunteer.fillForm}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VolunteerForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
