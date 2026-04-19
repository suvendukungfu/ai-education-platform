"use client"

import { useRef, useState, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Float, AdaptiveDpr } from "@react-three/drei"
import * as THREE from "three"

interface NeuralOrbProps {
  className?: string
  color?: string
  interactive?: boolean
  size?: number
  mood?: "HAPPY" | "THINKING" | "EXCITED" | "CALM"
}

function OrbCore({ color = "#00baff", interactive = true, size = 1, mood = "CALM" }: { color?: string, interactive?: boolean, size?: number, mood?: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  const moodConfig = useMemo(() => {
    switch (mood) {
      case "EXCITED": return { speed: 8, distort: 0.8, frequency: 4 }
      case "THINKING": return { speed: 4, distort: 0.5, frequency: 1 }
      case "HAPPY": return { speed: 3, distort: 0.6, frequency: 2 }
      default: return { speed: 2, distort: 0.4, frequency: 1 }
    }
  }, [mood])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Breathing scale synced with mood
      const s = 1 + Math.sin(time * moodConfig.frequency) * 0.05
      meshRef.current.scale.set(s, s, s)
    }
  })

  return (
    <Sphere 
      ref={meshRef} 
      args={[size, 64, 64]}
      onPointerOver={() => interactive && setHovered(true)}
      onPointerOut={() => interactive && setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        speed={hovered || mood === "THINKING" || mood === "EXCITED" ? moodConfig.speed : 2}
        distort={hovered || mood === "THINKING" || mood === "EXCITED" ? moodConfig.distort : 0.4}
        radius={1}
        emissive={color}
        emissiveIntensity={hovered || mood === "EXCITED" ? 4 : 1.5}
        roughness={0.1}
        metalness={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  )
}

export function NeuralOrb({ className, color = "#00baff", interactive = true, size = 1, mood = "CALM" }: NeuralOrbProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={color} />
          <Float speed={mood === "EXCITED" ? 4 : 2} rotationIntensity={mood === "EXCITED" ? 2 : 1} floatIntensity={1}>
            <OrbCore color={color} interactive={interactive} size={size} mood={mood} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
