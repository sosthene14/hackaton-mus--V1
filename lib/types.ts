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
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    welcome: string // Added to match translations object
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
  footer: {
    about: {
      title: string
      ourMission: string
      team: string
      partners: string
    }
    visit: {
      title: string
      hoursAndPrices: string
      tour3d: string
      currentExhibitions: string
      events: string
      bookGuide: string
    }
    gallery: {
      title: string
      browseArtworks: string
      permanentExhibitions: string
      temporaryExhibitions: string
      digitalArchives: string
      onlineCatalog: string
    }
    contact: {
      title: string
      contactUs: string
      educationalService: string
      spaceRental: string
      newsletter: string
    }
    bottom: {
      copyright: string
      pressAndMedia: string
    }
  }
  common: {
    scanQR: string
    cancel: string
    scanningQR: string
    loading: string
    audioNotAvailable: string
  }
}