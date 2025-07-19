import Link from "next/link"
import { Facebook, X, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">CECERI FOR STATE REP</h3>
            <p className="text-gray-300">Common-sense leadership for the South Coast</p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/StevenCeceri" className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com/@cecerep" className="text-gray-300 hover:text-white"></Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/issues" className="hover:text-white">
                  Issues
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Get Involved</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/donate" className="hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white">
                  Sign Up to Volunteer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feed" className="hover:text-white">
                  Latest Updates
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>steven@ceceriforma.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(401) 419-1781</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>Campaign Headquarters</p>
                  <p>1822 North Main Street, Second Floor Annex Suite 001</p>
                  <p>Fall River, MA 02720</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              <p>© 2025 Steven Ceceri for State Representative. All rights reserved.</p>
              <p className="mt-1">
                8th Bristol District - Westport · Fall River Pcts A/C · Freetown · Acushnet · New Bedford
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">
            <strong>Paid for by Steven V. Ceceri for State Representative.</strong> This communication is not authorized
            by any candidate or candidate's committee. Contributions to Steven V. Ceceri for State Representative are
            not tax-deductible. Massachusetts law requires us to collect and report the name, address, occupation, and
            employer of individuals whose contributions exceed $200 in a calendar year.
          </p>
        </div>
      </div>
    </footer>
  )
}
