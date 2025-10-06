"use client"

import { Artwork, Language } from "@/lib/types"
import { create } from "zustand"

interface MuseumStore {
  selectedArtwork: Artwork | null
  language: Language
  setSelectedArtwork: (artwork: Artwork | null) => void
  setLanguage: (language: Language) => void
}

export const useMuseumStore = create<MuseumStore>((set) => ({
  selectedArtwork: null,
  language: "en",
  setSelectedArtwork: (artwork) => set({ selectedArtwork: artwork }),
  setLanguage: (language) => set({ language }),
}))
