export interface Artwork {
  id: string
  title: {
    fr: string
    en: string
    wo: string
  }
  description: {
    fr: string
    en: string
    wo: string
  }
  model3dUrl?: string
  artist: string
  period: string
  origin: string
  category: string
  imageUrl: string
  audioUrl?: string
  qrCode: string
}

export type Language = "fr" | "en" | "wo"

export interface LanguageContent {
  nav: {
    home: string
    gallery: string
    about: string
    tour3d: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  gallery: {
    title: string
    subtitle: string
    scanQr: string
    viewDetails: string
    listenAudio: string
    search: string
    filterAll: string
    filterSculpture: string
    filterTextile: string
    filterBronze: string
  }
  artwork: {
    artist: string
    period: string
    origin: string
    category: string
    listenDescription: string
    scanToView: string
    relatedArtworks: string
  }
  tour3d: {
    title: string
    subtitle: string
    instructions: string
    clickToView: string
    loading: string
  }
  common: {
    scanQR: string
    cancel: string
    scanningQR: string
    loading: string
    audioNotAvailable: string
  }
}
