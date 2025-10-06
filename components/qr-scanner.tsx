"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Camera, X, Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import QrScanner from "qr-scanner"

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedUrl, setScannedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrScannerRef = useRef<QrScanner | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (qrScannerRef.current) {
        qrScannerRef.current.stop()
        qrScannerRef.current.destroy()
      }
    }
  }, [])

  const startScanning = async () => {
    setIsScanning(true)
    setError(null)
    setScannedUrl(null)

    if (!videoRef.current) return

    try {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          // Successfully scanned
          setScannedUrl(result.data)
          qrScanner.stop()
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment"
        }
      )

      qrScannerRef.current = qrScanner
      await qrScanner.start()
    } catch (err) {
      setError(t.common.cameraError || "Erreur d'accès à la caméra")
      setIsScanning(false)
      console.error("QR Scanner error:", err)
    }
  }

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop()
      qrScannerRef.current.destroy()
      qrScannerRef.current = null
    }
    setIsScanning(false)
    setScannedUrl(null)
    setError(null)
  }

  const copyToClipboard = async () => {
    if (scannedUrl) {
      try {
        await navigator.clipboard.writeText(scannedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  const navigateToUrl = () => {
    if (scannedUrl) {
      // Check if it's an internal route
      if (scannedUrl.startsWith("/")) {
        router.push(scannedUrl)
      } else if (scannedUrl.includes("/artwork/")) {
        const path = scannedUrl.split(window.location.origin)[1] || scannedUrl
        router.push(path)
      } else {
        // External URL
        window.open(scannedUrl, "_blank")
      }
      stopScanning()
    }
  }

  if (isScanning || scannedUrl) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
        <div className="text-center w-full max-w-md px-4">
          {!scannedUrl ? (
            <>
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-4 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                />
                <div className="absolute inset-0 border-4 border-amber-500 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-500"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-500"></div>
                </div>
              </div>
              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}
              <p className="text-white text-lg mb-4">
                {t.common.scanningQR || "Positionnez le QR code dans le cadre"}
              </p>
              <Button
                variant="outline"
                onClick={stopScanning}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                {t.common.cancel || "Annuler"}
              </Button>
            </>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {t.common.scanSuccess || "Scan réussi !"}
              </h3>
              <p className="text-white/70 text-sm mb-4 break-all px-2">
                {scannedUrl}
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={navigateToUrl}
                  className="bg-amber-600 hover:bg-amber-700 w-full"
                >
                  {t.common.openLink || "Ouvrir le lien"}
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t.common.copied || "Copié !"}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t.common.copyLink || "Copier le lien"}
                    </>
                  )}
                </Button>
                <Button
                  onClick={stopScanning}
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t.common.close || "Fermer"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Button onClick={startScanning} size="lg" className="bg-amber-600 hover:bg-amber-700">
      <Camera className="w-5 h-5 mr-2" />
      {t.common.scanQR || "Scanner QR"}
    </Button>
  )
}