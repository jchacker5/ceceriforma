import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    title: "Small Business Owner",
    organization: "Santos Family Restaurant",
    content:
      "Steven has always been a champion for small businesses in our community. He understands the challenges we face and has practical solutions to help us succeed.",
    location: "Fall River",
  },
  {
    id: 2,
    name: "Chief Robert Johnson",
    title: "Fire Chief",
    organization: "Westport Fire Department",
    content:
      "Steven's commitment to public safety is unwavering. He's worked with us to secure funding for new equipment and training. Our community is safer because of his advocacy.",
    location: "Westport",
  },
  {
    id: 3,
    name: "Dr. Patricia Williams",
    title: "Superintendent",
    organization: "Freetown-Lakeville Regional School District",
    content:
      "Education has always been a priority for Steven. He's fought for increased funding and resources for our schools. Our students benefit from his dedication to educational excellence.",
    location: "Freetown",
  },
]

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-600">Hear from community leaders who know Steven&apos;s work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {testimonial.title}
                      {testimonial.organization && (
                        <>
                          <br />
                          <span className="font-medium">{testimonial.organization}</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <Quote className="h-6 w-6 text-campaign-blue/30 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-gray-700 italic mb-4">&quot;{testimonial.content}&quot;</blockquote>
                <div className="text-sm text-gray-500">— {testimonial.location}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <span>Want to share your story?</span>
            <a href="/contact" className="text-campaign-blue hover:underline font-medium">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
