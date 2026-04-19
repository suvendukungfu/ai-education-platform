import { motion, useTransform, MotionValue } from "framer-motion"
import { Book } from "lucide-react"

interface FallingBookProps {
  scrollProgress: MotionValue<number>
  index: number
  size: number
  xOffset: string
  depth: "foreground" | "midground" | "background"
}

export function FallingBook({ scrollProgress, index, size, xOffset, depth }: FallingBookProps) {
  // Randomize characteristics based on index
  const seed = (index * 137) % 100
  const randomRotation = seed > 50 ? seed : -seed
  const dropStart = (seed % 20) * 0.01 // Start between 0 and 0.2
  const dropEnd = dropStart + 0.3 + ((seed % 10) * 0.02) // End between 0.3 and 0.5
  
  // Depth settings
  const zIndex = depth === "foreground" ? 30 : depth === "midground" ? 20 : 10
  const blurBase = depth === "foreground" ? 4 : depth === "midground" ? 0 : 6
  const opacityBase = depth === "foreground" ? 0.9 : depth === "midground" ? 0.7 : 0.3
  const speedMultiplier = depth === "foreground" ? 1.5 : depth === "midground" ? 1 : 0.5

  // Physics mapping
  // Fall from top (negative y) to bottom (positive y)
  const y = useTransform(
    scrollProgress,
    [dropStart, dropEnd, 1],
    [-200, 800 * speedMultiplier, 1200 * speedMultiplier]
  )
  
  // Rotation inertia
  const rotate = useTransform(
    scrollProgress,
    [dropStart, dropEnd],
    [randomRotation, randomRotation + 180 * speedMultiplier]
  )

  // Motion blur (more blur when moving fast)
  const filter = useTransform(
    scrollProgress,
    [dropStart, dropStart + 0.1, dropEnd - 0.1, dropEnd],
    [`blur(${blurBase}px)`, `blur(${blurBase + 10}px)`, `blur(${blurBase + 10}px)`, `blur(${blurBase}px)`]
  )

  const opacity = useTransform(
    scrollProgress,
    [dropStart, dropStart + 0.05, dropEnd, dropEnd + 0.1],
    [0, opacityBase, opacityBase, 0]
  )

  return (
    <motion.div
      style={{
        position: "absolute",
        left: xOffset,
        top: "10%",
        y,
        rotate,
        filter,
        opacity,
        zIndex,
      }}
      className="pointer-events-auto cursor-pointer"
      whileHover={{ 
        scale: 1.1, 
        rotateY: 15, 
        rotateX: 15,
        boxShadow: "0 0 30px rgba(0, 186, 255, 0.4)"
      }}
    >
      <div 
        className="relative bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-2xl"
        style={{
          width: size,
          height: size * 1.4,
          borderRadius: size * 0.1,
        }}
      >
        {/* Glowing edge effect */}
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_20px_rgba(0,186,255,0.2)]" />
        <Book 
          size={size * 0.4} 
          className="text-muted-foreground opacity-50" 
        />
        <div className="absolute -bottom-1 -right-1 w-full h-full bg-linear-to-br from-transparent to-black/40 rounded-[inherit] -z-10" />
      </div>
    </motion.div>
  )
}
