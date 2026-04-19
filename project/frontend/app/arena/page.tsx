import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NeuralArena } from "@/components/arena/neural-arena"

export default function ArenaPage() {
  return (
    <div className="min-h-screen bg-black text-foreground relative selection:bg-electric-blue/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,186,255,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none" />
      
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Neural Arena</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-bold font-mono">
            Synchronize. Compete. Evolve. Test your knowledge against rival neural links in real-time battles.
          </p>
        </div>
        
        <NeuralArena />
      </main>
    </div>
  )
}
