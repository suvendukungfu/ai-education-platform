"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import type { ConversationSummary } from "@/lib/db/chat"

export default function ChatPage() {
  const [conversation, setConversation] = useState<ConversationSummary | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar
          selectedPartnerId={conversation?.partnerId}
          onSelect={setConversation}
          refreshKey={refreshKey}
        />
        <ChatWindow
          conversation={conversation}
          onMessageSent={() => setRefreshKey((value) => value + 1)}
        />
      </div>
    </div>
  )
}
