"use client"

import { motion } from "framer-motion"

export function NeuralWaveform({ isActive, color = "#00baff" }: { isActive: boolean, color?: string }) {
  return (
    <div className="flex items-center gap-1 h-8 px-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [8, 24, 8],
            opacity: [0.3, 1, 0.3],
          } : {
            height: 4,
            opacity: 0.2
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
