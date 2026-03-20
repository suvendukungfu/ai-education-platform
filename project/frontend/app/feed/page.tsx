import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreatePost } from "@/components/feed/create-post"
import { FeedPosts } from "@/components/feed/feed-posts"
import { FeedSidebar } from "@/components/feed/feed-sidebar"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CreatePost />
            <FeedPosts />
          </div>
          <div className="hidden lg:block">
            <FeedSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
