import { VolunteerForm } from "@/components/volunteer-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Phone, Mail } from "lucide-react"

const volunteerOpportunities = [
  {
    icon: Users,
    title: "Canvassing",
    description: "Go door-to-door to meet voters and share Steven's message",
  },
  {
    icon: Phone,
    title: "Phone Banking",
    description: "Make calls to registered voters from the comfort of your home",
  },
  {
    icon: Calendar,
    title: "Event Support",
    description: "Help organize and run campaign events throughout the district",
  },
  {
    icon: Mail,
    title: "Digital Outreach",
    description: "Assist with social media, email campaigns, and online engagement",
  },
]

export default function VolunteerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Every campaign is powered by dedicated volunteers. Join us in building a stronger future for the 8th Bristol
          District. Together, we can make a real difference.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">How You Can Help</h2>
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
              <CardTitle className="text-xl">Why Volunteer?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-100">
                <li>• Make a direct impact on your community</li>
                <li>• Meet like-minded neighbors and build connections</li>
                <li>• Gain valuable experience in civic engagement</li>
                <li>• Be part of positive change in the 8th Bristol District</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up to Volunteer</CardTitle>
              <CardDescription>
                Fill out the form below and we'll be in touch with volunteer opportunities that match your interests and
                availability.
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
