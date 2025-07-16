import { useTranslation } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Download, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const timeline = [
  {
    year: "1985",
    title: "Graduated from UMass Dartmouth",
    description: "Bachelor of Science in Business Administration",
  },
  {
    year: "1987",
    title: "Started Local Business",
    description: "Founded Ceceri Construction, employing local workers",
  },
  {
    year: "1995",
    title: "Elected to School Committee",
    description: "Served 8 years advocating for educational excellence",
  },
  {
    year: "2003",
    title: "Town Selectman",
    description: "12 years of municipal leadership and fiscal responsibility",
  },
  {
    year: "2015",
    title: "Chamber of Commerce President",
    description: "Led efforts to support local business development",
  },
  {
    year: "2020",
    title: "Veterans Affairs Committee",
    description: "Volunteer coordinator for veteran support services",
  },
];

const endorsements = [
  "South Coast Labor Council",
  "Massachusetts Teachers Association",
  "Professional Fire Fighters of Massachusetts",
  "Massachusetts Police Association",
  "Environmental League of Massachusetts",
  "Small Business Association of MA",
];

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          {t.about.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.about.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-1">
          <Image
            src="/placeholder.svg?height=600&width=500"
            alt="Steven V. Ceceri"
            width={500}
            height={600}
            className="rounded-lg shadow-lg w-full"
          />
          <div className="mt-6 space-y-4">
            <Button asChild className="w-full bg-transparent" variant="outline">
              <Link href="/resume.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                {t.about.downloadResume}
              </Link>
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <strong>8th Bristol District</strong>
                <br />
                Westport · Fall River Pcts A/C
                <br />
                Freetown · Acushnet · New Bedford
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {t.about.myStory}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                I was born and raised right here in the 8th Bristol District,
                and I've spent my entire adult life serving this community that
                shaped me. After graduating from UMass Dartmouth, I started my
                own construction business, creating good-paying jobs for local
                workers and contributing to the economic vitality of our region.
              </p>
              <p>
                My commitment to public service began when I was elected to the
                local school committee, where I fought for educational
                excellence and fiscal responsibility. This experience taught me
                the importance of listening to constituents and making decisions
                based on facts, not politics.
              </p>
              <p>
                As a town selectman for over a decade, I learned how to bring
                people together to solve problems. Whether it was improving our
                infrastructure, supporting local businesses, or ensuring public
                safety, I've always believed in common-sense solutions that work
                for everyone.
              </p>
              <p>
                Now, I'm ready to take that same approach to Beacon Hill. The
                8th Bristol District deserves a representative who understands
                our challenges because he's lived them, and who has the
                experience to get things done.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Users className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">
                  {t.about.communityLeader}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Over 30 years of active involvement in local organizations and
                  civic groups
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Award className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">
                  {t.about.provenResults}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track record of successful projects and initiatives that
                  benefit our community
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Heart className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">
                  {t.about.familyValues}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Married for 35 years, father of three, grandfather of five
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            {t.about.careerTimeline}
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-campaign-blue rounded-full flex items-center justify-center text-white font-bold">
                    {item.year.slice(-2)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-campaign-blue font-medium">
                    {item.year}
                  </p>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            {t.about.endorsements}
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.about.proudToBeEndorsed}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {endorsements.map((endorsement, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-campaign-blue rounded-full"></div>
                    <span className="text-gray-700">{endorsement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
              {t.about.personalLife}
            </h3>
            <div className="prose text-gray-700">
              <p>
                Steven lives in Westport with his wife of 35 years, Margaret.
                They have three adult children and five grandchildren, all of
                whom live in the district. In his spare time, Steven enjoys
                fishing, woodworking, and volunteering at the local food pantry.
              </p>
              <p>
                He is an active member of St. John the Baptist Church and serves
                on the board of the South Coast Community Foundation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
