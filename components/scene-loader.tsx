"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"

export function SceneLoader() {
  const { active, progress } = useProgress()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [active, progress])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e8e4dc]">
      <div className="flex flex-col items-center gap-6">
        {/* Museum icon */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#3a2a1a] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#3a2a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3a2a1a] mb-2">Chargement du Musée</h2>
          <p className="text-[#5a4a3a] text-sm">Préparation des œuvres d'art...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-white rounded-full overflow-hidden">
          <div className="h-full bg-[#3a2a1a] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Progress percentage */}
        <p className="text-[#5a4a3a] font-mono text-sm">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
