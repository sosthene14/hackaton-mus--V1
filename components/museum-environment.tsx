"use client"
import * as THREE from "three"

export function MuseumEnvironment() {
  return (
    <group>
      {/* Main Gallery - Room 1 */}
      <group>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#f5f5f0" side={THREE.DoubleSide} />
        </mesh>

        {/* Back wall */}
        <mesh position={[0, 3, -20]} receiveShadow>
          <planeGeometry args={[40, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Front wall with entrance */}
        <mesh position={[0, 3, 20]} rotation={[0, Math.PI, 0]} receiveShadow>
          <planeGeometry args={[40, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Left wall */}
        <mesh position={[-20, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[40, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Right wall */}
        <mesh position={[20, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[40, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>
      </group>

      {/* Room 2 - Left Wing */}
      <group position={[-30, 0, 0]}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 30]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
          <planeGeometry args={[20, 30]} />
          <meshStandardMaterial color="#f5f5f0" side={THREE.DoubleSide} />
        </mesh>

        {/* Back wall */}
        <mesh position={[0, 3, -15]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Front wall */}
        <mesh position={[0, 3, 15]} rotation={[0, Math.PI, 0]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Left wall */}
        <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[30, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>
      </group>

      {/* Room 3 - Right Wing */}
      <group position={[30, 0, 0]}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 30]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
          <planeGeometry args={[20, 30]} />
          <meshStandardMaterial color="#f5f5f0" side={THREE.DoubleSide} />
        </mesh>

        {/* Back wall */}
        <mesh position={[0, 3, -15]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Front wall */}
        <mesh position={[0, 3, 15]} rotation={[0, Math.PI, 0]} receiveShadow>
          <planeGeometry args={[20, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>

        {/* Right wall */}
        <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[30, 6]} />
          <meshStandardMaterial color="#f5f5f0" />
        </mesh>
      </group>

      {/* Ceiling lights - Main room */}
      <mesh position={[-8, 5.9, -10]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[8, 5.9, -10]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-8, 5.9, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[8, 5.9, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 5.9, 10]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Ceiling lights - Left wing */}
      <mesh position={[-30, 5.9, -8]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-30, 5.9, 8]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Ceiling lights - Right wing */}
      <mesh position={[30, 5.9, -8]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[30, 5.9, 8]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}
