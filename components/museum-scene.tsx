"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { MuseumEnvironment } from "./museum-environment"
import { ArtworkDisplays } from "./artwork-displays"
import { Suspense } from "react"
import { FirstPersonControls } from "./first-person-controller"

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#d4c5b0" wireframe />
    </mesh>
  )
}

export function MuseumScene() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera makeDefault position={[0, 1.6, 15]} fov={75} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[0, 5, 0]} intensity={0.3} />

          <MuseumEnvironment />
          <ArtworkDisplays />
          <FirstPersonControls />
        </Suspense>
      </Canvas>
    </div>
  )
}
