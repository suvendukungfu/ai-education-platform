"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, BrainCircuit, Rocket, Target, Zap } from "lucide-react"

export function TutorInsights({ enrollmentsCount }: { enrollmentsCount: number }) {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <BrainCircuit className="w-16 h-16 text-primary" />
        </div>
        <CardHeader className="pb-2">
           <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-3 h-3" /> System Intelligence
           </div>
           <CardTitle className="text-xl font-bold">Tutor Insights</CardTitle>
           <CardDescription className="text-xs">Dynamic analysis of your learning patterns.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
           {enrollmentsCount === 0 ? (
              <div className="space-y-4 py-4">
                 <div className="p-3 rounded-lg bg-background/50 border border-border/20 text-[11px] font-medium italic opacity-60">
                    "Enroll in your first course to begin our neural assessment of your progress velocity."
                 </div>
                 <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Awaiting Signal</span>
                 </div>
              </div>
           ) : (
              <div className="space-y-5">
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                       <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                       <h5 className="text-[11px] font-black uppercase tracking-tight text-primary">Progress Velocity</h5>
                       <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">Your engagement in {enrollmentsCount} path{enrollmentsCount > 1 ? 's' : ''} is optimized for retention.</p>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-accent/10 hover:border-accent/30 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                       <Rocket className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                       <h5 className="text-[11px] font-black uppercase tracking-tight text-accent">Strategic Learning</h5>
                       <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">Focusing on core engineering fundamentals will accelerate your certification path.</p>
                    </div>
                 </div>
              </div>
           )}
        </CardContent>
      </Card>
      
      <div className="p-4 border border-border/30 rounded-2xl bg-card/20 space-y-3">
         <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
            <span>Neural Load</span>
            <span>Optimal</span>
         </div>
         <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-primary to-accent w-2/3" />
         </div>
      </div>
    </div>
  )
}
