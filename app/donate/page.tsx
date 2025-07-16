"use client";

import { DonationForm } from "@/components/donation-form";
import { useTranslation } from "@/components/language-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users } from "lucide-react";

export default function DonatePage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.donate.title}
        </h1>
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
            <CardTitle>Grassroots Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Our campaign is powered by small donations from neighbors like
              you, not special interests or corporate PACs.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-4">
              <Heart className="h-8 w-8 text-campaign-blue" />
            </div>
            <CardTitle>Community First</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Your support helps us connect with voters and share our vision for
              common-sense leadership.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-4">
              <Shield className="h-8 w-8 text-campaign-blue" />
            </div>
            <CardTitle>Secure & Transparent</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              All donations are processed securely and reported in accordance
              with Massachusetts campaign finance laws.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Make a Contribution</CardTitle>
          <CardDescription>
            Choose an amount below or enter a custom amount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonationForm />
        </CardContent>
      </Card>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">
          Campaign Finance Disclosure
        </h3>
        <p className="text-sm text-gray-600">
          Contributions to Steven V. Ceceri for State Representative are not
          tax-deductible. Massachusetts law requires us to collect and report
          the name, address, occupation, and employer of individuals whose
          contributions exceed $200 in a calendar year. Corporate contributions
          are prohibited. Maximum individual contribution is $1,000 per calendar
          year.
        </p>
      </div>
    </div>
  );
}
