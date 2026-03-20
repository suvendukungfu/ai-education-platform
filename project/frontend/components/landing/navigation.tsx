"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BrainCircuit, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-border/30 py-3 shadow-lg shadow-black/5"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <BrainCircuit className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              Axion Intelligence
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Methodology", "Platform"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:inline-flex font-semibold">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300 hidden sm:inline-flex">
              <Link href="/signup">Get Access</Link>
            </Button>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/30 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {["Features", "Methodology", "Platform"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black tracking-tight text-foreground/80 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
               <Button variant="outline" asChild className="w-full h-12 font-bold" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/login">Sign In</Link>
               </Button>
               <Button asChild className="w-full h-12 font-black shadow-lg shadow-primary/20" onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/signup">Get Access Now</Link>
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
