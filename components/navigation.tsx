"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, QrCode, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <nav className="sticky top-0 z-50 w-full justify-center items-center flex border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">MCN</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.gallery}
          </Link>
          <Link
            href="/tour-3d"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <Box className="h-4 w-4" />
            {t.nav.tour3d}
          </Link>
          <Link href="/scan" className="text-sm font-medium hover:text-primary transition-colors">
            <QrCode className="h-4 w-4 inline mr-1" />
            Scan
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.about}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
                <Link href="/gallery" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.nav.gallery}
                </Link>
                <Link href="/tour-3d" className="text-lg font-medium hover:text-primary transition-colors">
                  <Box className="h-5 w-5 inline mr-2" />
                  {t.nav.tour3d}
                </Link>
                <Link href="/scan" className="text-lg font-medium hover:text-primary transition-colors">
                  <QrCode className="h-5 w-5 inline mr-2" />
                  Scan
                </Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.nav.about}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
