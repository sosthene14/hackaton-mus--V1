//@ts-nocheck

"use client"

import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { artworks } from "@/lib/artworks-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, User, Tag, X, RotateCw, ZoomIn, ZoomOut, Maximize2, Download, Box, Share2, Heart, Info, Bookmark, Eye } from "lucide-react"
import Image from "next/image"
import { QRCodeDisplay } from "@/components/qr-code-display"
import { AudioPlayer } from "@/components/audio-player"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

// Composant Modal pour le modèle 3D
function Model3DModal({ isOpen, onClose, modelUrl, title, language }) {
  const [isLoading, setIsLoading] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [modelRef, setModelRef] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleModelLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    if (modelRef) {
      if (autoRotate) {
        modelRef.setAttribute('auto-rotate', '')
      } else {
        modelRef.removeAttribute('auto-rotate')
      }
    }
  }, [autoRotate, modelRef])

  const resetCamera = () => {
    if (modelRef) {
      modelRef.resetTurntableRotation?.()
      modelRef.fieldOfView = '45deg'
      modelRef.cameraOrbit = '0deg 75deg 105%'
    }
  }

  const zoomIn = () => {
    if (modelRef) {
      const currentOrbit = modelRef.getCameraOrbit()
      const currentRadius = currentOrbit.radius
      modelRef.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${Math.max(0.5, currentRadius * 0.9)}m`
    }
  }

  const zoomOut = () => {
    if (modelRef) {
      const currentOrbit = modelRef.getCameraOrbit()
      const currentRadius = currentOrbit.radius
      modelRef.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${Math.min(10, currentRadius * 1.1)}m`
    }
  }

  const toggleFullscreen = () => {
    if (modelRef) {
      if (!document.fullscreenElement) {
        modelRef.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  const downloadModel = () => {
    window.open(modelUrl, '_blank')
  }

  if (!isOpen) return null

  const getText = (key) => {
    const texts = {
      loading: { fr: "Chargement du modèle 3D...", en: "Loading 3D model...", wo: "Doxlin modèle 3D..." },
      controls: { fr: "Contrôles", en: "Controls", wo: "Contrôles" },
      rotate: { fr: "Rotation auto", en: "Auto rotate", wo: "Rotation auto" },
      reset: { fr: "Réinitialiser", en: "Reset", wo: "Wuttal" },
      zoomIn: { fr: "Zoomer", en: "Zoom in", wo: "Gën" },
      zoomOut: { fr: "Dézoomer", en: "Zoom out", wo: "Wañ" },
      fullscreen: { fr: "Plein écran", en: "Fullscreen", wo: "Écran bu fees" },
      download: { fr: "Télécharger", en: "Download", wo: "Télécharger" },
      instructions: { fr: "Cliquez et faites glisser pour faire pivoter • Molette pour zoomer", en: "Click and drag to rotate • Scroll to zoom", wo: "Bët te doxal ngir yébbal • Scroll ngir gën" }
    }
    return texts[key][language] || texts[key]['fr']
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col border-2 border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Box className="h-5 w-5 text-amber-700" />
            </div>
            <h2 className="text-xl font-serif font-bold text-slate-900">{title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden bg-slate-50">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600 font-medium">{getText('loading')}</p>
            </div>
          )}
          
          <model-viewer
            ref={(ref) => {
              if (ref) {
                setModelRef(ref)
                ref.addEventListener("load", handleModelLoad)
                ref.addEventListener("error", () => {
                  console.error("Erreur lors du chargement du modèle")
                  setIsLoading(false)
                })
              }
            }}
            src={modelUrl}
            alt={title}
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            camera-orbit="0deg 75deg 105%"
            field-of-view="30deg"
            min-camera-orbit="auto auto 50%"
            max-camera-orbit="auto auto 200%"
            style={{ width: "100%", height: "100%" }}
          ></model-viewer>
        </div>

        {/* Controls */}
        <div className="p-6 border-t-2 border-slate-200 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-sm font-semibold text-slate-700">{getText('controls')}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={autoRotate ? "default" : "outline"}
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`gap-2 ${autoRotate ? 'bg-amber-600 hover:bg-amber-700' : 'border-slate-300'}`}
                >
                  <RotateCw className="h-4 w-4" />
                  {getText('rotate')}
                </Button>
                
                <Button size="sm" variant="outline" onClick={resetCamera} className="gap-2 border-slate-300">
                  <RotateCw className="h-4 w-4" />
                  {getText('reset')}
                </Button>
                
                <Button size="sm" variant="outline" onClick={zoomIn} className="border-slate-300">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={zoomOut} className="border-slate-300">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={toggleFullscreen} className="border-slate-300">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={downloadModel} className="gap-2 border-slate-300">
                  <Download className="h-4 w-4" />
                  {getText('download')}
                </Button>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-800 text-center font-medium">
                {getText('instructions')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArtworkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const artwork = artworks.find((a) => a.id === params.id)

  useEffect(() => {
    if (artwork) {
      // Charger les favoris
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setIsFavorite(favorites.includes(artwork.id))
      
      // Charger les bookmarks
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
      setIsBookmarked(bookmarks.includes(artwork.id))
      
      // Incrémenter et charger le compteur de vues
      const views = JSON.parse(localStorage.getItem('artworkViews') || '{}')
      views[artwork.id] = (views[artwork.id] || 0) + 1
      setViewCount(views[artwork.id])
      localStorage.setItem('artworkViews', JSON.stringify(views))
    }
  }, [artwork])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const updated = favorites.filter(id => id !== artwork.id)
      localStorage.setItem('favorites', JSON.stringify(updated))
    } else {
      favorites.push(artwork.id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (isBookmarked) {
      const updated = bookmarks.filter(id => id !== artwork.id)
      localStorage.setItem('bookmarks', JSON.stringify(updated))
    } else {
      bookmarks.push(artwork.id)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = artwork.title[language]
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      copy: url
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      alert(language === 'fr' ? 'Lien copié !' : language === 'en' ? 'Link copied!' : 'Lien kopié!')
    } else {
      window.open(shareUrls[platform], '_blank')
    }
    setShowShareMenu(false)
  }

  if (!artwork) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Œuvre non trouvée</h1>
          <Button onClick={() => router.push("/gallery")} className="bg-amber-600 hover:bg-amber-700">
            Retour à la galerie
          </Button>
        </div>
      </main>
    )
  }

  const get3DButtonText = () => {
    const texts = {
      fr: "Voir en 3D",
      en: "View in 3D",
      wo: "Xool ci 3D"
    }
    return texts[language] || texts['fr']
  }

  const getShareText = () => {
    const texts = {
      fr: "Partager",
      en: "Share",
      wo: "Wax"
    }
    return texts[language] || texts['fr']
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header with actions */}
      <div className="bg-white border-b-2 border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2 hover:bg-slate-100">
            <ArrowLeft className="h-4 w-4" />
            {language === "fr" ? "Retour" : language === "en" ? "Back" : "Dellu"}
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              className={`rounded-full ${isFavorite ? 'text-red-600 hover:text-red-700' : 'hover:bg-slate-100'}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={`rounded-full ${isBookmarked ? 'text-amber-600 hover:text-amber-700' : 'hover:bg-slate-100'}`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="rounded-full hover:bg-slate-100"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-slate-200 py-2 z-50">
                  <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm">
                    Facebook
                  </button>
                  <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm">
                    Twitter
                  </button>
                  <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm">
                    WhatsApp
                  </button>
                  <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm">
                    {language === 'fr' ? 'Copier le lien' : language === 'en' ? 'Copy link' : 'Koppi lien'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       
      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shadow-lg">
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title[language]}
                fill
                className="object-cover"
              />
              
              {/* View counter badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-2">
                <Eye className="h-3 w-3" />
                {viewCount} {language === 'fr' ? 'vues' : language === 'en' ? 'views' : 'xool'}
              </div>
            </div>

            {/* 3D View Button */}
            {artwork.model3dUrl && (
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full gap-2 bg-amber-600 hover:bg-amber-700 h-12 text-base font-medium"
                size="lg"
              >
                <Box className="h-5 w-5" />
                {get3DButtonText()}
              </Button>
            )}

            {/* QR Code Section - Mobile */}
            <div className="lg:hidden">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm">
                <QRCodeDisplay
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/artwork/${artwork.id}`}
                  label={t.artwork.scanToView}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div className="space-y-3 bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm">
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300">
                {artwork.category}
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">{artwork.title[language]}</h1>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">{t.artwork.artist}</p>
                  <p className="font-semibold text-slate-900 truncate">{artwork.artist}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">{t.artwork.period}</p>
                  <p className="font-semibold text-slate-900 truncate">{artwork.period}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">{t.artwork.origin}</p>
                  <p className="font-semibold text-slate-900 truncate">{artwork.origin}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Tag className="h-5 w-5 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">{t.artwork.category}</p>
                  <p className="font-semibold text-slate-900 truncate">{artwork.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-600" />
                <h2 className="font-serif font-bold text-xl text-slate-900">
                  {language === "fr" ? "Description" : language === "en" ? "Description" : "Wone"}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed">{artwork.description[language]}</p>
            </div>

            {/* Audio Player */}
            <div className="bg-white border-2  rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-xl text-slate-900">{t.artwork.listenDescription}</h2>
              <AudioPlayer
                description={artwork.description[language]}
                title={artwork.title[language]}
              />
            </div>

            {/* QR Code Section - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white border-2  rounded-xl p-6 shadow-sm">
                <QRCodeDisplay
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/artwork/${artwork.id}`}
                  label={t.artwork.scanToView}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Modal */}
      {artwork.model3dUrl && (
        <Model3DModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modelUrl={artwork.model3dUrl}
          title={artwork.title[language]}
          language={language}
        />
      )}
    </main>
  )
}