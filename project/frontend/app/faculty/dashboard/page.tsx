import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FacultyStats } from "@/components/faculty/faculty-stats"
import { ManageOfficeHours } from "@/components/faculty/manage-office-hours"
import { UpcomingAppointments } from "@/components/faculty/upcoming-appointments"

export default function FacultyDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Manage your office hours and student appointments</p>
        </div>
        <FacultyStats />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ManageOfficeHours />
          </div>
          <div>
            <UpcomingAppointments />
          </div>
        </div>
      </main>
    </div>
  )
}
