import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We want to hear from you. Reach out with questions, concerns, or to get involved in the campaign.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-campaign-blue" />
                <span>Campaign Headquarters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Steven V. Ceceri for State Representative</p>
                <p>123 Main Street</p>
                <p>Fall River, MA 02720</p>
              </div>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Phone className="h-5 w-5 text-campaign-blue" />
                  <span>Phone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">(508) 555-0123</p>
                <p className="text-sm text-gray-600">Campaign Office</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Mail className="h-5 w-5 text-campaign-blue" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">info@ceceriforstaterep.com</p>
                <p className="text-sm text-gray-600">General Inquiries</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-campaign-blue" />
                <span>Office Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                *Hours may vary during campaign events. Call ahead to confirm availability.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Have a question or want to share your thoughts? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <Card className="bg-campaign-blue text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Involved</CardTitle>
            <CardDescription className="text-blue-100">
              There are many ways to support our campaign and make a difference in the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-lg mb-2">Volunteer</h3>
                <p className="text-blue-100 text-sm">
                  Join our team of dedicated volunteers helping to spread our message throughout the district.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Donate</h3>
                <p className="text-blue-100 text-sm">
                  Support our grassroots campaign with a contribution that helps us reach more voters.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Spread the Word</h3>
                <p className="text-blue-100 text-sm">
                  Follow us on social media and help share our message with friends and neighbors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
