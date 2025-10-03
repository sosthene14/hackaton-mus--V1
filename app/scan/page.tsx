"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Search } from "lucide-react"
import { artworks } from "@/lib/artworks-data"

export default function ScanPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [qrCode, setQrCode] = useState("")
  const [error, setError] = useState("")

  const content = {
    fr: {
      title: "Scanner un QR Code",
      subtitle: "Entrez le code QR de l'œuvre",
      placeholder: "Ex: MCN-001",
      button: "Rechercher",
      error: "Code QR invalide",
      instructions: "Scannez le QR code affiché près de l'œuvre au musée ou entrez le code manuellement.",
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Enter the artwork QR code",
      placeholder: "Ex: MCN-001",
      button: "Search",
      error: "Invalid QR code",
      instructions: "Scan the QR code displayed near the artwork at the museum or enter the code manually.",
    },
    wo: {
      title: "Scan kodu QR",
      subtitle: "Dugal kodu QR bu liggéey bi",
      placeholder: "Misaal: MCN-001",
      button: "Seet",
      error: "Kodu QR bu baaxul",
      instructions: "Scan kodu QR bi nekk ci liggéey bi ci muse bi walla dugal kodu bi.",
    },
  }

  const t = content[language]

  const handleSearch = () => {
    setError("")
    const artwork = artworks.find((a) => a.qrCode.toLowerCase() === qrCode.toLowerCase())

    if (artwork) {
      router.push(`/artwork/${artwork.id}`)
    } else {
      setError(t.error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">{t.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t.placeholder}
                value={qrCode}
                onChange={(e) => {
                  setQrCode(e.target.value)
                  setError("")
                }}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSearch} size="icon" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">{t.instructions}</div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              {language === "fr" ? "Codes disponibles:" : language === "en" ? "Available codes:" : "Kodu yi am:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {artworks.slice(0, 6).map((artwork) => (
                <Button
                  key={artwork.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQrCode(artwork.qrCode)
                    setError("")
                  }}
                >
                  {artwork.qrCode}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
