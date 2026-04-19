"use client"

import { Button } from "@/components/ui/button"
import { GalaxyBackground } from "@/components/landing/galaxy-background"
import { AlertCircle, ArrowLeft, Terminal } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <GalaxyBackground />
      
      <div className="relative z-10 text-center space-y-8 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse">
           <AlertCircle className="w-5 h-5" /> 
           <span className="text-xs font-black uppercase tracking-widest">Protocol Deviation: 404</span>
        </div>
        
        <div className="space-y-4">
           <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">Lost in Transit.</h1>
           <p className="text-muted-foreground text-lg font-medium leading-relaxed">
             The curriculum node you are searching for does not exist in our current neural mapping. You may have deviated from the verified learning path.
           </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Button size="lg" className="rounded-2xl px-8 bg-primary hover:bg-primary/90 text-xs font-black uppercase tracking-tighter" asChild>
              <Link href="/">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Return to Safe Hub
              </Link>
           </Button>
           <Button variant="outline" size="lg" className="rounded-2xl px-8 border-white/10 text-xs font-black uppercase tracking-tighter bg-white/5 backdrop-blur-sm" asChild>
              <Link href="/dashboard">
                 <Terminal className="w-4 h-4 mr-2" /> Resume Learning
              </Link>
           </Button>
        </div>

        <div className="pt-12 flex items-center justify-center gap-6 opacity-20 grayscale">
           <img src="/placeholder-logo.png" alt="Axion Intelligence" className="h-6" />
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-30 pointer-events-none">
         <div className="text-[10px] font-mono text-primary animate-pulse"> COORDINATES: NaN, NaN, NaN </div>
         <div className="text-[10px] font-mono text-primary"> SECTOR: UNKNOWN </div>
      </div>
    </div>
  )
}
