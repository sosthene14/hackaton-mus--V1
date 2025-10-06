"use client"

import { artworks } from "@/lib/artworks-data"
import { ArtworkPedestal } from "./artwork-pedestal"

export function ArtworkDisplays() {
  const positions: [number, number, number][] = [
    // Main Gallery (center room)
    [-10, 0, -12], // Back left
    [0, 0, -12], // Back center
    [10, 0, -12], // Back right
    [-12, 0, 0], // Left side
    [12, 0, 0], // Right side
    [-8, 0, 8], // Front left
    [8, 0, 8], // Front right

    // Left Wing
    [-30, 0, -8], // Left room back
    [-30, 0, 8], // Left room front

    // Right Wing
    [30, 0, -8], // Right room back
    [30, 0, 8], // Right room front
  ]

  return (
    <group>
      {artworks.map((artwork, index) => {
        if (index >= positions.length) return null
        const position = positions[index]

        return <ArtworkPedestal key={artwork.id} artwork={artwork} position={position} />
      })}
    </group>
  )
}
