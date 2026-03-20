"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OfficeHoursFilters } from "@/components/office-hours/office-hours-filters"
import { OfficeHoursGrid } from "@/components/office-hours/office-hours-grid"
import type { Batch } from "@/lib/types"

export default function OfficeHoursPage() {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Faculty Office Hours</h1>
          <p className="text-muted-foreground">Book time with professors for guidance and academic support</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <OfficeHoursFilters onBatchChange={setSelectedBatch} />
          </aside>
          <div className="lg:col-span-3">
            <OfficeHoursGrid batch={selectedBatch} />
          </div>
        </div>
      </main>
    </div>
  )
}
