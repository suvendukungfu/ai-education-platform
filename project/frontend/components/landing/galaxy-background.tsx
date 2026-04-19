"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Float, AdaptiveDpr, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { motion, useScroll, useTransform } from "framer-motion"

function Starfield({ scrollProgress }: { scrollProgress: any }) {
  const starsRef = useRef<THREE.Points>(null!)
  
  // Camera fly-through logic
  const zPos = useTransform(scrollProgress, [0, 1], [0, -5])
  const rotationY = useTransform(scrollProgress, [0, 1], [0, Math.PI * 0.5])

  useFrame((state) => {
    if (starsRef.current) {
       starsRef.current.rotation.y += 0.0005
       starsRef.current.rotation.z += 0.0002
    }
  })

  return (
    <group ref={starsRef as any}>
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={10} 
        saturation={1} 
        fade 
        speed={2} 
      />
    </group>
  )
}

function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#00baff") },
      uColor2: { value: new THREE.Color("#a855f7") }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;

      void main() {
        float noise = sin(vUv.x * 10.0 + uTime) * cos(vUv.y * 10.0 + uTime) * 0.5 + 0.5;
        vec3 color = mix(uColor1, uColor2, noise);
        gl_FragColor = vec4(color, noise * 0.15);
      }
    `
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial 
        args={[shaderArgs]} 
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export function GalaxyBackground() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas dpr={[1, 2]}>
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00baff" />
        
        <Starfield scrollProgress={scrollYProgress} />
        <Nebula />
        
        <color attach="background" args={["#000"]} />
      </Canvas>
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-black/20 to-black/80" />
    </div>
  )
}
