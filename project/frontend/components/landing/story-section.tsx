"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FallingBook } from "./falling-book"
import { NeuralOrb } from "@/components/ui/neural-orb"

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Camera Zoom (simulating dolly in)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  
  // Text fades
  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.35], [0, 1, 1, 0])
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0])
  const text3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1])

  // AI Orb appearance
  const orbOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
  const orbScale = useTransform(scrollYProgress, [0.7, 1], [0.5, 1.2])

  // Generate 20 books across different depths
  const books = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: 60 + (i % 3) * 30 + (i % 5) * 10,
    xOffset: `${10 + (i * 17) % 80}%`,
    depth: (i % 4 === 0 ? "foreground" : i % 2 === 0 ? "midground" : "background") as "foreground" | "midground" | "background"
  }))

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* Camera container */}
        <motion.div style={{ scale }} className="w-full h-full absolute inset-0 transform-style-3d">
          
          {/* Falling Books */}
          {books.map(book => (
            <FallingBook 
              key={book.id}
              scrollProgress={scrollYProgress}
              index={book.id}
              size={book.size}
              xOffset={book.xOffset}
              depth={book.depth}
            />
          ))}

          {/* Glowing AI Orb emerging at the end */}
          <motion.div 
            style={{ opacity: orbOpacity, scale: orbScale }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <NeuralOrb size={2.5} className="w-[800px] h-[800px] drop-shadow-[0_0_100px_rgba(0,186,255,0.4)]" interactive={false} />
            <div className="absolute inset-0 bg-linear-to-t from-electric-blue/10 to-transparent" />
          </motion.div>

        </motion.div>

        {/* Narrative Text */}
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none px-4 text-center">
          <motion.div style={{ opacity: text1Opacity }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-black italic text-white/80 tracking-tighter mix-blend-difference">
              Education used to be static.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mt-4 font-medium">
              Heavy, chaotic, and disconnected.
            </p>
          </motion.div>

          <motion.div style={{ opacity: text2Opacity }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-black italic text-white/80 tracking-tighter mix-blend-difference">
              Crushing under its own weight.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: text3Opacity }} className="absolute mt-40 md:mt-64">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue font-black uppercase tracking-[0.2em] mb-4 text-xs">
              Until Now
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,186,255,0.5)]">
              Welcome to the Living Engine.
            </h2>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
