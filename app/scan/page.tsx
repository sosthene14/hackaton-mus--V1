"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Search, Camera, X, ExternalLink } from "lucide-react"
import { artworks } from "@/lib/artworks-data"
import QrScanner from "qr-scanner"

export default function ScanPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [qrCode, setQrCode] = useState("")
  const [error, setError] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerRef = useRef<QrScanner | null>(null)

  const content = {
    fr: {
      title: "Scanner un QR Code",
      subtitle: "Scannez ou entrez le code QR de l'œuvre",
      placeholder: "Ex: MCN-001",
      button: "Rechercher",
      scanButton: "Activer la caméra",
      stopButton: "Arrêter le scan",
      openLink: "Consulter le lien",
      error: "Code QR invalide",
      instructions: "Scannez le QR code affiché près de l'œuvre au musée ou entrez le code manuellement.",
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Scan or enter the artwork QR code",
      placeholder: "Ex: MCN-001",
      button: "Search",
      scanButton: "Activate Camera",
      stopButton: "Stop Scanning",
      openLink: "Open Link",
      error: "Invalid QR code",
      instructions: "Scan the QR code displayed near the artwork at the museum or enter the code manually.",
    },
    wo: {
      title: "Scan kodu QR",
      subtitle: "Scan walla dugal kodu QR bu liggéey bi",
      placeholder: "Misaal: MCN-001",
      button: "Seet",
      scanButton: "Sos kamera",
      stopButton: "Taxawal",
      openLink: "Gis link bi",
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
    if (e.key === "Enter") handleSearch()
  }

  const startScan = async () => {
    if (!videoRef.current) return

    try {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          setQrCode(result.data)
          setScanned(true)
          stopScan()
        },
        {
          returnDetailedScanResult: true,
        }
      )
      await scanner.start()
      scannerRef.current = scanner
      setIsScanning(true)
      setError("")
    } catch (err) {
      console.error("Camera error:", err)
      setError("Impossible d'accéder à la caméra.")
    }
  }

  const stopScan = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current.destroy()
      scannerRef.current = null
    }
    setIsScanning(false)
  }

  // Stop scan when component unmounts
  useEffect(() => {
    return () => stopScan()
  }, [])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative overflow-hidden">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">{t.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Champ de recherche */}
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

          {/* Scanner Section */}
          <div className="space-y-3">
            {isScanning && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                <video ref={videoRef} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-4 border-primary/40 rounded-lg animate-pulse pointer-events-none" />
              </div>
            )}

            <Button
              onClick={isScanning ? stopScan : startScan}
              variant={isScanning ? "destructive" : "outline"}
              className="w-full flex items-center justify-center gap-2"
            >
              {isScanning ? <X className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              {isScanning ? t.stopButton : t.scanButton}
            </Button>
          </div>

          {/* Bouton consulter */}
          {scanned && qrCode && (
            <Button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white"
            >
              <ExternalLink className="h-4 w-4" />
              {t.openLink}
            </Button>
          )}

          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">{t.instructions}</div>
        </CardContent>
      </Card>
    </main>
  )
}
