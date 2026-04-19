"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CallToActionSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-electric-blue/5 to-violet-glow/5" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[48px] bg-card/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-electric-blue/10 overflow-hidden relative group">
          {/* Animated Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-electric-blue/20 rounded-full blur-[100px] group-hover:bg-electric-blue/30 transition-colors duration-700" />
          
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles className="w-4 h-4" /> Limited Beta Access
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60 leading-[1.1] italic uppercase"
            >
              Ready to ignite the <br/><span className="text-electric-blue drop-shadow-[0_0_15px_rgba(0,186,255,0.4)]">Living Engine</span>?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto"
            >
              Join the elite circle of learners mastering complex subjects inside a responsive, evolving neural network. Stop grinding. Start synchronizing.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="rounded-2xl px-12 h-14 bg-electric-blue text-black font-black uppercase tracking-widest hover:bg-white shadow-[0_0_30px_rgba(0,186,255,0.3)] group text-xs" asChild>
                <Link href="/dashboard">
                  Start Evolving Free <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link href="/login" className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                Already a Member? Login
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
