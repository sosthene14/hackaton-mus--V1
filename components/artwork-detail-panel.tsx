"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMuseumStore } from "./store/useMuseumStore"

export function ArtworkDetailPanel() {
  const { selectedArtwork, language, setSelectedArtwork, setLanguage } = useMuseumStore()

  if (!selectedArtwork) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#f5f5f0] border-[#d4c5b0]">
        <div className="p-6 space-y-4">
          {/* Header with close button */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-3xl font-serif text-[#2c2416]">{selectedArtwork.title[language]}</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedArtwork(null)} className="shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="wo">Wolof</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedArtwork.imageUrl && (
            <div className="relative w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={selectedArtwork.imageUrl || "/placeholder.svg"}
                alt={selectedArtwork.title[language]}
                className="w-full h-auto object-contain max-h-[400px]"
              />
            </div>
          )}

          {/* Details */}
          <div className="space-y-3 text-[#2c2416]">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-muted-foreground">Artist</p>
                <p>{selectedArtwork.artist}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Period</p>
                <p>{selectedArtwork.period}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Origin</p>
                <p>{selectedArtwork.origin}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Category</p>
                <p>{selectedArtwork.category}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-semibold text-muted-foreground mb-2">Description</p>
              <p className="leading-relaxed text-pretty">{selectedArtwork.description[language]}</p>
            </div>

            {/* QR Code */}
            <div className="pt-2 border-t border-[#d4c5b0]">
              <p className="text-sm text-muted-foreground">Reference: {selectedArtwork.qrCode}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
