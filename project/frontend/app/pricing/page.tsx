import { Check, Zap, Star, Shield, ArrowRight, Bot, Cpu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, HoverGlow } from "@/components/motion-wrapper"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import Link from "next/link"

const tiers = [
  {
    name: "Standard Link",
    price: "$0",
    description: "Ideal for basic neural exploration and foundational AI support.",
    features: [
      "Access to 3 Starter Paths",
      "Standard Neural Bandwidth (10/day)",
      "Neural Identity Card",
      "Public Achievement Gallery"
    ],
    cta: "ACTIVE LINK",
    highlight: false
  },
  {
    name: "Neural Pro",
    price: "$19",
    description: "The professional standard for hyper-accelerated cognitive mastery.",
    features: [
      "Unlimited AI Synchronization",
      "Global Knowledge Base Access",
      "Adaptive Neural Revision",
      "Priority Synthesis Processing",
      "Pro Certification Badges",
      "Private Mastermind Access"
    ],
    cta: "SCALE NEURAL LINK",
    highlight: true,
    badge: "HYPER-SYNC"
  },
  {
    name: "Neural Elite",
    price: "$49",
    description: "Absolute human-AI symbiosis for industry-leading mastery.",
    features: [
      "Infinite Cognitive Bandwidth",
      "Dedicated Neural Concierge",
      "Alpha Access to New Weights",
      "Custom Neural Integration",
      "Unlimited Mastery Paths"
    ],
    cta: "EXPAND CONSCIOUSNESS",
    highlight: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-electric-blue/20">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-24">
        {/* Hero */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3" /> Monetization Layer Active
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-balance leading-tight uppercase italic">
              Select Your <br/><span className="text-electric-blue drop-shadow-[0_0_25px_rgba(0,186,255,0.4)]">Neural Frequency.</span>
           </h1>
           <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight">
              Scale your bandwidth with our high-fidelity premium links. No friction, just pure cognitive expansion.
           </p>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {tiers.map((tier, idx) => (
              <ScrollReveal key={tier.name} delay={idx * 0.1} direction={idx === 0 ? 'left' : idx === 2 ? 'right' : 'up'}>
                 <HoverGlow>
                    <div className={`relative h-full p-10 rounded-[48px] border transition-all flex flex-col ${
                       tier.highlight 
                       ? "bg-card/60 border-electric-blue/50 shadow-2xl shadow-electric-blue/10 scale-105 z-10" 
                       : "bg-card/40 border-border/50 hover:border-electric-blue/30"
                    }`}>
                       {tier.badge && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric-blue text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                             {tier.badge}
                          </div>
                       )}

                       <div className="mb-10 space-y-4">
                          <h3 className="text-2xl font-black tracking-tight">{tier.name}</h3>
                          <div className="flex items-baseline gap-1">
                             <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                             <span className="text-muted-foreground font-bold text-sm">/MONTH</span>
                          </div>
                          <p className="text-muted-foreground text-sm font-medium leading-relaxed">{tier.description}</p>
                       </div>

                       <div className="grow space-y-4 mb-10">
                          {tier.features.map(feat => (
                             <div key={feat} className="flex items-start gap-3 group">
                                <div className={`mt-1 h-5 w-5 rounded-md flex items-center justify-center shrink-0 ${tier.highlight ? "bg-electric-blue/20 text-electric-blue" : "bg-muted text-muted-foreground"}`}>
                                   <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">{feat}</span>
                             </div>
                          ))}
                       </div>

                       <Button 
                          className={`w-full h-16 rounded-full font-black text-lg transition-all ${
                             tier.highlight 
                             ? "bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5" 
                             : "bg-muted/50 text-foreground hover:bg-muted"
                          }`}
                       >
                          {tier.cta}
                       </Button>
                    </div>
                 </HoverGlow>
              </ScrollReveal>
           ))}
        </div>

        {/* Trust Bar */}
        <ScrollReveal className="mt-32 pt-16 border-t border-border/30 text-center space-y-12">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Trusted by 10,000+ Neural Engineers Worldwide</h4>
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-3 font-black text-xl"><Bot className="w-8 h-8" /> NEURO</div>
              <div className="flex items-center gap-3 font-black text-xl"><Cpu className="w-8 h-8" /> SYNAPSE</div>
              <div className="flex items-center gap-3 font-black text-xl"><Globe className="w-8 h-8" /> AXION</div>
           </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
