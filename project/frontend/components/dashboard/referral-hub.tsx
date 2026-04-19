"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Users, Gift, Share2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface ReferralHubProps {
  referralCode: string
  referralCount: number
}

export function ReferralHub({ referralCode, referralCount }: ReferralHubProps) {
  const [copied, setCopied] = useState(false)
  const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    toast.success("Referral link copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnSocial = () => {
    const text = `Join me on Axion Intelligence and scale your cognitive potential! 🚀 Use my neural link to get started: ${inviteLink}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <div className="relative overflow-hidden rounded-[40px] bg-card/40 backdrop-blur-3xl border border-border/50 p-8 shadow-2xl group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-3xl -z-10 group-hover:bg-electric-blue/10 transition-all duration-700" />
      
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-black uppercase tracking-widest">
              <Gift className="w-3 h-3" /> Viral Growth Protocol
            </div>
            <h3 className="text-3xl font-black tracking-tighter">Expand the Network.</h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              Invite your friends to Axion. For every node that syncs via your unique link, you earn <span className="text-amber-500 font-bold">+500 XP</span> and accelerate your Neural Rank.
            </p>
          </div>

          <div className="relative flex gap-2">
            <Input 
              readOnly 
              value={inviteLink} 
              className="h-12 bg-black/40 border-white/10 rounded-2xl pr-12 font-mono text-[10px] text-muted-foreground" 
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-12 top-1.5 h-9 w-9 rounded-xl hover:bg-electric-blue/10 hover:text-electric-blue text-muted-foreground"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={shareOnSocial}
              className="h-12 px-6 rounded-2xl bg-electric-blue text-black font-black hover:bg-white transition-all shadow-lg shadow-electric-blue/20 gap-2 shrink-0"
            >
              <Share2 className="w-4 h-4" /> SHARE
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-48 grid grid-cols-2 lg:grid-cols-1 gap-4 shrink-0">
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center space-y-1">
             <div className="flex justify-center mb-1">
                <Users className="w-5 h-5 text-electric-blue" />
             </div>
             <div className="text-2xl font-black italic">{referralCount}</div>
             <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Invited Nodes</div>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center space-y-1">
             <div className="flex justify-center mb-1">
                <Zap className="w-5 h-5 text-amber-500" />
             </div>
             <div className="text-2xl font-black italic">+{referralCount * 500}</div>
             <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">XP Earned</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
