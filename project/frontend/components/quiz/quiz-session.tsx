"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ArrowRight, Brain, Trophy, Zap, AlertCircle, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { submitQuizAttempt } from "@/lib/actions/quiz"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  text: string
  options: string // JSON string
  correctAnswer: string
  explanation?: string | null
}

export function QuizSession({ quizId, questions }: { quizId: string, questions: Question[] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: string, answer: string }[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState<{ score: number, passed: boolean } | null>(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const question = questions[currentIdx]
  const options = JSON.parse(question.options) as string[]
  const progress = ((currentIdx + 1) / questions.length) * 100

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(option)
    const correct = option === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00d4ff', '#ffffff']
      })
    }
  }

  const handleNext = async () => {
    const newAnswers = [...answers, { questionId: question.id, answer: selectedAnswer! }]
    setAnswers(newAnswers)
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setLoading(true)
      const res = await submitQuizAttempt({ quizId, answers: newAnswers })
      if (res.success) {
        setResults({ score: res.score, passed: res.passed })
        setCompleted(true)
        if (res.passed) {
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#00d4ff', '#9d50bb']
          })
        }
      }
      setLoading(false)
    }
  }

  if (completed && results) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="bg-white/3 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 text-center space-y-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-electric-blue via-violet-glow to-electric-blue animate-pulse" />
          <div className="absolute inset-0 bg-radial-at-t from-electric-blue/10 to-transparent pointer-events-none" />
          
          <div className="relative inline-block">
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -inset-4 bg-electric-blue/20 blur-2xl rounded-full" 
             />
             <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-electric-blue to-violet-glow flex items-center justify-center relative z-10 shadow-2xl">
                {results.passed ? <Trophy className="w-12 h-12 text-black" /> : <AlertCircle className="w-12 h-12 text-black" />}
             </div>
          </div>

          <div className="space-y-3 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">{results.passed ? "Cognitive Sync Achieved" : "Neural Link Mismatch"}</h2>
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60">Final Synchronization Score: {results.score}%</p>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md"
             >
                <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 mb-1">Mastery Level</div>
                <div className="text-3xl font-black text-electric-blue italic">{results.passed ? "RANK A" : "RANK F"}</div>
             </motion.div>
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md"
             >
                <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 mb-1">XP Surge</div>
                <div className="text-3xl font-black text-amber-500 italic">+{results.passed ? 150 : 50}</div>
             </motion.div>
          </div>

          <div className="pt-8 relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-2xl px-12 h-16 bg-white text-black font-black hover:bg-electric-blue transition-all text-lg shadow-2xl shadow-white/5 uppercase tracking-widest group" onClick={() => router.push('/dashboard')}>
               RETURN TO HUB <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-2xl px-8 h-16 border-white/10 bg-white/5 text-white font-black hover:bg-white/10 shadow-2xl transition-all uppercase tracking-widest gap-3" onClick={() => {
               const text = `I just achieved Cognitive Sync on Axion Intelligence! 🧠 Level ${results.passed ? 'A' : 'F'} Synchronization reached. #AxionAI #ViralLearning`
               const url = window.location.origin
               if (navigator.share) {
                  navigator.share({ title: 'Cognitive Victory', text, url })
               } else {
                  navigator.clipboard.writeText(url)
                  toast.success("Sync link copied!")
               }
            }}>
               <Share2 className="w-5 h-5" /> SHARE VICTORY
            </Button>
          </div>

          {/* Neural Lines Decor */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path d="M0 100 C 100 0, 300 100, 400 0" stroke="#00d4ff" strokeWidth="1" fill="none" />
                <path d="M0 50 C 150 150, 250 -50, 400 50" stroke="#9d50bb" strokeWidth="1" fill="none" />
             </svg>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
          <div className="flex items-center gap-2 text-electric-blue">
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}><Zap className="w-4 h-4" /></motion.div>
            Cognitive Assessment {currentIdx + 1}
          </div>
          <div className="bg-white/5 px-3 py-1 rounded-full border border-white/5">{currentIdx + 1} of {questions.length}</div>
        </div>
        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             className="absolute h-full bg-linear-to-r from-electric-blue to-violet-glow" 
           />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          <div className="relative">
             <div className="absolute -left-8 top-0 bottom-0 w-1 bg-linear-to-b from-electric-blue/50 via-transparent to-transparent hidden md:block" />
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">{question.text}</h2>
          </div>
          
          <div className="grid gap-4">
            {options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option)}
                className={`p-6 md:p-8 rounded-[32px] text-left border-2 transition-all duration-500 flex items-center justify-between group relative overflow-hidden ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                      : "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                    : "bg-white/3 backdrop-blur-3xl border-white/5 hover:border-electric-blue/50 text-foreground shadow-2xl"
                }`}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 text-lg ${
                    selectedAnswer === option ? (isCorrect ? "bg-green-500 text-black" : "bg-red-500 text-black") : "bg-white/5 group-hover:bg-electric-blue group-hover:text-black group-hover:rotate-12"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg md:text-2xl font-black tracking-tight">{option}</span>
                </div>
                {selectedAnswer === option && (
                   <div className="shrink-0 relative z-10">{isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}</div>
                )}
              </motion.button>
            ))}
          </div>
          
          {selectedAnswer && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12 rounded-[40px] bg-black/60 border border-white/5 backdrop-blur-3xl space-y-6 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-br from-violet-glow/5 to-transparent pointer-events-none" />
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-violet-glow mb-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-glow/10 flex items-center justify-center"><Brain className="w-4 h-4" /></div>
                  Neural Link Logic Correction
               </div>
               <p className="text-xl md:text-2xl font-bold text-foreground/90 leading-relaxed italic">"{question.explanation}"</p>
               <div className="pt-6">
                  <Button size="lg" className="rounded-2xl px-12 h-16 bg-electric-blue text-black font-black hover:bg-white transition-all uppercase tracking-widest text-xs shadow-xl shadow-electric-blue/20 group" onClick={handleNext} disabled={loading}>
                     {loading ? "Syncing..." : "Calibrate Next Objective"} <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
