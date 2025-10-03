"use client"

import { useLanguage } from "@/lib/language-context"
import { Building2, Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    fr: {
      title: "À propos du Musée",
      subtitle: "Un lieu emblématique dédié aux civilisations africaines",
      mission: {
        title: "Notre Mission",
        description:
          "Le Musée des Civilisations Noires est l'un des plus grands espaces culturels du Sénégal et d'Afrique. Il abrite une richesse patrimoniale inestimable qui mérite d'être accessible au plus grand nombre.",
      },
      stats: [
        { icon: Building2, label: "Inauguré en", value: "2018" },
        { icon: Users, label: "Visiteurs annuels", value: "50,000+" },
        { icon: Globe, label: "Œuvres exposées", value: "100+" },
        { icon: Award, label: "Collections", value: "5" },
      ],
      vision: {
        title: "Notre Vision",
        description:
          "Faire rayonner les civilisations noires à travers le monde et préserver le patrimoine africain pour les générations futures. Ce projet digital s'inscrit dans cette démarche de démocratisation de l'accès à la culture.",
      },
    },
    en: {
      title: "About the Museum",
      subtitle: "An iconic place dedicated to African civilizations",
      mission: {
        title: "Our Mission",
        description:
          "The Museum of Black Civilizations is one of the largest cultural spaces in Senegal and Africa. It houses an invaluable heritage that deserves to be accessible to as many people as possible.",
      },
      stats: [
        { icon: Building2, label: "Inaugurated in", value: "2018" },
        { icon: Users, label: "Annual visitors", value: "50,000+" },
        { icon: Globe, label: "Artworks displayed", value: "100+" },
        { icon: Award, label: "Collections", value: "5" },
      ],
      vision: {
        title: "Our Vision",
        description:
          "To showcase Black civilizations around the world and preserve African heritage for future generations. This digital project is part of this effort to democratize access to culture.",
      },
    },
    wo: {
      title: "Ci Muse bi",
      subtitle: "Benn bes bu mag bu jëkk ci sivilisasiyu ñu ñuul",
      mission: {
        title: "Sunuy Xëy",
        description:
          "Muse yu Sivilisasiyu ñu Ñuul dafa am ci yëf yu mag yu Senegaal ak Afrik. Dafa am boyotu aadama bu mag bu war a gis.",
      },
      stats: [
        { icon: Building2, label: "Ubbi ci", value: "2018" },
        { icon: Users, label: "Ñu ñëw ci at", value: "50,000+" },
        { icon: Globe, label: "Liggéey yi", value: "100+" },
        { icon: Award, label: "Koleksiyoŋ", value: "5" },
      ],
      vision: {
        title: "Sunuy Xalaat",
        description:
          "Wone sivilisasiyu ñu ñuul ci àdduna bi te tëral boyotu Afrik ngir yëf yi ñëw. Projet digital bii dafa am ci xëy boobu.",
      },
    },
  }

  const t = content[language]

  return (
    <main className="min-h-screen bg-background justify-center items-center flex">
      <div className="container px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border rounded-lg p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold">{t.mission.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.mission.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/50"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Vision */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border rounded-lg p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold">{t.vision.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.vision.description}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
