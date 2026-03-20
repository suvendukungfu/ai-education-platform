"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ConversationSummary, getConversations } from "@/lib/db/chat"

type ChatSidebarProps = {
  selectedPartnerId?: string
  onSelect: (conversation: ConversationSummary) => void
  refreshKey?: number
}

export function ChatSidebar({ selectedPartnerId, onSelect, refreshKey = 0 }: ChatSidebarProps) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadConversations() {
      setLoading(true)
      try {
        const data = await getConversations(30)
        setConversations(data)
        if (!selectedPartnerId && data.length) {
          onSelect(data[0])
        }
      } catch (error) {
        console.error("Failed to load conversations", error)
      } finally {
        setLoading(false)
      }
    }

    loadConversations()
  }, [selectedPartnerId, onSelect, refreshKey])

  const filteredConversations = useMemo(() => {
    if (!search.trim()) {
      return conversations
    }
    return conversations.filter((conversation) =>
      conversation.partnerName?.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, conversations])

  return (
    <aside className="w-80 border-r border-border/50 bg-card flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-9 bg-background"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-4 text-sm text-muted-foreground">Loading conversations...</div>
        )}

        {!loading && !filteredConversations.length && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No conversations yet. Start chatting with your matches!
          </div>
        )}

        {filteredConversations.map((conversation) => {
          const timestamp = conversation.lastMessageAt
            ? formatDistanceToNow(new Date(conversation.lastMessageAt), { addSuffix: true })
            : ""

          return (
            <button
              key={conversation.partnerId}
              className={`w-full text-left p-4 transition flex gap-3 hover:bg-background ${
                selectedPartnerId === conversation.partnerId ? "bg-background border-l-2 border-foreground" : ""
              }`}
              onClick={() => onSelect(conversation)}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.partnerAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-foreground text-background">
                    {conversation.partnerName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">{conversation.partnerName || "Unknown"}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage || "Start the conversation"}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2 bg-foreground text-background border-0 text-xs px-1.5 py-0">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
