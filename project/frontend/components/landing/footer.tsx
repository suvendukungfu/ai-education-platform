import Link from "next/link"
import { BrainCircuit } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors shadow-sm">
                <BrainCircuit className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">Axion</span>
            </Link>
            <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
              The next-generation intelligence platform for absolute cognitive acceleration.
            </p>
          </div>
          <div>
             <h4 className="font-bold tracking-tight mb-4">Platform</h4>
             <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li><Link href="#features" className="hover:text-primary transition-colors">Intelligence Core</Link></li>
                <li><Link href="#methodology" className="hover:text-primary transition-colors">Pedagogy</Link></li>
                <li><Link href="/signup" className="hover:text-primary transition-colors">Student Access</Link></li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold tracking-tight mb-4">Legal</h4>
             <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
             </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
           <p>&copy; {(new Date()).getFullYear()} Axion Intelligence. All rights reserved.</p>
           <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Online
           </p>
        </div>
      </div>
    </footer>
  )
}
