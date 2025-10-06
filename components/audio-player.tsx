//@ts-nocheck
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { useFetchVoice } from "./hooks/useFetchVoice"

interface AudioPlayerProps {
  description: string
  title: string
}

export function AudioPlayer({ description, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isPuterLoaded, setIsPuterLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { language } = useLanguage()
  const t = translations[language]
  const { fetchAudio, isLoading } = useFetchVoice()

  // Check if Puter.js is loaded
  useEffect(() => {
    const checkPuterLoaded = () => {
      if (typeof window.puter !== "undefined") {
        setIsPuterLoaded(true)
      } else {
        // Retry until Puter.js is loaded
        const interval = setInterval(() => {
          if (typeof window.puter !== "undefined") {
            setIsPuterLoaded(true)
            clearInterval(interval)
          }
        }, 100)
        return () => clearInterval(interval)
      }
    }
    checkPuterLoaded()
  }, [])

  // Generate audio when Puter.js is loaded
useEffect(() => {
  const generateAudio = async () => {
    try {
      const voice = language === "fr" ? "fr-FR-BrigitteNeural" : language === "en" ? "en-US-JennyNeural" : "wo"
      const res = await fetchAudio(description, voice)

      if (!res || !res.ok) throw new Error("TTS request failed")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)

      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
      audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime))
      audio.addEventListener("ended", () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })

      audioRef.current = audio
    } catch (error) {
      console.error("Erreur génération audio:", error)
    }
  }

  generateAudio()

  return () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }
}, [description, language])



  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0]
      setVolume(value[0])
      setIsMuted(value[0] === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="p-6 text-center text-muted-foreground">
         Chargement de l'audio...
        </CardContent>
      </Card>
    )
  }

 

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={togglePlay}
            className="h-12 w-12 shrink-0 bg-transparent"
            aria-label={isPlaying ? t.common.pause : t.common.play}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>

          <div className="flex-1 space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="h-8 w-8 shrink-0"
            aria-label={isMuted ? t.common.unmute : t.common.mute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24 cursor-pointer"
          />
        </div>

        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
