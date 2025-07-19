"use client";

import { DonationForm } from "@/components/donation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export default function DonatePage() {
  const { t, lang } = useTranslation();
  
  return (
    <div key={lang} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">{t.donate.title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.donate.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-4">
              <Users className="h-8 w-8 text-campaign-blue" />
            </div>
            <CardTitle>{t.donate.grassroots}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t.donate.grassrootsDescription}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-4">
              <Heart className="h-8 w-8 text-campaign-blue" />
            </div>
            <CardTitle>{t.donate.communityFirst}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t.donate.communityFirstDescription}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-4">
              <Shield className="h-8 w-8 text-campaign-blue" />
            </div>
            <CardTitle>{t.donate.secureTransparent}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t.donate.secureTransparentDescription}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.donate.makeContribution}</CardTitle>
          <CardDescription>{t.donate.chooseAmount}</CardDescription>
        </CardHeader>
        <CardContent>
          <DonationForm />
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">{t.donate.financeDisclosure}</h3>
        <p className="text-sm text-gray-600">
          {t.donate.financeDisclosureText}
        </p>
      </div>
    </div>
  )
}
