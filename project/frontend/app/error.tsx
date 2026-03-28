'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the imperial failure to the neural telemetry
    console.error('Neural Protocol Failure:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
          Protocol Breach (500)
        </h1>
        
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          The platform has encountered an internal neural conflict. Our automated diagnostic engine is already intercepting the crash data.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => reset()}
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 rounded-xl flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Neural Reset
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/dashboard'}
            className="border-white/10 hover:bg-white/5 text-white px-8 h-12 rounded-xl flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Hub
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs font-mono text-slate-500 uppercase tracking-widest">
            Telemetry Digest: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  )
}
