"use client"

import { useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import type { Artwork } from "@/lib/types"
import { useMuseumStore } from "./store/useMuseumStore"

interface ArtworkPedestalProps {
  artwork: Artwork
  position: [number, number, number]
}

function ArtworkModel({ url, hovered }: { url: string; hovered: boolean }) {
  const { scene } = useGLTF(url)
  if (!scene) {
    console.log("[v0] Failed to load model:", url)
    // Fallback to placeholder box
    return (
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color={hovered ? "#8b7355" : "#a68968"} roughness={0.7} metalness={0.1} />
      </mesh>
    )
  }
  return <primitive object={scene.clone()} />
}

export function ArtworkPedestal({ artwork, position }: ArtworkPedestalProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const setSelectedArtwork = useMuseumStore((state) => state.setSelectedArtwork)

  // Gentle rotation animation when hovered
  useFrame(() => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    setSelectedArtwork(artwork)
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 1, 32]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} metalness={0.2} />
      </mesh>

      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 3D Model or placeholder */}
      <group
        ref={groupRef}
        position={[0, 1.8, 0]}
        scale={0.8}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {artwork.model3dUrl && <ArtworkModel url={artwork.model3dUrl} hovered={hovered} />}
        {!artwork.model3dUrl && (
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.8, 0.5]} />
            <meshStandardMaterial color={hovered ? "#8b7355" : "#a68968"} roughness={0.7} metalness={0.1} />
          </mesh>
        )}
      </group>

      {/* Spotlight on artwork */}
      <spotLight
        position={[0, 4, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={hovered ? 1.5 : 0.8}
        castShadow
        target-position={[position[0], 1.8, position[2]]}
      />
    </group>
  )
}
