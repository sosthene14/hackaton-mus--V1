"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, QrCode, Box, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function Navigation() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-amber-700 flex items-center justify-center">
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

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-700 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <span className="font-semibold text-lg">MCN</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1 mt-6 flex-1">
                  <SheetClose asChild>
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      {t.nav.home}
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link 
                      href="/gallery" 
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      {t.nav.gallery}
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link 
                      href="/tour-3d" 
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      <Box className="h-5 w-5" />
                      {t.nav.tour3d}
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link 
                      href="/scan" 
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      <QrCode className="h-5 w-5" />
                      Scan
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link 
                      href="/about" 
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      {t.nav.about}
                    </Link>
                  </SheetClose>
                </div>

                {/* Language Switcher at Bottom */}
                <div className="pt-4 border-t mt-auto">
                  <div className="px-4 py-2">
                    <p className="text-sm text-muted-foreground mb-3">Langue / Language</p>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}