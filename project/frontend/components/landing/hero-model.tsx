"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
// @ts-expect-error - maath does not provide type definitions for this specific sub-path
import * as random from "maath/random/dist/maath-random.esm"
import { useTheme } from "next-themes"

function ParticleCloud(props: any) {
  const ref = useRef<any>(null)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  
  // Create a sphere of random points
  const sphere = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  // Set particle color based on current theme to blend beautifully
  const particleColor = currentTheme === "dark" ? "#ffffff" : "#000000"

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={currentTheme === "dark" ? 0.3 : 0.15}
        />
      </Points>
    </group>
  )
}

export function HeroModel() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <ParticleCloud />
      </Canvas>
    </div>
  )
}
