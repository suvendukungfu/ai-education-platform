"use client"

import { motion } from "framer-motion"
import { Check, Lock, Play, Star } from "lucide-react"

interface RoadmapNode {
  id: string
  title: string
  status: "completed" | "current" | "locked"
  xp: number
}

const mockNodes: RoadmapNode[] = [
  { id: "1", title: "Neural Foundations", status: "completed", xp: 100 },
  { id: "2", title: "RAG Architecture", status: "completed", xp: 250 },
  { id: "3", title: "Context Window Mastery", status: "current", xp: 500 },
  { id: "4", title: "Agentic Workflows", status: "locked", xp: 750 },
  { id: "5", title: "Advanced Fine-tuning", status: "locked", xp: 1000 },
  { id: "6", title: "Cognitive Deployment", status: "locked", xp: 2000 },
]

export function NeuralRoadmap() {
  return (
    <div className="space-y-8 p-8 rounded-[40px] bg-card/30 backdrop-blur-3xl border border-border/50 relative overflow-hidden group">
      {/* Background Animated Path */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M200 50 Q 250 150 150 250 T 200 450 T 150 550" stroke="url(#glowGradient)" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#9d50bb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-2xl font-black tracking-tighter">Neural Roadmap</h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Cognitive Path: 01</p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-black uppercase tracking-widest">
            3/6 Modules Mastered
          </div>
        </div>

        <div className="flex flex-col gap-16 relative grow min-w-0">
          {mockNodes.map((node, index) => {
            const isLeft = index % 2 === 0
            
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse text-right"}`}
              >
                {/* Visual Node */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue grow ${
                    node.status === "completed" 
                      ? "bg-electric-blue border-electric-blue text-black" 
                      : node.status === "current"
                      ? "bg-card border-electric-blue text-electric-blue animate-pulse"
                      : "bg-muted border-border/50 text-muted-foreground opacity-40"
                  }`}>
                    {node.status === "completed" && <Check className="w-8 h-8 font-black" />}
                    {node.status === "current" && <Play className="w-8 h-8 fill-electric-blue" />}
                    {node.status === "locked" && <Lock className="w-6 h-6" />}
                    
                    {/* Level Glow */}
                    {node.status === "current" && (
                      <div className="absolute inset-0 bg-electric-blue/40 rounded-3xl blur-2xl -z-10 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Connecting Line (Mobile/Simple) */}
                  {index < mockNodes.length - 1 && (
                     <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-linear-to-b from-border/50 to-transparent border-dashed border-l" />
                  )}
                </div>

                {/* Node Text */}
                <div className="grow space-y-1">
                  <div className={`text-xs font-black uppercase tracking-widest ${
                    node.status === "locked" ? "text-muted-foreground/30" : "text-electric-blue"
                  }`}>
                    Module {String(index + 1).padStart(2, "0")}
                  </div>
                  <h4 className={`text-lg font-bold tracking-tight ${
                    node.status === "locked" ? "text-muted-foreground/40" : "text-foreground"
                  }`}>
                    {node.title}
                  </h4>
                  {node.status !== "locked" && (
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest mt-2">
                       <Star className="w-3 h-3 fill-amber-500" /> +{node.xp} XP
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
