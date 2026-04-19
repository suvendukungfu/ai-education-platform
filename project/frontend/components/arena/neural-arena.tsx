"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Target, Crosshair, Users, Trophy, Brain, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_OPPONENT = {
  name: "Kryos_X",
  avatar: "K",
  xp: 15600,
  level: 42,
  status: "SYNCHRONIZED"
}

const QUESTIONS = [
  { text: "What is the time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], correct: 0 },
  { text: "Which protocol operates at the Transport layer of the OSI model?", options: ["HTTP", "IP", "TCP", "Ethernet"], correct: 2 },
  { text: "What is the capital of Neural processing?", options: ["Synapse", "Axon", "Dendrite", "Cortex"], correct: 3 },
]

export function NeuralArena() {
  const [matchState, setMatchState] = useState<'MATCHMAKING' | 'SYNCING' | 'BATTLE' | 'RESULTS'>('MATCHMAKING')
  const [timer, setTimer] = useState(3)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  
  // Matchmaking simulation
  useEffect(() => {
    if (matchState === 'MATCHMAKING') {
      const wait = setTimeout(() => {
        setMatchState('SYNCING')
      }, 3000)
      return () => clearTimeout(wait)
    }

    if (matchState === 'SYNCING') {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown)
            setMatchState('BATTLE')
            return 10
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(countdown)
    }

    if (matchState === 'BATTLE') {
      const qTimer = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            handleNextQuestion()
            return 10
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(qTimer)
    }
  }, [matchState, currentQuestion])

  const handleNextQuestion = () => {
    setSelectedOption(null)
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setTimer(10)
    } else {
      setMatchState('RESULTS')
    }
  }

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return
    setSelectedOption(idx)
    
    // Simulate scoring
    if (idx === QUESTIONS[currentQuestion].correct) {
      setPlayerScore(prev => prev + 100 + (timer * 10))
    }
    
    // Simulate opponent answering randomly slightly after
    setTimeout(() => {
      const opponentCorrect = Math.random() > 0.3
      if (opponentCorrect) {
        setOpponentScore(prev => prev + 100 + (Math.floor(Math.random() * 8) * 10))
      }
      
      setTimeout(handleNextQuestion, 1500)
    }, Math.random() * 1000 + 500)
  }

  return (
    <div className="relative min-h-[600px] flex items-center justify-center p-6 bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[40px] overflow-hidden shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        
        <AnimatePresence mode="wait">
          {/* MATCHMAKING */}
          {matchState === 'MATCHMAKING' && (
            <motion.div 
              key="matchmaking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-8"
            >
               <div className="relative">
                 <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-8 bg-electric-blue/20 blur-2xl rounded-full"
                 />
                 <div className="w-24 h-24 rounded-full bg-black border border-electric-blue/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(0,186,255,0.3)]">
                   <Target className="w-10 h-10 text-electric-blue animate-pulse" />
                 </div>
               </div>
               
               <div>
                  <h2 className="text-3xl font-black uppercase tracking-[0.2em] italic text-electric-blue drop-shadow-[0_0_10px_rgba(0,186,255,0.5)]">Searching Neural Network...</h2>
                  <p className="text-muted-foreground font-bold mt-2 uppercase tracking-widest text-xs">Finding optimal opponent for neural sync challenge</p>
               </div>
            </motion.div>
          )}

          {/* SYNCING */}
          {matchState === 'SYNCING' && (
            <motion.div 
              key="syncing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center space-y-12"
            >
               <div className="flex items-center justify-center w-full gap-8">
                  {/* Player */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-4 relative overflow-hidden">
                       <div className="absolute inset-0 bg-electric-blue/10 animate-pulse" />
                       <UserAvatar initial="Y" /> 
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-electric-blue">You</div>
                  </div>

                  <div className="flex flex-col items-center justify-center min-w-[100px]">
                     <div className="text-4xl font-black italic text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        {timer}
                     </div>
                     <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground mt-2">Syncing</div>
                  </div>

                  {/* Opponent */}
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-black border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)] mb-4 relative overflow-hidden">
                       <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                       <div className="text-2xl font-black italic text-red-500">{MOCK_OPPONENT.avatar}</div>
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-red-500">{MOCK_OPPONENT.name}</div>
                  </motion.div>
               </div>
               
               <div className="w-full max-w-sm">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="h-full bg-linear-to-r from-electric-blue to-red-500 rounded-full"
                     />
                  </div>
               </div>
            </motion.div>
          )}

          {/* BATTLE */}
          {matchState === 'BATTLE' && (
            <motion.div 
              key="battle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col h-full"
            >
               {/* Match Header Top */}
               <div className="flex justify-between items-center mb-8 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <motion.div 
                       key={timer}
                       initial={{ scale: 1.5, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className={`text-3xl font-black italic ${timer <= 3 ? 'text-red-500' : 'text-white'}`}
                     >
                        {timer}
                     </motion.div>
                  </div>
                  
                  <div className="flex flex-col items-start bg-electric-blue/10 px-6 py-3 rounded-2xl border border-electric-blue/20">
                     <div className="text-[10px] uppercase font-black text-electric-blue tracking-widest">You</div>
                     <div className="text-2xl font-black tracking-tight">{playerScore} <span className="text-xs text-muted-foreground">XP</span></div>
                  </div>

                  <div className="flex flex-col items-end bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
                     <div className="text-[10px] uppercase font-black text-red-500 tracking-widest">{MOCK_OPPONENT.name}</div>
                     <div className="text-2xl font-black tracking-tight">{opponentScore} <span className="text-xs text-muted-foreground">XP</span></div>
                  </div>
               </div>

               {/* Question Area */}
               <div className="text-center mb-10 mt-4">
                  <Badge variant="outline" className="mb-4 bg-white/5 border-white/10 uppercase tracking-widest">
                     Question {currentQuestion + 1} / {QUESTIONS.length}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-xl mx-auto">
                     {QUESTIONS[currentQuestion].text}
                  </h3>
               </div>

               {/* Options Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                  {QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedOption !== null}
                      className={`p-6 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedOption === null 
                          ? 'bg-card/50 border-white/10 hover:border-electric-blue/50 hover:bg-electric-blue/10'
                          : selectedOption === idx
                            ? idx === QUESTIONS[currentQuestion].correct
                              ? 'bg-green-500/20 border-green-500 text-green-500'
                              : 'bg-red-500/20 border-red-500 text-red-500'
                            : idx === QUESTIONS[currentQuestion].correct
                              ? 'bg-green-500/20 border-green-500 text-green-500'
                              : 'bg-card/50 border-white/5 opacity-50'
                      }`}
                    >
                       <span className="font-semibold">{option}</span>
                       {selectedOption !== null && idx === QUESTIONS[currentQuestion].correct && (
                         <Badge className="bg-green-500 text-black font-black uppercase">Correct</Badge>
                       )}
                    </motion.button>
                  ))}
               </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {matchState === 'RESULTS' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-8"
            >
               <div className="w-32 h-32 rounded-full flex items-center justify-center relative bg-black/50 border border-white/10">
                 {playerScore >= opponentScore ? (
                   <>
                     <div className="absolute inset-0 rounded-full bg-electric-blue/20 blur-2xl animate-pulse" />
                     <Trophy className="w-16 h-16 text-electric-blue relative z-10" />
                   </>
                 ) : (
                   <>
                     <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />
                     <Flame className="w-16 h-16 text-red-500 relative z-10" />
                   </>
                 )}
               </div>

               <div className="space-y-2">
                 <h2 className="text-4xl font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">
                   {playerScore >= opponentScore ? 'Victory Achieved' : 'Neural Sync Broken'}
                 </h2>
                 <p className="text-muted-foreground uppercase tracking-[0.2em] font-bold">
                   Match Concluded
                 </p>
               </div>

               <div className="flex gap-12 items-center bg-white/5 p-8 rounded-3xl border border-white/10">
                 <div className="flex flex-col items-center text-center space-y-2 w-32">
                    <div className="text-[10px] uppercase font-black text-electric-blue tracking-widest">You</div>
                    <div className="text-4xl font-black">{playerScore}</div>
                 </div>
                 <div className="text-3xl font-black text-muted-foreground/30 italic">VS</div>
                 <div className="flex flex-col items-center text-center space-y-2 w-32">
                    <div className="text-[10px] uppercase font-black text-red-500 tracking-widest">{MOCK_OPPONENT.name}</div>
                    <div className="text-4xl font-black">{opponentScore}</div>
                 </div>
               </div>

               <div className="flex gap-4 pt-8">
                 <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px]" onClick={() => window.location.href = '/dashboard'}>
                    Return to Hub
                 </Button>
                 <Button className="rounded-2xl h-14 px-8 bg-electric-blue text-black hover:bg-white font-black uppercase tracking-widest text-[10px]" onClick={() => setMatchState('MATCHMAKING')}>
                    Challenge Again
                 </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function UserAvatar({ initial }: { initial: string }) {
   return (
      <div className="text-2xl font-black italic text-electric-blue relative z-10">{initial}</div>
   )
}
