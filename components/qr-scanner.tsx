"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  const handleScan = () => {
    // Simulate QR code scan - in production, use a library like html5-qrcode
    setIsScanning(true)

    // Simulate scanning delay
    setTimeout(() => {
      // Redirect to a random artwork for demo purposes
      const artworkIds = ["mask-bwa", "statue-dogon", "throne-ashanti", "textile-kente", "mask-fang", "bronze-benin"]
      const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)]
      router.push(`/artwork/${randomId}`)
      setIsScanning(false)
    }, 2000)
  }

  if (isScanning) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <div className="text-center">
          <div className="w-64 h-64 border-4 border-amber-500 rounded-lg mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-16 h-16 text-amber-500 animate-pulse" />
            </div>
          </div>
          <p className="text-white text-lg mb-4">{t.common.scanningQR}</p>
          <Button
            variant="outline"
            onClick={() => setIsScanning(false)}
            className="bg-white/10 text-white border-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            {t.common.cancel}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button onClick={handleScan} size="lg" className="bg-amber-600 hover:bg-amber-700">
      <Camera className="w-5 h-5 mr-2" />
      {t.common.scanQR}
    </Button>
  )
}
