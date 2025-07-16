"use client";

import { useTranslation } from "@/components/language-provider";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">
              CECERI FOR STATE REP
            </h3>
            <p className="text-gray-300">{t.footer.slogan}</p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/cecerep"
                className="text-gray-300 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/cecerep"
                className="text-gray-300 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/cecerep"
                className="text-gray-300 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@cecerep"
                className="text-gray-300 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/issues" className="hover:text-white">
                  {t.navigation.issues}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">
                  {t.navigation.events}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  {t.navigation.about}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white">
                  {t.navigation.volunteer}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t.footer.getInvolved}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/donate" className="hover:text-white">
                  {t.navigation.donate}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white">
                  {t.footer.signUpVolunteer}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t.contact.title}
                </Link>
              </li>
              <li>
                <Link href="/feed" className="hover:text-white">
                  {t.home.latestUpdates}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t.footer.contact}</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@ceceriforma.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(508) 555-0123</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>{t.footer.campaignHeadquarters}</p>
                  <p>123 Main Street</p>
                  <p>Fall River, MA 02720</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              <p>
                &copy; 2024 Steven V. Ceceri for State Representative.{" "}
                {t.footer.rightsReserved}
              </p>
              <p className="mt-1">
                {t.footer.district} - Westport · Fall River Pcts A/C · Freetown
                · Acushnet · New Bedford
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-white">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="hover:text-white">
                {t.footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">
            <strong>{t.footer.paidForBy}</strong> {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
