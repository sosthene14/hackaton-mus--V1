"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRCodeDisplayProps {
  value: string
  size?: number
  label?: string
}

export function QRCodeDisplay({ value, size = 200, label }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [value, size])

  const downloadQR = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `qr-code-${value}.png`
      link.href = url
      link.click()
    }
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="rounded-lg" />
        {label && <p className="text-sm text-muted-foreground text-center">{label}</p>}
        <Button variant="outline" size="sm" onClick={downloadQR} className="w-full bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Télécharger QR Code
        </Button>
      </CardContent>
    </Card>
  )
}
