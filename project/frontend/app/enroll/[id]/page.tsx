"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { enrollInCourse } from "@/lib/actions/enroll"
import { toast } from "sonner"
import { Loader2, CheckCircle2, ShoppingCart, LockIcon, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function EnrollPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id: courseId } = params
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleEnroll = async () => {
      try {
        const result = await enrollInCourse(courseId)
        
        if (result?.success) {
          toast.success("Welcome to the course! Redirecting to tutor...")
          router.push(`/tutor/${courseId}`)
        } else if (result?.error) {
           toast.error(result.error)
           router.push(`/courses/${courseId}`)
        }
      } catch (err) {
        toast.error("An unexpected error occurred.")
        router.push(`/courses/${courseId}`)
      } finally {
        setLoading(false)
      }
    }

    handleEnroll()
  }, [courseId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
       {/* High-end ambient animations Background */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px]" 
          />
       </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="text-center z-10 space-y-8 max-w-sm"
      >
        <div className="flex flex-col items-center gap-6">
           <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-full" />
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center border border-primary/50 shadow-2xl relative shadow-primary/20">
                 {loading ? (
                    <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
                 ) : (
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                 )}
              </div>
           </div>
           
           <div className="space-y-2">
             <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase italic px-4 py-1 border-x-2 border-primary/50 inline-block">
                SECURE FLOW
             </h1>
             <p className="text-muted-foreground text-sm font-medium tracking-tight">PLATFORM INITIALIZATION IN PROGRESS</p>
           </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border/20">
           <div className="flex items-center gap-3 text-xs opacity-50 font-bold uppercase tracking-widest justify-center">
              <LockIcon className="w-3 h-3" /> Encrypted Transaction
           </div>
           <div className="flex items-center gap-3 text-xs opacity-50 font-bold uppercase tracking-widest justify-center">
              <Sparkles className="w-3 h-3 text-primary" /> AI Access Unlocked
           </div>
        </div>
      </motion.div>
    </div>
  )
}
