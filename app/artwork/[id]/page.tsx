//@ts-nocheck

"use client"

import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { artworks } from "@/lib/artworks-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, User, Tag, X, RotateCw, ZoomIn, ZoomOut, Maximize2, Download, Box } from "lucide-react"
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Box className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 z-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">{getText('loading')}</p>
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
        <div className="p-4 border-t bg-muted/30">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-medium">{getText('controls')}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={autoRotate ? "default" : "outline"}
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  {getText('rotate')}
                </Button>
                
                <Button size="sm" variant="outline" onClick={resetCamera} className="gap-2">
                  <RotateCw className="h-4 w-4" />
                  {getText('reset')}
                </Button>
                
                <Button size="sm" variant="outline" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={toggleFullscreen}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
                
                <Button size="sm" variant="outline" onClick={downloadModel} className="gap-2">
                  <Download className="h-4 w-4" />
                  {getText('download')}
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              {getText('instructions')}
            </p>
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

  const artwork = artworks.find((a) => a.id === params.id)

const playTest = () => {
  puter.ai.txt2speech("Hello, world! This is text-to-speech using Puter.js.")
    .then((audio) => {
        audio.play();
    });
}

  

  if (!artwork) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Œuvre non trouvée</h1>
          <Button onClick={() => router.push("/gallery")}>Retour à la galerie</Button>
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

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === "fr" ? "Retour" : language === "en" ? "Back" : "Dellu"}
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted border">
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title[language]}
                fill
                className="object-cover"
              />
            </div>

            {/* 3D View Button */}
            {artwork.model3dUrl && (
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full gap-2"
                size="lg"
              >
                <Box className="h-5 w-5" />
                {get3DButtonText()}
              </Button>
            )}

            {/* QR Code Section */}
            <div className="lg:hidden">
              <QRCodeDisplay
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/artwork/${artwork.id}`}
                label={t.artwork.scanToView}
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div className="space-y-3">
              <Badge variant="secondary" className="text-sm">
                {artwork.category}
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">{artwork.title[language]}</h1>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.artwork.artist}</p>
                  <p className="font-medium">{artwork.artist}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.artwork.period}</p>
                  <p className="font-medium">{artwork.period}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.artwork.origin}</p>
                  <p className="font-medium">{artwork.origin}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Tag className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.artwork.category}</p>
                  <p className="font-medium">{artwork.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-semibold text-xl">
                {language === "fr" ? "Description" : language === "en" ? "Description" : "Wone"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{artwork.description[language]}</p>
            </div>

            {/* Audio Player */}
            <div className="space-y-3">
              <h2 className="font-semibold text-xl">{t.artwork.listenDescription}</h2>
             <AudioPlayer
  description={artwork.description[language]} // Pass description text
  title={artwork.title[language]}
/>
            </div>

            {/* QR Code Section - Desktop */}
            <div className="hidden lg:block">
              <QRCodeDisplay
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/artwork/${artwork.id}`}
                label={t.artwork.scanToView}
              />
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