"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "./ui/button"
import { Menu, QrCode, Box, Home, Info, Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export const NavSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="bg-slate-700">
      <nav className="sticky top-0 z-50 w-full flex items-center py-2 justify-between px-8 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="text-white font-bold text-sm"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex relative items-center gap-8 text-white/90 text-sm font-medium">
          {[
            { label: t.nav.home, href: "/", icon: <Home className="w-4 h-4" /> },
            { label: t.nav.gallery, href: "/gallery" },
            { label: t.nav.tour3d, href: "/tour-3d", icon: <Box className="w-4 h-4" /> },
            { label: "Scan", href: "/scan", icon: <QrCode className="w-4 h-4" /> },
            { label: t.nav.about, href: "/about", icon: <Info className="w-4 h-4" /> },
            { label: t.nav.contact, href: "/contact", icon: <Phone className="w-4 h-4" /> },

          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex items-center gap-1 text-white/80 hover:text-white transition-all duration-300 pb-1 group"
            >
              {item.icon}
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl shadow-xl bg-slate-700/90 backdrop-blur-md border border-white/30 mt-2"
            >
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-3 py-2.5 text-white">
                  <Home className="h-4 w-4" /> {t.nav.home}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/gallery" className="flex items-center gap-3 py-2.5 text-white">
                  🖼️ {t.nav.gallery}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/tour-3d" className="flex items-center gap-3 py-2.5 text-white">
                  <Box className="h-4 w-4" /> {t.nav.tour3d}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/scan" className="flex items-center gap-3 py-2.5 text-white">
                  <QrCode className="h-4 w-4" /> Scan
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/about" className="flex items-center gap-3 py-2.5 text-white">
                  <Info className="h-4 w-4" /> {t.nav.about}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="flex items-center gap-3 py-2.5 text-white">
                  <Phone className="h-4 w-4" /> {t.nav.contact}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="px-3 py-2">
                <p className="text-xs text-white/70 mb-1 flex items-center gap-1">
                  🌐 Langue / Language
                </p>
                <LanguageSwitcher />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Language Switcher */}
        <div className="hidden md:flex gap-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/30">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  )
}