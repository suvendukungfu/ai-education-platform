"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Cpu, Zap } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            <Scale className="w-3 h-3" /> Policy Lexicon
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Terms of Service</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            The legal framework governing your interaction with Axion Intelligence and its AI core.
          </p>
        </header>

        <div className="grid gap-6">
          {[
            { 
              title: "1. AI Usage Rights", 
              icon: Cpu, 
              content: "By using Axion, you grant the AI engine permission to analyze your interaction patterns solely for the purpose of personalizing your learning path. You retain ownership of all intellectual inputs provided in tutor sessions." 
            },
            { 
              title: "2. Platform Conduct", 
              icon: Users, 
              content: "Users must adhere to the 'Senior-Level Project' code of conduct. Exploitative testing of the AI system's boundaries is encouraged for research but prohibited for malicious intent." 
            },
            { 
              title: "3. Neural Accuracy", 
              icon: Zap, 
              content: "While the Axion tutor is optimized for high accuracy via RAG (Retrieval-Augmented Generation), you acknowledge that AI-generated responses should be verified against the official course modules for final exam accuracy." 
            }
          ].map((item, i) => (
             <div key={i} className="group p-8 rounded-3xl bg-card/10 border border-border/50 hover:bg-card/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                   <item.icon className="w-5 h-5 text-primary" />
                   <h2 className="text-xl font-bold">{item.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.content}</p>
             </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 text-center space-y-2">
           <p className="text-xs font-bold leading-relaxed">By logging into the Axion Dashboard, you agree to these terms with the same weight as a physical signature in our digital learning node.</p>
        </div>
      </main>
    </div>
  )
}
