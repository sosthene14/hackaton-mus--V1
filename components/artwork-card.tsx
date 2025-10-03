"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import type { Artwork } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ArtworkCardProps {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { language } = useLanguage()

  return (
    <Link href={`/artwork/${artwork.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={artwork.imageUrl || "/placeholder.svg"}
            alt={artwork.title[language]}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {artwork.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{artwork.title[language]}</h3>
          <p className="text-sm text-muted-foreground">{artwork.artist}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{artwork.origin}</span>
            <span>•</span>
            <span>{artwork.period}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
