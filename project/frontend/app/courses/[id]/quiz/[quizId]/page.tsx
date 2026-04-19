import db from "@/lib/db"
import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { QuizSession } from "@/components/quiz/quiz-session"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ScrollReveal } from "@/components/motion-wrapper"
import { Sparkles, Brain, Bot } from "lucide-react"

export default async function QuizPage({
  params
}: {
  params: { id: string, quizId: string }
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const quiz = await db.quiz.findUnique({
    where: { id: params.quizId },
    include: {
      questions: true,
      module: {
        include: { course: true }
      }
    }
  })

  if (!quiz) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-electric-blue/20">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-12">
        <ScrollReveal className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-glow/10 border border-violet-glow/20 text-violet-glow text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-glow/5">
              <Brain className="w-3 h-3" /> Neural Assessment Phase
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-balance">
              {quiz.title}
           </h1>
           <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
              {quiz.description || "Initialize cognitive synchronization to verify target mastery."}
           </p>
           
           <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex flex-col items-center">
                 <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Complexity</div>
                 <div className="text-sm font-bold text-electric-blue">RANK S</div>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div className="flex flex-col items-center">
                 <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Target</div>
                 <div className="text-sm font-bold text-electric-blue">70% SYNC</div>
              </div>
           </div>
        </ScrollReveal>

        <section className="relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />
           <QuizSession quizId={quiz.id} questions={quiz.questions} />
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-border/40 mt-20">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Bot className="w-6 h-6" />
               </div>
               <div className="text-sm font-bold tracking-tight">AXION NEURAL ENGINE v5.0</div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest">
               Cognitive Path Integrity: VERIFIED
            </div>
         </div>
      </footer>
    </div>
  )
}
