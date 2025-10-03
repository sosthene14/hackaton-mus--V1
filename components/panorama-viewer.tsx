//@ts-nocheck

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface PanoramaScene {
  id: string
  imageUrl: string
  name: {
    fr: string
    en: string
    wo: string
  }
  hotspots?: Array<{
    position: { x: number; y: number; z: number }
    artworkId?: string
    nextScene?: string
    label: {
      fr: string
      en: string
      wo: string
    }
  }>
}

interface PanoramaViewerProps {
  scenes: PanoramaScene[]
  initialSceneId?: string
}

export function PanoramaViewer({ scenes, initialSceneId }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (initialSceneId) {
      const index = scenes.findIndex((s) => s.id === initialSceneId)
      if (index !== -1) setCurrentSceneIndex(index)
    }
  }, [initialSceneId, scenes])

  useEffect(() => {
    if (!containerRef.current) return

    // Dynamically import Panolens to avoid SSR issues
    const loadPanolens = async () => {
      try {
        const PANOLENS = await import("panolens")
        const THREE = await import("three")

        // Create viewer
        const viewer = new PANOLENS.Viewer({
          container: containerRef.current!,
          controlBar: false,
          autoRotate: true,
          autoRotateSpeed: 0.3,
        })

        viewerRef.current = viewer

        // Load initial scene
        loadScene(scenes[currentSceneIndex], viewer, PANOLENS, THREE)

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading Panolens:", error)
        setIsLoading(false)
      }
    }

    loadPanolens()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (!viewerRef.current || isLoading) return

    const loadPanolens = async () => {
      const PANOLENS = await import("panolens")
      const THREE = await import("three")
      loadScene(scenes[currentSceneIndex], viewerRef.current, PANOLENS, THREE)
    }

    loadPanolens()
  }, [currentSceneIndex, isLoading])

  const loadScene = async (scene: PanoramaScene, viewer: any, PANOLENS: any, THREE: any) => {
    // Clear existing panoramas
    viewer.panoramas = []
    viewer.scene.children = viewer.scene.children.filter((child: any) => child.type === "AmbientLight")

    // Create panorama
    const panorama = new PANOLENS.ImagePanorama(scene.imageUrl)

    // Add hotspots
    scene.hotspots?.forEach((hotspot) => {
      const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info)
      infospot.position.set(hotspot.position.x, hotspot.position.y, hotspot.position.z)
      infospot.addHoverText(hotspot.label[language])

      infospot.addEventListener("click", () => {
        if (hotspot.artworkId) {
          router.push(`/gallery/${hotspot.artworkId}`)
        } else if (hotspot.nextScene) {
          const nextIndex = scenes.findIndex((s) => s.id === hotspot.nextScene)
          if (nextIndex !== -1) {
            setCurrentSceneIndex(nextIndex)
          }
        }
      })

      panorama.add(infospot)
    })

    viewer.add(panorama)
  }

  const goToPrevScene = () => {
    setCurrentSceneIndex((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
  }

  const goToNextScene = () => {
    setCurrentSceneIndex((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-muted-foreground">{t.tour3d.loading || "Chargement..."}</p>
          </div>
        </div>
      )}

      {/* Scene info */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur-sm border rounded-lg px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-lg font-semibold">{scenes[currentSceneIndex].name[language]}</h2>
        </div>
      </div>

      {/* Navigation controls */}
      {scenes.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <Button onClick={goToPrevScene} size="lg" variant="secondary" className="rounded-full shadow-lg">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="bg-background/95 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm font-medium">
              {currentSceneIndex + 1} / {scenes.length}
            </span>
          </div>
          <Button onClick={goToNextScene} size="lg" variant="secondary" className="rounded-full shadow-lg">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
