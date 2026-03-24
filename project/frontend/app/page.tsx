"use client"

import { Navigation } from "@/components/landing/navigation"
import { GalaxyBackground } from "@/components/landing/galaxy-background"
import { HeroSection } from "@/components/landing/hero-section"
import { StorySection } from "@/components/landing/story-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CallToActionSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

import { CinematicStory } from "@/components/landing/cinematic-story"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-electric-blue/30 selection:text-electric-blue overflow-x-hidden">
      <Navigation />
      
      {/* Immersive 3D Backdrop */}
      <GalaxyBackground />

      <main className="relative">
        <HeroSection />
        
        {/* The Narrative Core */}
        <CinematicStory />

        <StorySection />
        <HowItWorksSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>

      <Footer />
    </div>
  )
}
