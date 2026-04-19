"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TutorChat } from "@/components/tutor/tutor-chat"

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-100 group">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={`h-16 w-16 rounded-full shadow-2xl relative group overflow-hidden transition-all duration-500 ${
              isOpen ? "bg-card border-border/50 text-foreground rotate-90" : "bg-electric-blue text-black border-none"
            }`}
          >
            {/* Animated Glow Wrapper */}
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <Bot className="w-8 h-8" />
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Global Floating Text */}
        {!isOpen && (
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap hidden md:block"
           >
             <div className="px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-electric-blue shadow-2xl">
               Neural Link Active
             </div>
           </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-100 w-96 max-h-[70vh] flex flex-col pointer-events-auto"
          >
            <div className="bg-card/70 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl shadow-black/50 overflow-hidden relative">
               {/* Close Header for Mobile */}
               <div className="p-4 border-b border-white/5 flex items-center justify-between md:hidden">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Global AI</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                     <X className="w-4 h-4" />
                  </Button>
               </div>

               <div className="h-[600px] overflow-hidden">
                 <TutorChat courseId="general" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
