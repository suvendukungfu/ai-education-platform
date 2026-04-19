"use client"

import { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Segments, Segment, Sparkles, Float, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"
import * as THREE from "three"
// @ts-expect-error - maath does not provide type definitions for this specific sub-path
import * as random from "maath/random/dist/maath-random.esm"
import { useTheme } from "next-themes"

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create nodes in a structured-but-random way
  const nodeCount = 40
  const positions = useMemo(() => random.inSphere(new Float32Array(nodeCount * 3), { radius: 1.5 }), [nodeCount])
  
  // Create segments for connections
  // We'll connect nodes that are close to each other
  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (dist < 0.8) {
          lines.push({ 
            start: new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
            end: new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
          })
        }
      }
    }
    return lines
  }, [positions, nodeCount])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Base slow rotation
      pointsRef.current.rotation.y += delta / 25
      
      // Parallax mouse rotation
      pointsRef.current.rotation.x += (mousePosition.y * 0.05 - pointsRef.current.rotation.x) * 0.1
      pointsRef.current.rotation.y += (mousePosition.x * 0.05 - pointsRef.current.rotation.y) * 0.1

      // Magnetic pulse effect (shifting the points geometry is heavy, so we rotate/scale group for "wow")
      const time = state.clock.getElapsedTime()
      pointsRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.02)
    }
  })

  const primaryColor = currentTheme === "dark" ? "#00baff" : "#3b82f6" // Electric blue

  return (
    <group ref={pointsRef as any}>
      {/* Synapse Nodes */}
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={primaryColor}
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Connection Lines */}
      <Segments limit={connections.length} lineWidth={0.5} blending={THREE.AdditiveBlending}>
        {connections.map((line, i) => (
          <Segment 
            key={i} 
            start={line.start} 
            end={line.end} 
            color={new THREE.Color(primaryColor).multiplyScalar(0.4)} 
          />
        ))}
      </Segments>

      {/* Neural Background Dust */}
      <Sparkles 
        count={100} 
        scale={3} 
        size={1.5} 
        speed={0.3} 
        opacity={0.2} 
        color={primaryColor} 
      />
    </group>
  )
}

export function HeroModel() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return (
     <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl animate-pulse" />
  )

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 2], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00baff" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <NeuralNetwork />
          </Float>
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background" />
      <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent to-background/90" />
    </div>
  )
}
