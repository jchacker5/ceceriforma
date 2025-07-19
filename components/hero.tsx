"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"

export function Hero() {
  const { t } = useTranslation();
  
  return (
    <section className="relative bg-gradient-to-br from-campaign-blue to-campaign-blue/80 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col-reverse items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
                {t.hero.heading}
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                {t.hero.subheading}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/issues">{t.hero.readMyPlan}</Link>
              </Button>
              <Button asChild size="lg" className="text-lg px-8 bg-campaign-red hover:bg-campaign-red/90">
                <Link href="/donate">{t.hero.donateToday}</Link>
              </Button>
            </div>
            <div className="text-sm text-blue-100">
              <p className="font-semibold">{t.hero.district}</p>
              <p>{t.hero.districtAreas}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/steven-ceceri-headshot.jpeg"
                alt="Steven V. Ceceri"
                width={450}
                height={450}
                className="rounded-full shadow-2xl object-cover w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
