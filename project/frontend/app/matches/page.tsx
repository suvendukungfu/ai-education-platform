import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchFilters } from "@/components/matches/match-filters"
import { MatchGrid } from "@/components/matches/match-grid"

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Your Matches</h1>
          <p className="text-muted-foreground">
            Connect with students who share your interests and complement your skills
          </p>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <MatchFilters />
          </aside>
          <div className="lg:col-span-3">
            <MatchGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
