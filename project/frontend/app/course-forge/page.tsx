"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Brain, Hammer, Rocket, ArrowRight, Loader2, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NeuralOrb } from "@/components/ui/neural-orb"
import api from "@/lib/axios"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { toast } from "sonner"

export default function CourseForgePage() {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleForge = async () => {
    if (!topic.trim()) return
    setIsGenerating(true)
    try {
      const { data } = await api.post('/ai/forge', { topic, level: 'ADVANCED' })
      toast.success("Course Forged Successfully!")
      router.push(`/tutor/${data.id}`)
    } catch (error) {
      toast.error("Neural Sync Interrupted. Please try again.")
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <DashboardHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Immersive Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,186,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="w-full max-w-2xl space-y-12 relative z-10 text-center">
          <AnimatePresence mode="wait">
            {!isGenerating ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                className="space-y-8"
              >
                <div className="flex justify-center mb-6">
                   <div className="w-24 h-24 rounded-3xl bg-black border border-electric-blue/30 flex items-center justify-center relative shadow-2xl shadow-electric-blue/20">
                      <NeuralOrb size={1.5} color="#00baff" mood="THINKING" />
                      <div className="absolute -inset-4 bg-electric-blue/10 blur-2xl rounded-full animate-pulse" />
                   </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">The Neural Forge</h1>
                  <p className="text-muted-foreground font-medium text-lg">Input a concept. We'll synthesize a masterpiece path.</p>
                </div>

                <div className="relative group">
                   <div className="absolute -inset-1 bg-linear-to-r from-electric-blue to-violet-glow rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                   <Input 
                     placeholder="e.g., Quantum Networking or Advanced French Cooking"
                     className="w-full h-20 rounded-3xl bg-card/50 backdrop-blur-xl border-white/10 px-8 text-xl font-bold focus:border-electric-blue/50 transition-all text-center"
                     value={topic}
                     onChange={(e) => setTopic(e.target.value)}
                     onKeyPress={(e) => e.key === "Enter" && handleForge()}
                   />
                </div>

                <Button 
                  onClick={handleForge}
                  className="h-16 px-12 rounded-full bg-electric-blue text-black font-black hover:bg-white shadow-2xl shadow-electric-blue/20 text-lg uppercase tracking-widest group"
                >
                  FORGE KNOWLEDGE <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center space-y-12"
              >
                 <div className="relative">
                    <motion.div 
                       animate={{ 
                         rotate: 360,
                         scale: [1, 1.2, 1],
                       }}
                       transition={{ 
                         rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                         scale: { duration: 2, repeat: Infinity }
                       }}
                       className="w-64 h-64 border-4 border-dashed border-electric-blue/20 rounded-full flex items-center justify-center"
                    >
                        <div className="w-48 h-48 border-2 border-dashed border-violet-glow/30 rounded-full flex items-center justify-center">
                           <NeuralOrb size={2} color="#a855f7" mood="EXCITED" />
                        </div>
                    </motion.div>
                    
                    {/* Floating Icons */}
                    {[Brain, Hammer, Rocket, Sparkles].map((Icon, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -20, 0],
                          x: [0, (i % 2 === 0 ? 10 : -10), 0]
                        }}
                        transition={{ 
                          duration: 2 + i,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        className="absolute p-3 rounded-xl bg-black border border-white/10 text-electric-blue shadow-xl"
                        style={{ 
                          top: i === 0 ? -20 : i === 1 ? -20 : 'auto',
                          bottom: i === 2 ? -20 : i === 3 ? -20 : 'auto',
                          left: i === 0 ? -20 : i === 2 ? -20 : 'auto',
                          right: i === 1 ? -20 : i === 3 ? -20 : 'auto'
                        }}
                      >
                         <Icon className="w-6 h-6" />
                      </motion.div>
                    ))}
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black italic uppercase tracking-tighter">Forging Curricula...</h2>
                       <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-electric-blue" />
                          Synthesizing Neural Weightings for "{topic}"
                       </p>
                    </div>

                    <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 mx-auto">
                       <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: "0%" }}
                         transition={{ duration: 15, ease: "linear" }}
                         className="h-full bg-linear-to-r from-electric-blue to-violet-glow"
                       />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
