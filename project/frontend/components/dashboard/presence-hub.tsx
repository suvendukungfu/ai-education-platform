"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Zap, Globe, Shield, Radio } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ActiveUser {
  id: string
  name: string
  activity: string
  xp: number
  status: "SYNCING" | "IDLE" | "FORGING"
}

const MOCK_USERS: ActiveUser[] = [
  { id: "1", name: "Nova_01", activity: "Quantum Foundations", xp: 12400, status: "SYNCING" },
  { id: "2", name: "Aether_99", activity: "Rust Memory Safety", xp: 8900, status: "FORGING" },
  { id: "3", name: "Kryos_X", activity: "Neural Topology", xp: 15600, status: "IDLE" },
]

export function PresenceHub() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>(MOCK_USERS)
  const [pulse, setPulse] = useState(0)

  // Simulate real-time activity shifts
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[32px] space-y-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-linear-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20">
            <Users className="w-5 h-5 text-electric-blue" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest italic">Neural Presence</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 1,240 Syncs Active
            </div>
          </div>
        </div>
        <Badge variant="outline" className="border-electric-blue/30 text-electric-blue text-[10px] font-black italic">GLOBAL NODE</Badge>
      </div>

      <div className="space-y-4 relative z-10">
        <AnimatePresence>
          {activeUsers.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                   <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center font-black text-[10px] text-electric-blue italic">
                      {user.name[0]}
                   </div>
                   {user.status === "SYNCING" && (
                     <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-1 bg-electric-blue/40 blur-sm rounded-full"
                     />
                   )}
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-tight flex items-center gap-1.5">
                    {user.name} 
                    {user.status === "FORGING" && <Zap className="w-3 h-3 text-amber-500 fill-amber-500 animate-bounce" />}
                  </div>
                  <div className="text-[9px] text-muted-foreground font-medium truncate max-w-[100px]">
                    {user.activity}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-black text-electric-blue italic">{user.xp.toLocaleString()} XP</div>
                <div className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">{user.status}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-2 border-t border-white/5 relative z-10">
        <Link href="/arena" className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn">
            <Radio className="w-3 h-3 text-electric-blue group-hover/btn:animate-pulse" />
            Join Sync Cluster
         </Link>
      </div>
    </div>
  )
}
