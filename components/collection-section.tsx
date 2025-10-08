"use client"

import { artworks } from "@/lib/artworks-data"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export const CollectionSection = () => {
  const { language } = useLanguage()

  return (
    <div className="max-w-7xl mt-[950px] md:mt-[350px] lg:mt-[130px] mx-auto px-8 py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-3">
          {language === "fr" ? "Collection exceptionnelle" : language === "en" ? "Exceptional Collection" : "Koleksion bu rafet"}
        </h2>
        <p className="text-lg">
          {language === "fr"
            ? "Plus de 100 œuvres emblématiques des civilisations africaines"
            : language === "en"
            ? "Over 100 iconic works from African civilizations"
            : "Lu ëpp ci 100 yëf yu am solo ci sivilisasyon afrikeen"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {artworks.slice(0, 4).map((artwork) => (
          <Card
            key={artwork.id}
            className="bg-white/5 shadow-md backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex gap-6 px-6 py-2">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-700">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-orange-400 text-sm mb-1">{artwork.category}</p>
                  <h3 className="text-2xl font-bold mb-2">{artwork.title[language]}</h3>
                  <p className="  text-sm leading-relaxed">{artwork.description[language]}</p>
                </div>
                <Button className="bg-orange-500 cursor-pointer hover:bg-orange-600 w-fit mt-4">
                    <Link href={`/artwork/${artwork.id}`}>

                  {language === "fr" ? "Voir plus" : language === "en" ? "See More" : "Xool bu baax"}
                    </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
      
            <Link href="/gallery">
  <Button
          variant="outline"
          size="lg"
          className="bg-white/5 cursor-pointer hover:bg-white/10 shadow-md border-white/20 backdrop-blur-md"
        >
          {language === "fr"
            ? "Voir toute la collection"
            : language === "en"
            ? "View the Entire Collection"
            : "Xool lépp ci koleksion"}
            </Button>
            </Link>
        
      </div>
    </div>
  )
}