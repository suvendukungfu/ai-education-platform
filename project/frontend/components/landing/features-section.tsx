"use client"

import { motion } from "framer-motion"
import { BookOpen, MessageSquare, TrendingUp, Calendar, Award, ShieldCheck } from "lucide-react"

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
  } as any

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  } as any

  return (
    <section id="features" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Intelligent Learning Ecosystem</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">Scalable node architecture combined with state-of-the-art LLM orchestration to build a personalized study map.</p>
        </motion.div>

        <motion.div 
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
             { title: "Semantic Ingestion", desc: "Upload PDFs or Markdown notes. Our engine chunks, embeds, and indexes your content instantaneously.", icon: BookOpen, color: "text-blue-500" },
             { title: "RAG-Powered Tutor", desc: "Ask highly contextual questions about your course content. Get answers grounded in absolute curriculum reality.", icon: MessageSquare, color: "text-purple-500" },
             { title: "Adaptive Assessments", desc: "Dynamically generated quizzes and exams that adapt to your specific knowledge gaps using performance analytics.", icon: TrendingUp, color: "text-green-500" },
             { title: "Event-Driven Topology", desc: "High-latency AI generation tasks are processed via secure message queues ensuring a seamlessly fluid user experience.", icon: Calendar, color: "text-orange-500" },
             { title: "Unified Monolith", desc: "Decoupled domain logic for Auth, Content, and AI allows for high availability and flawless execution.", icon: Award, color: "text-pink-500" },
             { title: "Zero-Trust RBAC", desc: "Secure, granular permission schemas for students and system administrators, verified at the edge.", icon: ShieldCheck, color: "text-primary" }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={item} className="group relative">
               <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-8 h-full shadow-lg shadow-black/5 hover:border-primary/20 transition-all duration-300 relative z-10 flex flex-col items-start gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-muted/80 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-background transition-all duration-500 shadow-sm">
                   <feature.icon className={`w-7 h-7 ${feature.color}`} />
                 </div>
                 <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                 <p className="text-muted-foreground leading-relaxed font-medium text-sm">{feature.desc}</p>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
