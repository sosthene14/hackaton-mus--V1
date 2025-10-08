//@ts-nocheck

"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Search, Camera, X, ExternalLink, History, Lightbulb, Scan, FlipHorizontal } from "lucide-react"
import { artworks } from "@/lib/artworks-data"
import QrScanner from "qr-scanner"

export default function ScanPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [qrCode, setQrCode] = useState("")
  const [error, setError] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [scanHistory, setScanHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [cameraMode, setCameraMode] = useState("environment") // "environment" ou "user"
  const [scanCount, setScanCount] = useState(0)
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
      openLink: "Consulter l'œuvre",
      error: "Code QR invalide",
      instructions: "Scannez le QR code affiché près de l'œuvre au musée ou entrez le code manuellement.",
      history: "Historique",
      noHistory: "Aucun scan récent",
      tip: "Astuce",
      tipText: "Positionnez le QR code au centre de la caméra et assurez-vous d'avoir un bon éclairage.",
      clearHistory: "Effacer l'historique",
      flipCamera: "Changer de caméra",
      scanningStatus: "Scan en cours...",
      totalScans: "Total des scans"
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Scan or enter the artwork QR code",
      placeholder: "Ex: MCN-001",
      button: "Search",
      scanButton: "Activate Camera",
      stopButton: "Stop Scanning",
      openLink: "View Artwork",
      error: "Invalid QR code",
      instructions: "Scan the QR code displayed near the artwork at the museum or enter the code manually.",
      history: "History",
      noHistory: "No recent scans",
      tip: "Tip",
      tipText: "Position the QR code in the center of the camera and ensure good lighting.",
      clearHistory: "Clear history",
      flipCamera: "Switch camera",
      scanningStatus: "Scanning...",
      totalScans: "Total scans"
    },
    wo: {
      title: "Scan kodu QR",
      subtitle: "Scan walla dugal kodu QR bu liggéey bi",
      placeholder: "Misaal: MCN-001",
      button: "Seet",
      scanButton: "Sos kamera",
      stopButton: "Taxawal",
      openLink: "Gis liggéey bi",
      error: "Kodu QR bu baaxul",
      instructions: "Scan kodu QR bi nekk ci liggéey bi ci muse bi walla dugal kodu bi.",
      history: "Jaar-jaar",
      noHistory: "Amoul scan bu bees",
      tip: "Wone",
      tipText: "Yokk kodu QR bi ci diggu kamera bi te jëkk ni am na ñu àlluuma bu baax.",
      clearHistory: "Feeñal jaar-jaar",
      flipCamera: "Soppi kamera",
      scanningStatus: "Dafay scan...",
      totalScans: "Limu scan yi"
    },
  }

  const t = content[language]

  // Charger l'historique au montage
  useEffect(() => {
    const saved = localStorage.getItem("scanHistory")
    if (saved) {
      setScanHistory(JSON.parse(saved))
    }
    const count = localStorage.getItem("scanCount")
    if (count) {
      setScanCount(parseInt(count))
    }
  }, [])

  const addToHistory = (code) => {
    const artwork = artworks.find((a) => a.qrCode.toLowerCase() === code.toLowerCase())
    if (artwork) {
      const newEntry = {
        code,
        title: artwork.title,
        timestamp: new Date().toISOString()
      }
      const updated = [newEntry, ...scanHistory.filter(h => h.code !== code)].slice(0, 5)
      setScanHistory(updated)
      localStorage.setItem("scanHistory", JSON.stringify(updated))
      
      const newCount = scanCount + 1
      setScanCount(newCount)
      localStorage.setItem("scanCount", newCount.toString())
    }
  }

  const clearHistory = () => {
    setScanHistory([])
    localStorage.removeItem("scanHistory")
  }

  const handleSearch = (code = qrCode) => {
    setError("")
    const artwork = artworks.find((a) => a.qrCode.toLowerCase() === code.toLowerCase())
    if (artwork) {
      addToHistory(code)
      router.push(`/artwork/${artwork.id}`)
    } else {
      setError(t.error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const toggleCamera = async () => {
    if (isScanning) {
      stopScan()
      setCameraMode(prev => prev === "environment" ? "user" : "environment")
      await new Promise(resolve => setTimeout(resolve, 300))
      startScan(cameraMode === "environment" ? "user" : "environment")
    }
  }

  const startScan = async (mode = cameraMode) => {
    try {
      setShowVideo(true)
      setError("")
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      if (!videoRef.current) {
        setShowVideo(false)
        return
      }

      await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode }
      })

      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          setQrCode(result.data)
          setScanned(true)
          stopScan()
          // Auto-recherche après scan
          setTimeout(() => handleSearch(result.data), 300)
        },
        {
          returnDetailedScanResult: true,
          preferredCamera: mode,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      )
      await scanner.start()
      scannerRef.current = scanner
      setIsScanning(true)
    } catch (err: any) {
      setShowVideo(false)
      
      if (err.name === "NotAllowedError") {
        setError(language === "fr" ? "Permission caméra refusée. Veuillez autoriser l'accès." : 
                 language === "en" ? "Camera permission denied. Please allow access." :
                 "Xam-xam bu kamera dañu ko wuute. Jamonalal seen.")
      } else if (err.name === "NotFoundError") {
        setError(language === "fr" ? "Aucune caméra trouvée sur cet appareil." :
                 language === "en" ? "No camera found on this device." :
                 "Kamera amoul ci aparey bi.")
      } else if (err.name === "NotSupportedError") {
        setError(language === "fr" ? "Utilisez HTTPS ou localhost pour accéder à la caméra." :
                 language === "en" ? "Use HTTPS or localhost to access camera." :
                 "Jëfandikoo HTTPS walla localhost.")
      } else {
        setError(language === "fr" ? `Impossible d'accéder à la caméra: ${err.message}` :
                 language === "en" ? `Cannot access camera: ${err.message}` :
                 `Kamera duñu ko jëfandikoo: ${err.message}`)
      }
    }
  }

  const stopScan = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current.destroy()
      scannerRef.current = null
    }
    setIsScanning(false)
    setShowVideo(false)
  }

  useEffect(() => {
    return () => stopScan()
  }, [])

  return (
    <main className=" bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center space-y-2 bg-white border-b border-slate-100">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
            <QrCode className="h-8 w-8 text-amber-700" />
          </div>
          <CardTitle className="text-2xl font-serif text-slate-900">{t.title}</CardTitle>
          <p className="text-sm text-slate-600">{t.subtitle}</p>
          
          {/* Compteur de scans */}
          {scanCount > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
              <Scan className="h-3 w-3" />
              {t.totalScans}: {scanCount}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6 p-6">
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
                className="flex-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button 
                onClick={() => handleSearch()} 
                size="icon" 
                className="shrink-0 bg-amber-600 hover:bg-amber-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Scanner Section */}
          <div className="space-y-3">
            {showVideo && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-300 bg-black">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                {isScanning && (
                  <>
                    <div className="absolute inset-0 border-4 border-amber-400 rounded-xl animate-pulse pointer-events-none" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-white text-sm font-medium backdrop-blur-sm">
                      {t.scanningStatus}
                    </div>
                    {/* Bouton flip caméra */}
                    <Button
                      onClick={toggleCamera}
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                    >
                      <FlipHorizontal className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}

            <Button
              onClick={isScanning ? stopScan : () => startScan()}
              variant={isScanning ? "destructive" : "outline"}
              className="w-full flex items-center justify-center gap-2 h-12 font-medium"
            >
              {isScanning ? <X className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
              {isScanning ? t.stopButton : t.scanButton}
            </Button>
          </div>

          {/* Bouton consulter */}
          {scanned && qrCode && (
            <Button
              onClick={() => handleSearch()}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white h-12 font-medium"
            >
              <ExternalLink className="h-5 w-5" />
              {t.openLink}
            </Button>
          )}

          {/* Astuce */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-medium">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm">{t.tip}</span>
            </div>
            <p className="text-xs text-blue-700">{t.tipText}</p>
          </div>

          {/* Historique des scans */}
          <div className="space-y-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-slate-200 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{t.history}</span>
              </div>
              <span className="text-xs text-slate-500">{scanHistory.length}</span>
            </button>

            {showHistory && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                {scanHistory.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">{t.noHistory}</p>
                ) : (
                  <>
                    {scanHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(item.code)}
                        className="w-full p-3 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{item.code}</p>
                            <p className="text-xs text-slate-500 truncate">{item.title}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                        </div>
                      </button>
                    ))}
                    <Button
                      onClick={clearHistory}
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {t.clearHistory}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-slate-100 text-sm text-slate-600 border border-slate-200">
            {t.instructions}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}