"use client"

import HistoryAndCTASecion from "@/components/history-cta"
import ValuesSection from "@/components/our-value"
import { useLanguage } from "@/lib/language-context"
import { Building2, Users, Globe, Award, MapPin, Clock, Phone, Mail, Calendar, Heart, Sparkles } from "lucide-react"
import Image from "next/image"

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

    const images = [
    { src: '/dogon.jpg', alt: 'Large figure with elaborate headdress and drum', layout: 'col-span-2 row-span-2' },
    { src: '/nok.jpg', alt: 'Central display with two figures on pillars', layout: 'col-span-1 row-span-1' },
    { src: '/trone.jpg', alt: 'Figures in dark woven material on the right', layout: 'col-span-2 row-span-1' },
    { src: '/textile.jpg', alt: 'Mask in a glass case on the bottom left', layout: 'col-span-1 row-span-1' },
    { src: '/fang.jpg', alt: 'Smaller wooden mask', layout: 'col-span-1 row-span-1' },
    { src: '/femme_fs.webp', alt: 'Figures in green and brown outfits', layout: 'col-span-2 row-span-1' },
  ];

  return (
    <div>
       <HeroSection />
         <div className="max-w-7xl z-10 mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
       
      
      {/* --- Top Text Section --- */}
      <header className="grid mb-10 mt-20 grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* 'À PROPOS' (About) Column */}
        <div>
          <h2 className="text-orange-500 font-bold text-lg mb-2 uppercase tracking-widest">
            À PROPOS
          </h2>
          <p className="text-4xl font-bold leading-snug">
            Nous offrons aux institutions culturelles une technologie innovante pour démocratiser l'accès au patrimoine
          </p>
        </div>

        {/* Mission & Vision Column */}
        <div className="text-gray-700">
          <h3 className="text-xl text-orange-500 font-bold mb-1 uppercase tracking-wider">
            NOTRE MISSION
          </h3>
          <p className="mb-6 text-base">
            Le **Musée des Civilisations Noires** est l'un des plus grands espaces culturels du Sénégal et d'Afrique. Il abrite une richesse patrimoniale inestimable qui mérite d'être accessible au plus grand nombre.
          </p>
          <h3 className="text-xl  text-orange-500 font-bold mb-1 uppercase tracking-wider">
            NOTRE VISION
          </h3>
          <p className="text-base">
            Faire rayonner les civilisations noires à travers le monde et préserver le patrimoine africain pour les générations futures. Ce projet digital s'inscrit dans cette démarche de démocratisation de l'accès à la culture.
          </p>
        </div>
      </header>

      {/* --- Gallery/Image Section --- */}
      <div className="grid mt-20 grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 relative">
        
        {/* Dotted Pattern (Styled to mimic the original position) */}
        <div className="absolute right-0 top-1/2 transform translate-x-1/4 -translate-y-1/2 w-48 h-48 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                {Array.from({ length: 12 * 8 }).map((_, i) => {
                    const cx = (i % 8) * 12.5 + 6.25;
                    const cy = Math.floor(i / 8) * 8.33 + 4.16;
                    return <circle key={i} cx={cx} cy={cy} r="1" fill="#D1D5DB" />; // Light gray dots
                })}
            </svg>
        </div>
        
        {/* Layout: We'll use a responsive grid to approximate the complex, asymmetrical layout. 
            The image is laid out in a few distinct blocks:
            - Large vertical image (Left)
            - Two small masks (Bottom-Left)
            - Central/Right block (Mix of 3 horizontal images and 2 lower figures)
        */}

        {/* Large Figure (col-span-3 on md/lg) */}
        <div className="col-span-4 md:col-span-3 aspect-[3/4] overflow-hidden">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full rounded-md object-cover"
          />
        </div>

        {/* Center Pillars (col-span-2 on md/lg, above the two right figures) */}
        <div className="col-span-4 md:col-span-5 grid grid-cols-5 gap-4">
          
          {/* Center-Top: Pillars & Right Figures in one row */}
          <div className="col-span-5 grid grid-cols-5 gap-4">
              <div className="col-span-2 aspect-[4/3] overflow-hidden">
                <img src={images[1].src} alt={images[1].alt} className="w-full rounded-md h-full object-cover" />
              </div>
              <div className="col-span-3 aspect-[4/3] overflow-hidden">
                <img src={images[2].src} alt={images[2].alt} className="w-full rounded-md h-full object-cover" />
              </div>
          </div>

          {/* Center-Bottom: Green/Brown Figures */}
          <div className="col-span-5 aspect-[16/7] overflow-hidden">
             <img src={images[5].src} alt={images[5].alt} className="w-full rounded-md h-full object-cover" />
          </div>
        </div>

        {/* Small Masks (Bottom Left, below the large figure) */}
        <div className="col-span-4 md:col-span-3 flex gap-4 mt-4 md:mt-0">
          {/* Mask 1 (Left) - styled with a 'lightbox' look */}
          <div className="flex-1 p-2 bg-white shadow-lg border border-gray-100 rounded">
            <img
              src={images[3].src}
              alt={images[3].alt}
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          {/* Mask 2 (Right) */}
          <div className="flex-1 overflow-hidden">
            <img
              src={images[4].src}
              alt={images[4].alt}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        </div>

      </div>
   <ValuesSection />

<HistoryAndCTASecion />
    </div>
    </div>
    
  )
}



const HeroSection = () => {
  return (
    // The main container with the large, dark background that contains the image and text.
   <div className="relative w-full z-0"> 
      
      {/* --- Background Image Container --- */}
      <div 
        className="relative bg-gray-900 bg-cover bg-center h-[500px]  flex items-center justify-center"
        style={{ 
          backgroundImage: `url('/hero.jpg')`, // ⬅️ Replace with your actual image path
          // Apply a subtle dark overlay for better text readability
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundBlendMode: 'darken',
        }}
      >
        
        {/* --- Text Content Container --- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Une expérience à laquelle vous pouvez faire confiance
          </h1>

          {/* Subtitle/Description */}
          <p className="text-lg sm:text-xl font-light max-w-2xl mx-auto mb-10">
            De la numérisation 3D aux visites virtuelles immersives, nous utilisons les technologies les plus innovantes pour rendre le patrimoine africain accessible au monde entier.
          </p>

          {/* CTA Button */}
          <a
            href="#histoire" // Link to the 'Notre Histoire' section
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-orange-500 bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Lisez notre histoire
          </a>
        </div>
        


        
      </div>
      
    </div>
  );
};

