"use client"

import { motion } from "framer-motion"
import { BookOpen, MessageSquare, TrendingUp, Calendar, Award, ShieldCheck, Zap, Target, Trophy } from "lucide-react"

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  } as any

  return (
    <section id="features" className="py-32 bg-background relative z-10 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4 uppercase tracking-widest text-xs font-bold border border-electric-blue/20">
            <Zap className="w-4 h-4 text-electric-blue animate-pulse" />
            <span className="text-electric-blue">Neural Upgrades</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-balance italic uppercase drop-shadow-md">The Living Architecture</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-bold uppercase tracking-widest text-pretty">Step out of static education and into a responsive, living network. Axion builds worlds out of topics and challenges you to conquer them.</p>
        </motion.div>

        <motion.div 
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
             { title: "Course Forge Engine", desc: "Type any topic. Our AI generates a hyper-structured, fully personalized course in milliseconds. No more searching.", icon: BookOpen, color: "text-blue-500", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
             { title: "Vocal AI Tutor", desc: "Don't just read—converse. A persistent, vocal AI companion follows your journey, providing realtime curriculum combat.", icon: MessageSquare, color: "text-purple-500", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]" },
             { title: "Evolving Assessments", desc: "The platform learns what you don't know. Quizzes and boss fights adapt their difficulty inverse to your mastery level.", icon: Target, color: "text-green-500", glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]" },
             { title: "XP & Neural Streaks", desc: "Gamify your growth. Earn experience points for surviving lessons, and build compounding multipliers every day.", icon: Zap, color: "text-amber-500", glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]" },
             { title: "Multiplayer Arena", desc: "Challenge rival learners in live neural syncs. You don't just learn in a silo—you dominate the global cohort.", icon: Award, color: "text-pink-500", glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]" },
             { title: "Adaptive Mastery Paths", desc: "Axion's Reinforcement Learning brain calculates your optimal next steps, guiding you perfectly up the tech tree.", icon: ShieldCheck, color: "text-electric-blue", glow: "group-hover:shadow-[0_0_30px_rgba(0,186,255,0.3)]" }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={item} className="group relative h-full">
               <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className={`bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 h-full shadow-xl shadow-black/5 hover:-translate-y-2 transition-all duration-300 relative z-10 flex flex-col items-start gap-5 ${feature.glow}`}>
                 <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-background to-muted border border-border/50 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md">
                   <feature.icon className={`w-8 h-8 ${feature.color}`} />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                   <p className="text-muted-foreground leading-relaxed font-medium text-sm text-pretty">{feature.desc}</p>
                 </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
