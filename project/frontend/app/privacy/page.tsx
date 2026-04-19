"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" /> Data Sovereignty
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Privacy Protocol</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            How Axion Intelligence encrypts, protects, and handles your neural learning data.
          </p>
        </header>

        <div className="grid gap-8">
          {[
            { 
              title: "Information Collection", 
              icon: FileText, 
              content: "We collect data necessary for your personalized learning experience, including course progress, quiz results, and AI tutor interactions. All data is anonymized before being processed by the AI Engine." 
            },
            { 
              title: "Neural Encryption", 
              icon: Lock, 
              content: "All communication between the PyroEngine, Backend, and Frontend is encrypted using AES-256 standards. Your private identifiers never leave the platform's secure edge nodes." 
            },
            { 
              title: "Data Visualization", 
              icon: Eye, 
              content: "You have full transparency. Every data point we use for your 'Adaptive Learning Widget' is visible to you in your personal dashboard at all times." 
            }
          ].map((item, i) => (
             <Card key={i} className="bg-card/10 border-border/50 backdrop-blur-md hover:border-primary/30 transition-all rounded-3xl p-4">
                <CardHeader className="flex flex-row items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <item.icon className="w-6 h-6 text-primary" />
                   </div>
                   <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground leading-relaxed font-medium">{item.content}</p>
                </CardContent>
             </Card>
          ))}
        </div>

        <footer className="text-center pt-8 opacity-50">
           <p className="text-[10px] font-black uppercase tracking-widest">Last Updated: April 2026 • Axion Intelligence Node 1</p>
        </footer>
      </main>
    </div>
  )
}
