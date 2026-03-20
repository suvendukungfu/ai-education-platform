"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlayCircle, ShieldCheck, Zap, Lock } from "lucide-react"

export function DemoSection() {
  return (
    <section id="platform" className="py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-black uppercase text-xs tracking-widest">
                <Zap className="w-3 h-3" /> Real-time Processing
             </div>
             
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-balance">
                The Student Dashboard, <span className="text-muted-foreground/50">Reimagined.</span>
             </h2>
             
             <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                Experience a deeply integrated environment where video lectures, rich text content, and interactive AI tutoring converge asynchronously—powered by a robust Next.js 15 monolith.
             </p>
             
             <ul className="space-y-4 font-semibold">
                <li className="flex items-center gap-3 text-foreground/80">
                   <ShieldCheck className="w-5 h-5 text-primary" /> Session-verified secure learning environments.
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                   <Lock className="w-5 h-5 text-primary" /> Strict Role-Based Access Controls (RBAC).
                </li>
             </ul>

             <div className="pt-4">
                <Button size="lg" className="rounded-full shadow-xl shadow-primary/20 h-14 px-8 font-black hover:scale-105 transition-transform" asChild>
                   <Link href="/signup">Enter Platform</Link>
                </Button>
             </div>
          </motion.div>

          {/* Super Premium Mock Dashboard Component */}
          <motion.div 
             initial={{ opacity: 0, rotateY: 20, scale: 0.9 }}
             whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
             viewport={{ once: true }}
             transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
             className="lg:w-1/2 w-full perspective-1000"
          >
             <div className="relative w-full aspect-4/3 rounded-2xl bg-linear-to-tr from-muted/50 to-card/90 border border-border/50 shadow-2xl overflow-hidden backdrop-blur-xl group">
                {/* Mock Application Frame */}
                <div className="absolute top-0 w-full h-12 bg-background/80 border-b border-border/30 flex items-center px-4 gap-2 backdrop-blur-md z-20">
                   <div className="w-3 h-3 rounded-full bg-red-500/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   <div className="w-3 h-3 rounded-full bg-green-500/80" />
                   <div className="mx-auto px-4 py-1 rounded bg-muted/50 text-[10px] font-bold text-muted-foreground">axion.edu / tutor / intro-to-ai</div>
                </div>

                {/* Simulated Content */}
                <div className="absolute inset-x-0 bottom-0 top-12 p-6 flex flex-col justify-between overflow-hidden">
                   <div className="flex gap-4 h-full">
                      {/* Interactive Sidebar mock */}
                      <div className="w-1/3 h-full rounded-xl bg-background/50 border border-border/30 p-3 flex flex-col gap-2 relative shadow-inner">
                         <div className="h-4 w-1/2 bg-muted rounded-full mb-2" />
                         <div className="h-10 w-full rounded bg-primary/10 border border-primary/20" />
                         <div className="h-10 w-full rounded bg-muted/50 hover:bg-muted transition-colors cursor-pointer" />
                         <div className="h-10 w-full rounded bg-muted/50 hover:bg-muted transition-colors cursor-pointer" />
                         <div className="mt-auto h-24 w-full rounded-lg bg-linear-to-t from-primary/5 to-transparent border border-border/20 p-3">
                            <div className="h-3 w-3/4 bg-primary/20 rounded-full mb-2" />
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full w-2/3 bg-primary" />
                            </div>
                         </div>
                      </div>

                      {/* Main chat/video mock */}
                      <div className="w-2/3 h-full bg-background rounded-xl border border-border/50 shadow-lg flex flex-col overflow-hidden relative group-hover:shadow-primary/10 transition-shadow duration-700">
                         {/* Video mockup */}
                         <div className="h-1/2 w-full bg-muted/80 relative flex items-center justify-center border-b border-border/30 overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />
                            <PlayCircle className="w-10 h-10 text-primary/80 z-10" />
                         </div>
                         {/* Chat mockup */}
                         <div className="h-1/2 p-4 flex flex-col gap-3 relative">
                            <div className="w-3/4 h-8 bg-muted/50 rounded-lg rounded-tl-none self-start" />
                            <div className="w-2/3 h-10 bg-primary/10 border border-primary/20 text-primary rounded-lg rounded-tr-none self-end flex items-center px-3" >
                               <div className="h-2 w-1/2 bg-primary/40 rounded-full" />
                            </div>
                            <div className="absolute bottom-2 left-4 right-4 h-8 bg-muted/80 rounded-full border border-border/50" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
