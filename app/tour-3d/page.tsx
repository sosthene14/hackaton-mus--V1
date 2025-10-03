"use client"

import dynamic from "next/dynamic"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Loader2 } from "lucide-react"
import { artworks } from "@/lib/artworks-data"

const PanoramaViewer = dynamic(
  () => import("@/components/panorama-viewer").then((mod) => ({ default: mod.PanoramaViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full flex items-center justify-center bg-muted">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Chargement de la visite virtuelle...</p>
        </div>
      </div>
    ),
  },
)

export default function Tour3DPage() {
  const { language } = useLanguage()
  const t = translations[language]

  // Define panoramic scenes with hotspots
  const scenes = [
    {
      id: "main-hall",
      imageUrl: "/panoramas/main-hall.jpg",
      name: {
        fr: "Salle Principale",
        en: "Main Hall",
        wo: "Kër bu Mag",
      },
      hotspots: [
        {
          position: { x: -2000, y: 0, z: 1000 },
          artworkId: artworks[0].id,
          label: artworks[0].title,
        },
        {
          position: { x: 2000, y: 0, z: 1000 },
          artworkId: artworks[1].id,
          label: artworks[1].title,
        },
        {
          position: { x: 0, y: 0, z: -3000 },
          nextScene: "sculpture-gallery",
          label: {
            fr: "Galerie des Sculptures",
            en: "Sculpture Gallery",
            wo: "Galeeri Sikilptir",
          },
        },
      ],
    },
    {
      id: "sculpture-gallery",
      imageUrl: "/panoramas/sculpture-gallery.jpg",
      name: {
        fr: "Galerie des Sculptures",
        en: "Sculpture Gallery",
        wo: "Galeeri Sikilptir",
      },
      hotspots: [
        {
          position: { x: -2500, y: 0, z: 500 },
          artworkId: artworks[2].id,
          label: artworks[2].title,
        },
        {
          position: { x: 2500, y: 0, z: 500 },
          artworkId: artworks[4].id,
          label: artworks[4].title,
        },
        {
          position: { x: 0, y: 0, z: -3000 },
          nextScene: "textile-room",
          label: {
            fr: "Salle des Textiles",
            en: "Textile Room",
            wo: "Kër Dëkk",
          },
        },
        {
          position: { x: 0, y: 0, z: 3000 },
          nextScene: "main-hall",
          label: {
            fr: "Retour à la Salle Principale",
            en: "Back to Main Hall",
            wo: "Dellu ci Kër bu Mag",
          },
        },
      ],
    },
    {
      id: "textile-room",
      imageUrl: "/panoramas/textile-room.jpg",
      name: {
        fr: "Salle des Textiles",
        en: "Textile Room",
        wo: "Kër Dëkk",
      },
      hotspots: [
        {
          position: { x: -2000, y: 0, z: 1500 },
          artworkId: artworks[3].id,
          label: artworks[3].title,
        },
        {
          position: { x: 2000, y: 0, z: 1500 },
          artworkId: artworks[5].id,
          label: artworks[5].title,
        },
        {
          position: { x: 0, y: 0, z: 3000 },
          nextScene: "sculpture-gallery",
          label: {
            fr: "Retour à la Galerie",
            en: "Back to Gallery",
            wo: "Dellu ci Galeeri",
          },
        },
      ],
    },
  ]

  return (
    <main className="relative">
      {/* Instructions overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-background/95 backdrop-blur-sm border rounded-lg px-6 py-4 shadow-lg max-w-2xl">
        <h1 className="font-serif text-2xl font-bold mb-2">{t.tour3d.title}</h1>
        <p className="text-sm text-muted-foreground">{t.tour3d.instructions}</p>
      </div>

      {/* Panorama Viewer */}
      <PanoramaViewer scenes={scenes} />
    </main>
  )
}
