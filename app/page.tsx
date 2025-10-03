"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Globe, Headphones, Box } from "lucide-react"
import Image from "next/image"
import { QRScanner } from "@/components/qr-scanner"

export default function HomePage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <main className="flex flex-col ">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 -z-10" />
        <div className="absolute inset-0 bg-[url('/african-art-pattern-subtle-geometric.jpg')] opacity-5 -z-10" />

        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Expérience digitale immersive</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/gallery">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                <Link href="/tour-3d">
                  <Box className="mr-2 h-5 w-5" />
                  {t.nav.tour3d}
                </Link>
              </Button>
              <QRScanner />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background justify-center items-center flex">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Box className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Visite 3D</h3>
              <p className="text-muted-foreground text-sm">Explorez le musée en réalité virtuelle</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Multilingue</h3>
              <p className="text-muted-foreground text-sm">Français, English, Wolof</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Audio Guide</h3>
              <p className="text-muted-foreground text-sm">Descriptions audio pour chaque œuvre</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-xl">QR Code</h3>
              <p className="text-muted-foreground text-sm">Scannez et découvrez instantanément</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 md:py-24 bg-muted/30 justify-center items-center flex">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Collection exceptionnelle</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Plus de 100 œuvres emblématiques des civilisations africaines
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-card border">
                  <Image
                    src={`/african-art-museum-piece-.jpg?height=600&width=400&query=african+art+museum+piece+${i}`}
                    alt="Artwork preview"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/gallery">
                  Voir toute la collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
