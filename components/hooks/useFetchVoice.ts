import { useState } from "react"

export function useFetchVoice() {
  const [isLoading, setIsLoading] = useState(false)

  const fetchAudio = async (text: string, voice: string) => {
    try {
      setIsLoading(true)

      const response = await fetch("https://hackaton-musee-backend.vercel.app/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice,
          rate: "+0%",
          volume: "+0%",
          pitch: "+0Hz",
        }),
      })

      if (!response.ok) {
        throw new Error(`TTS request failed with status ${response.status}`)
      }

      return response // on renvoie la réponse pour traitement (blob, etc.)
    } catch (error) {
      console.error("Erreur lors de la requête TTS :", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { fetchAudio, isLoading }
}
