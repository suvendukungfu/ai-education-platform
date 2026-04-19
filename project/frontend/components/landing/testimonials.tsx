"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    content: "Axion's AI Tutor is a game-changer. I mastered Data Structures in half the time compared to traditional courses. The gamification makes me actually want to study every night.",
    avatar: "/avatars/student1.png",
    rating: 5
  },
  {
    name: "Marcus Wright",
    role: "Self-taught Developer",
    content: "The Neural Roadmap is what I've been missing. It feels like playing a game, but I'm actually building production-ready projects. The RAG personalized feedback is scary accurate.",
    avatar: "/avatars/student2.png",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "High School Junior",
    content: "Finally, an AI that doesn't just give answers but actually teaches you how to think. The Electric Blue design is stunning, and the streaks keep me motivated.",
    avatar: "/avatars/student1.png", // Reusing avatar for scaffold
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Star className="w-3 h-3 fill-electric-blue" /> Wall of Love
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-6"
          >
            Trancending the <span className="text-electric-blue">Standard</span> of Learning.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium"
          >
            Join thousands of students who are reclaiming their cognitive potential with Axion's AI-first approach.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[32px] bg-card/40 backdrop-blur-xl border border-border/50 relative group flex flex-col h-full shadow-2xl shadow-black/5"
            >
              <div className="absolute top-8 right-8">
                <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue shrink-0">
                  <Quote className="w-12 h-12 rotate-180" />
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                <div className="flex flex-col grow">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground font-medium mb-8 grow">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/40">
                <div className="w-12 h-12 rounded-full border-2 border-electric-blue/30 overflow-hidden relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">{testimonial.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
