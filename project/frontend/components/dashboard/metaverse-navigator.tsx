"use client"

import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text, AdaptiveDpr, PerspectiveCamera, MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { useRouter } from "next/navigation"

function Zone({ position, title, icon: Icon, color, path }: { position: [number, number, number], title: string, icon: any, color: string, path: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      <Sphere 
        ref={meshRef} 
        args={[0.6, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => router.push(path)}
      >
        <MeshDistortMaterial 
          color={color} 
          speed={hovered ? 5 : 2} 
          distort={0.4} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </Sphere>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color="white"
        font="/fonts/Inter-Black.woff"
        anchorX="center"
        anchorY="middle"
      >
        {title.toUpperCase()}
      </Text>
    </group>
  )
}

export function MetaverseNavigator() {
  return (
    <div className="w-full h-[300px] relative rounded-[40px] overflow-hidden bg-black/20 border border-white/5 shadow-inner">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00baff" />
          
          <Zone 
            position={[-2, 0, 0]} 
            title="Academy" 
            icon={null} 
            color="#3b82f6" 
            path="/courses" 
          />
          <Zone 
            position={[0, 0.5, 1]} 
            title="The Forge" 
            icon={null} 
            color="#a855f7" 
            path="/dashboard" 
          />
          <Zone 
            position={[2, 0, 0]} 
            title="Sanctuary" 
            icon={null} 
            color="#ec4899" 
            path="/chat" 
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-black/20 to-black/80 pointer-events-none" />
      <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-black text-electric-blue uppercase tracking-widest">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Metaverse Hub Active
      </div>
    </div>
  )
}
