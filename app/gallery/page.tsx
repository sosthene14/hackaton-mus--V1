"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { artworks } from "@/lib/artworks-data"
import { ArtworkCard } from "@/components/artwork-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState, useMemo } from "react"

export default function GalleryPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set(artworks.map((a) => a.category))
    return ["all", ...Array.from(cats)]
  }, [])

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesSearch =
        artwork.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.origin.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || artwork.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter, language])

  return (
    <main className="min-h-screen bg-background justify-center items-center flex">
      <div className="container px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{t.gallery.title}</h1>
          <p className="text-lg text-muted-foreground">{t.gallery.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === "fr" ? "Rechercher..." : language === "en" ? "Search..." : "Seet..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === "fr" ? "Toutes" : language === "en" ? "All" : "Lépp"}</SelectItem>
              {categories
                .filter((c) => c !== "all")
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* No Results */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === "fr" ? "Aucune œuvre trouvée" : language === "en" ? "No artworks found" : "Amul liggéey"}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
