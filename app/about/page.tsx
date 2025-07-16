import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Users, Heart, Wrench, ShieldCheck } from "lucide-react"
import Link from "next/link"

const timeline = [
  {
    year: "1994",
    title: "Began Career in Real Estate",
    description: "Started a 20-year career helping families navigate the complexities of homeownership.",
  },
  {
    year: "1995",
    title: "Elected to School Committee",
    description: "Began a long career in public service, advocating for educational excellence.",
  },
  {
    year: "2003",
    title: "Elected Town Selectman",
    description:
      "Served 12 years in municipal leadership, focusing on fiscal responsibility and community development.",
  },
  {
    year: "2015",
    title: "Coordinated Social Services",
    description: "Worked with the Family Service Association, supporting vital community programs.",
  },
  {
    year: "2017",
    title: "Founded New England Property Services Group",
    description: "Established his property remediation company to directly help homeowners in crisis.",
  },
]

const endorsements = [
  "South Coast Labor Council",
  "Massachusetts Teachers Association",
  "Professional Fire Fighters of Massachusetts",
  "Massachusetts Police Association",
  "Environmental League of Massachusetts",
  "Small Business Association of MA",
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">About Steven V. Ceceri</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">A lifetime of service and hands-on problem-solving</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-1">
          <Image
            src="/steven-ceceri-headshot.jpeg"
            alt="Steven V. Ceceri"
            width={500}
            height={600}
            className="rounded-lg shadow-lg w-full object-cover"
          />
          <div className="mt-6 space-y-4">
            <Button asChild className="w-full bg-transparent" variant="outline">
              <Link href="/resume.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">My Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                My career has been defined by one mission: helping people in our community solve complex problems.
                Whether it was my 20 years as a real estate professional guiding families through their biggest
                investment, or my time at the Family Service Association supporting programs for adult day health,
                after-school care, and behavioral health, I've always been on the front lines.
              </p>
              <p>
                Today, as the owner of a property damage restoration company, I'm the person people call in a crisis. I
                go into homes after a storm or a pipe burst, assess the damage, and create a plan to make things right.
                I stand up to insurance companies to ensure our residents get the resources they deserve. This work has
                given me an intimate understanding of the regulations that can either help or hinder families and small
                businesses.
              </p>
              <p>
                This hands-on experience is grounded in a long history of public service, from the local school
                committee to the board of selectmen. I've seen the challenges our district faces from multiple angles.
                I'm not a typical politician; I'm a specialist in finding and fixing problems, and I'm ready to bring
                that same commitment and expertise to the State House.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Users className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">Public Servant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Decades of experience on the School Committee and Board of Selectmen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Wrench className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">Problem Solver</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Helps families and businesses navigate crises and rebuild after disasters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-campaign-blue/10 rounded-full w-fit mb-2">
                  <Heart className="h-8 w-8 text-campaign-blue" />
                </div>
                <CardTitle className="text-lg">Community Rooted</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  A lifelong resident of the district, dedicated to our shared values and future.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Experience & Timeline</h2>
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
                  <p className="text-sm text-campaign-blue font-medium">{item.year}</p>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Qualifications & Certifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>A Record of Expertise</CardTitle>
              <CardDescription>
                Steven believes in being an expert in his field. His professional certifications demonstrate a
                commitment to high standards and detailed knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "IICRC Certified Firm (Inspection, Cleaning & Restoration)",
                  "Certified Water Damage Restoration Technician",
                  "Certified Fire & Smoke Restoration Technician",
                  "Certified Commercial & Residential Mold Inspector",
                  "EPA Lead-Safe Certified Renovator",
                  "GAF Certified Roofing Contractor",
                  "HAAG Certified for Wind & Hail Damage Inspection",
                ].map((cert, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
