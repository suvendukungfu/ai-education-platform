import { Loader2, Sparkles } from "lucide-react"

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
      </div>
      <div className="mt-6 text-center space-y-2">
        <h2 className="text-xl font-bold tracking-tight">AI Education Platform</h2>
        <p className="text-sm text-muted-foreground animate-pulse">Initializing intelligent learning environment...</p>
      </div>
    </div>
  )
}
