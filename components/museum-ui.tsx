"use client"

import { ArtworkDetailPanel } from "./artwork-detail-panel"
import { Info } from "lucide-react"

export function MuseumUI() {
  return (
    <>
      {/* Info overlay */}
      <div className="fixed top-4 left-4 z-10 bg-[#f5f5f0]/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-[#d4c5b0] shadow-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-[#8b7355] shrink-0 mt-0.5" />
          <div className="text-sm text-[#2c2416]">
            <p className="font-semibold mb-1">African Art Museum</p>
            <p className="text-muted-foreground">Click on any artwork to view details</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-10 bg-[#f5f5f0]/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-[#d4c5b0] shadow-lg">
        <p className="text-xs font-semibold text-[#2c2416] mb-1">Controls</p>
        <p className="text-xs text-muted-foreground">WASD or Arrow Keys to move • Click and drag to look around</p>
      </div>

      {/* Detail panel */}
      <ArtworkDetailPanel />
    </>
  )
}
