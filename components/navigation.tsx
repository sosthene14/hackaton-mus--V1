"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, QrCode, Box, Globe, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-amber-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">MCN</span>
        </Link>

        {/* Desktop Nav */}
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
          <Link href="/scan" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <QrCode className="h-4 w-4" />
            Scan
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.about}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl shadow-xl bg-background/95 backdrop-blur-md border border-border mt-2"
            >
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-3 py-2.5">
                  <Home className="h-4 w-4" /> {t.nav.home}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/gallery" className="flex items-center gap-3 py-2.5">
                  🖼️ {t.nav.gallery}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/tour-3d" className="flex items-center gap-3 py-2.5">
                  <Box className="h-4 w-4" /> {t.nav.tour3d}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/scan" className="flex items-center gap-3 py-2.5">
                  <QrCode className="h-4 w-4" /> Scan
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/about" className="flex items-center gap-3 py-2.5">
                  <Info className="h-4 w-4" /> {t.nav.about}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Globe className="h-3 w-3" /> Langue / Language
                </p>
                <LanguageSwitcher />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
