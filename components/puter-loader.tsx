"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function PuterLoader() {
  useEffect(() => {
    const checkReady = setInterval(() => {
      if ((window as any).puter) {
        console.log("✅ Puter is ready:", (window as any).puter)
        clearInterval(checkReady)
      } else {
        console.log("⏳ Waiting for Puter to load...")
      }
    }, 300)

    return () => clearInterval(checkReady)
  }, [])

  return (
    <>
      <Script
        src="https://js.puter.com/v2/"
        strategy="afterInteractive"
        onLoad={() => console.log("Puter script loaded")}
      />
    </>
  )
}
