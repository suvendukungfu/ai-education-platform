import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { FloatingAIAssistant } from "@/components/layout/floating-ai-assistant";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageTransition } from "@/components/layout/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axion Intelligence | AI-First Learning Platform",
  description: "Next-generation educational experience with personal AI tutors, gamified mastery, and neural path tracking.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Axion",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-electric-blue/30 selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen relative overflow-hidden bg-black selection:bg-electric-blue/20">
              {/* Background Grain/Noise */}
              <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 mix-blend-overlay" />
              
              <Sidebar className="hidden md:flex shrink-0" />
              
              <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
              
              <FloatingAIAssistant />
              <MobileNav />
            </div>
            <Toaster position="top-center" expand={true} richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
