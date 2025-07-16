"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const languages = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/issues", label: "Issues" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-heading font-bold text-xl text-campaign-blue">
              CECERI FOR STATE REP
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-campaign-blue transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 px-0 font-bold"
                  data-testid="lang-switcher-btn"
                >
                  {languages.find((l) => l.code === lang)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={
                      lang === l.code ? "font-bold text-campaign-blue" : ""
                    }
                  >
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-campaign-red hover:bg-campaign-red/90"
              >
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-campaign-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-campaign-red hover:bg-campaign-red/90"
                >
                  <Link href="/donate">Donate</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
