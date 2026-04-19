"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Sparkles, Brain, Zap, Rocket, ChevronDown, Check, Info, Lock, Trophy, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { HoverGlow } from "@/components/motion-wrapper"
import { NeuralWaveform } from "./neural-waveform"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { NeuralOrb } from "@/components/ui/neural-orb"
import api from "@/lib/axios"

interface Message {
  role: "user" | "ai"
  content: string
  thinking?: string
}

export function TutorChat({ courseId, subscriptionTier = "FREE" }: { courseId?: string, subscriptionTier?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Neural Link Stabilized. I am your dedicated Axion Intelligence tutor. How can I accelerate your mastery today?" }
  ])

  const modeColors = {
    GENERAL: "#00baff",
    CODING: "#10b981",
    MATH: "#a855f7"
  }
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [queryCount, setQueryCount] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [tutorMode, setTutorMode] = useState<'GENERAL' | 'CODING' | 'MATH'>('GENERAL')
  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        handleSend(transcript)
      }

      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      setIsListening(true)
      recognitionRef.current?.start()
    }
  }

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined") return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.1
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  }

  const isGated = subscriptionTier === "FREE" && queryCount >= 10

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping || isGated) return
    
    const newMessages: Message[] = [...messages, { role: "user", content: text }]
    setMessages(newMessages)
    setInput("")
    setIsTyping(true)
    setQueryCount(prev => prev + 1)

    // Real AI Interaction
    try {
      const { data } = await api.post('/ai/chat', { 
        courseId, 
        question: text, 
        mode: tutorMode 
      })
      
      setMessages([...newMessages, { 
        role: "ai", 
        content: data.answer,
        thinking: "Neural path synchronized. Cognitive resonance achieved."
      }])
      speak(data.answer)
    } catch (error) {
      setMessages([...newMessages, { 
        role: "ai", 
        content: "Neural Sync failed. Bandwidth restricted or AI core offline."
      }])
    } finally {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-[600px] bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[40px] overflow-hidden shadow-2xl relative transition-all duration-700">
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000" 
        style={{ background: `linear-gradient(to bottom, ${modeColors[tutorMode]}10, transparent)` }} 
      />
      
      {/* Background Neural Ambience */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000" 
        style={{ backgroundColor: `${modeColors[tutorMode]}10` }} 
      />

      {/* Gating Overlay */}
      <AnimatePresence>
        {isGated && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-8 text-center"
          >
            <div className="max-w-xs space-y-6">
               <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Neural Limit Reached</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">Your free-tier neural link has reached maximum capacity. Stabilize your sync to maintain high-frequency intelligence.</p>
               </div>
               <Button className="w-full h-14 rounded-2xl bg-amber-500 text-black font-black hover:bg-white shadow-2xl shadow-amber-500/20 uppercase tracking-widest text-xs" asChild>
                  <Link href="/pricing">SCALE NEURAL LINK</Link>
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="p-6 border-b border-border/40 bg-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div 
               animate={isTyping ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -inset-3 blur-2xl rounded-full transition-colors duration-700" 
               style={{ backgroundColor: modeColors[tutorMode] + '40' }}
            />
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center relative z-10 border border-white/10 overflow-hidden">
              <NeuralOrb size={1.2} interactive={isTyping} className="w-20 h-20" color={modeColors[tutorMode]} />
            </div>
          </div>
          <div>
            <div className="text-sm font-black flex items-center gap-1.5 uppercase tracking-wider">
               Axion {tutorMode === 'GENERAL' ? 'Core' : tutorMode === 'CODING' ? 'Syntax' : 'Scalar'} <Badge variant="outline" className="text-[10px] font-black py-0 px-1.5 border-white/20 transition-colors" style={{ color: modeColors[tutorMode] }}>v5.0</Badge>
            </div>
            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Unified Sync Active
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`w-8 h-8 rounded-full ${isVoiceEnabled ? "text-electric-blue" : "text-muted-foreground"}`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <div className="w-px h-4 bg-white/10" />
              <NeuralWaveform isActive={isListening || isTyping} />
           </div>
           
           <select 
              value={tutorMode}
              onChange={(e) => setTutorMode(e.target.value as any)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest focus:outline-hidden transition-colors"
              style={{ color: modeColors[tutorMode] }}
           >
              <option value="GENERAL">General</option>
              <option value="CODING">Coding</option>
              <option value="MATH">Mathematics</option>
           </select>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-6 relative z-10">
        <div className="space-y-8">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                  msg.role === "user" ? "bg-white/5 text-white/50" : "bg-electric-blue/20 text-electric-blue"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <div className="space-y-2">
                   {msg.thinking && (
                      <div className="text-[10px] font-black text-muted-foreground/40 italic uppercase tracking-widest mb-1 flex items-center gap-1.5">
                         <Brain className="w-3 h-3" /> {msg.thinking}
                      </div>
                   )}
                   <div className={`px-5 py-4 rounded-[24px] text-sm font-medium leading-relaxed prose prose-invert max-w-none ${
                     msg.role === "user" 
                       ? "bg-white/5 text-white border border-white/10" 
                       : "bg-card/80 text-foreground border border-border/50 shadow-lg shadow-black/20"
                   }`}>
                     <ReactMarkdown>{msg.content}</ReactMarkdown>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4 items-center">
                 <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-5 h-5 text-electric-blue" />
                 </div>
                 <div className="flex gap-1.5 px-5 py-4 bg-card/80 rounded-full border border-border/50">
                    <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" />
                 </div>
                 <span className="text-[10px] font-black text-electric-blue uppercase tracking-widest animate-pulse">Neural Link Syncing...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input / Quick Actions */}
      <footer className="p-6 border-t border-border/40 bg-white/5 space-y-4 relative z-10">
        <div className="flex flex-wrap gap-2">
           {[
             { label: "Explain", icon: Brain },
             { label: "Simplify", icon: Zap },
             { label: "Example", icon: Rocket },
             { label: "Quiz me", icon: Trophy }
           ].map((action) => (
             <button 
               key={action.label} 
               onClick={() => handleSend(action.label + " this concept")}
               className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all group"
             >
               <action.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
               {action.label}
             </button>
           ))}
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={isListening ? "Listening to neural input..." : isGated ? "NEURAL LINK GATED - SCALE POWER" : queryCount >= 8 ? "BANDWIDTH LOW - STABILIZE?" : "Inject neural query here..."}
              className={`w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-hidden focus:border-electric-blue/50 transition-all disabled:opacity-50 ${queryCount >= 8 && !isGated ? "border-amber-500/30" : ""} ${isListening ? "border-electric-blue shadow-[0_0_15px_rgba(0,212,255,0.2)]" : ""}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isGated || isListening}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl transition-all ${isListening ? "bg-red-500/20 text-red-500 animate-pulse" : "hover:bg-electric-blue/10 text-muted-foreground"}`}
              disabled={isGated}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          </div>
          <Button 
            className="rounded-2xl w-14 h-14 bg-electric-blue text-black p-0 hover:bg-white transition-all shadow-xl shadow-electric-blue/20 shrink-0"
            onClick={() => handleSend()}
            disabled={isGated || isListening}
          >
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
