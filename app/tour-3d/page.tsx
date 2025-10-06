
import dynamic from "next/dynamic"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Loader2 } from "lucide-react"
import { artworks } from "@/lib/artworks-data"
import { MuseumScene } from "@/components/museum-scene"
import { MuseumUI } from "@/components/museum-ui"
import { SceneLoader } from "@/components/scene-loader"

 
export default function Tour3DPage() {
 
  return (
<div>  
    <SceneLoader />
  <MuseumScene />
      <MuseumUI /></div>
  )
}
