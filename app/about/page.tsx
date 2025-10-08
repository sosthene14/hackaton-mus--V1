"use client"

import { useLanguage } from "@/lib/language-context"
import { Building2, Users, Globe, Award, MapPin, Clock, Phone, Mail, Calendar, Heart, Sparkles } from "lucide-react"

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
      info: {
        title: "Informations Pratiques",
        address: "Route de l'Aéroport, Dakar, Sénégal",
        hours: "Mardi - Dimanche: 9h00 - 18h00",
        phone: "+221 33 849 00 00",
        email: "contact@mcn.sn",
        closed: "Fermé le lundi"
      },
      values: {
        title: "Nos Valeurs",
        items: [
          { icon: Heart, title: "Préservation", desc: "Protéger le patrimoine africain" },
          { icon: Globe, title: "Accessibilité", desc: "Culture pour tous" },
          { icon: Sparkles, title: "Innovation", desc: "Technologies modernes" },
        ]
      },
      timeline: {
        title: "Notre Histoire",
        events: [
          { year: "2018", event: "Inauguration officielle du musée" },
          { year: "2020", event: "Expansion de la collection permanente" },
          { year: "2023", event: "Lancement du projet de digitalisation" },
          { year: "2024", event: "Plus de 200,000 visiteurs accueillis" },
        ]
      }
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
      info: {
        title: "Practical Information",
        address: "Airport Road, Dakar, Senegal",
        hours: "Tuesday - Sunday: 9:00 AM - 6:00 PM",
        phone: "+221 33 849 00 00",
        email: "contact@mcn.sn",
        closed: "Closed on Mondays"
      },
      values: {
        title: "Our Values",
        items: [
          { icon: Heart, title: "Preservation", desc: "Protecting African heritage" },
          { icon: Globe, title: "Accessibility", desc: "Culture for everyone" },
          { icon: Sparkles, title: "Innovation", desc: "Modern technologies" },
        ]
      },
      timeline: {
        title: "Our History",
        events: [
          { year: "2018", event: "Official museum inauguration" },
          { year: "2020", event: "Permanent collection expansion" },
          { year: "2023", event: "Digitalization project launch" },
          { year: "2024", event: "Over 200,000 visitors welcomed" },
        ]
      }
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
      info: {
        title: "Xibaar yu Njëg",
        address: "Yoon Aeroport, Dakar, Senegaal",
        hours: "Talaata - Dibéer: 9h00 - 18h00",
        phone: "+221 33 849 00 00",
        email: "contact@mcn.sn",
        closed: "Tëj ci Altine"
      },
      values: {
        title: "Sunuy Melokaan",
        items: [
          { icon: Heart, title: "Tëral", desc: "Gëna boyotu Afrik" },
          { icon: Globe, title: "Jëfandikoo", desc: "Aadama ngir ñépp" },
          { icon: Sparkles, title: "Yeneen", desc: "Téknolosi bu bees" },
        ]
      },
      timeline: {
        title: "Sunuy Jaar-jaar",
        events: [
          { year: "2018", event: "Ubbiku ofisyel bu muse bi" },
          { year: "2020", event: "Yokk koleksiyoŋ yu tolof" },
          { year: "2023", event: "Tambali projet digital" },
          { year: "2024", event: "200,000 ñu jëm ci ñu ñëw" },
        ]
      }
    },
  }

  const t = content[language]

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">{t.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 md:p-10 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-amber-700" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">{t.mission.title}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">{t.mission.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {t.stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-slate-200 rounded-xl p-6 text-center space-y-3 hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center mx-auto">
                    <Icon className="h-7 w-7 text-amber-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">{t.values.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.values.items.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white border-2 border-slate-200 rounded-xl p-6 space-y-3 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">{t.timeline.title}</h2>
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 md:p-10 space-y-6">
            {t.timeline.events.map((event, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Calendar className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="text-2xl font-bold text-amber-700">{event.year}</span>
                    <span className="text-slate-600 text-lg">{event.event}</span>
                  </div>
                  {index < t.timeline.events.length - 1 && (
                    <div className="h-8 w-0.5 bg-slate-200 ml-6 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="mb-12">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-slate-200 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-amber-800" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">{t.vision.title}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">{t.vision.description}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 md:p-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-6">{t.info.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Adresse</p>
                <p className="text-slate-600">{t.info.address}</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Horaires</p>
                <p className="text-slate-600">{t.info.hours}</p>
                <p className="text-slate-500 text-sm mt-1">{t.info.closed}</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Téléphone</p>
                <a href={`tel:${t.info.phone}`} className="text-slate-600 hover:text-amber-700 transition-colors">
                  {t.info.phone}
                </a>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg  flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-orange-700" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Email</p>
                <a href={`mailto:${t.info.email}`} className="text-slate-600 hover:text-amber-700 transition-colors">
                  {t.info.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}