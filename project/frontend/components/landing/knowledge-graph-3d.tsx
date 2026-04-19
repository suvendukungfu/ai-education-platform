"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Segments, Segment, Float, AdaptiveDpr } from "@react-three/drei"
import * as THREE from "three"
// @ts-expect-error - maath docs
import * as random from "maath/random/dist/maath-random.esm"

function GraphNetwork() {
  const ref = useRef<THREE.Group>(null!)
  
  const count = 30
  const positions = useMemo(() => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }), [count])
  
  const connections = useMemo(() => {
    const lines = []
    for (let i = 0; i < count; i++) {
        const j = (i + 1) % count
        const k = (i + 3) % count
        lines.push({ 
            start: new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
            end: new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
        })
        lines.push({ 
            start: new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
            end: new THREE.Vector3(positions[k * 3], positions[k * 3 + 1], positions[k * 3 + 2])
        })
    }
    return lines
  }, [positions, count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00baff"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Segments limit={connections.length} lineWidth={0.8} blending={THREE.AdditiveBlending}>
        {connections.map((line, i) => (
          <Segment 
            key={i} 
            start={line.start} 
            end={line.end} 
            color={new THREE.Color("#00baff").multiplyScalar(0.6)} 
          />
        ))}
      </Segments>
    </group>
  )
}

export function KnowledgeGraph3D() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00baff" intensity={2} />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <GraphNetwork />
          </Float>
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent to-background/90 pointer-events-none" />
    </div>
  )
}
