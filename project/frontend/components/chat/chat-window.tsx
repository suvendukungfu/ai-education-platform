"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Calendar, MoreVertical, Video } from "lucide-react"
import { ConversationSummary, ChatMessage, getMessagesWithUser, sendMessage } from "@/lib/db/chat"
import { toast } from "sonner"

type ChatWindowProps = {
  conversation?: ConversationSummary | null
  onMessageSent?: () => void
}

export function ChatWindow({ conversation, onMessageSent }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const loadMessages = useCallback(async () => {
    if (!conversation) {
      setMessages([])
      return
    }
    setLoading(true)
    try {
      const data = await getMessagesWithUser(conversation.partnerId)
      setMessages(data)
    } catch (error) {
      console.error("Failed to load messages", error)
      toast.error("Unable to load conversation")
    } finally {
      setLoading(false)
    }
  }, [conversation])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!conversation || !message.trim()) {
      return
    }

    try {
      setSending(true)
      await sendMessage(conversation.partnerId, message.trim())
      setMessage("")
      await loadMessages()
      onMessageSent?.()
    } catch (error: any) {
      toast.error(error?.message || "Failed to send message")
    } finally {
      setSending(false)
    }
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card border-l border-border/50">
        <p className="text-muted-foreground">Select a conversation to start chatting.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border/50 bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={conversation.partnerAvatar || "/placeholder.svg?height=40&width=40"} />
            <AvatarFallback className="bg-foreground text-background">
              {conversation.partnerName
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{conversation.partnerName || "Unknown"}</h3>
            <p className="text-xs text-muted-foreground">Last active {conversation.lastMessageAt ? new Date(conversation.lastMessageAt).toLocaleString() : "recently"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/40">
        {loading && <p className="text-sm text-muted-foreground">Loading messages…</p>}

        {!loading && !messages.length && (
          <p className="text-sm text-muted-foreground">Say hi to start the conversation.</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.isSender ? "flex-row-reverse" : ""}`}>
            {!msg.isSender && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={conversation.partnerAvatar || "/placeholder.svg?height=32&width=32"} />
                <AvatarFallback className="bg-foreground text-background text-xs">
                  {conversation.partnerName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "?"}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-md flex flex-col gap-1 ${msg.isSender ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.isSender ? "bg-foreground text-background" : "bg-card border border-border/40"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-border/50 bg-card">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                handleSend()
              }
            }}
            disabled={sending}
            className="flex-1 bg-background"
          />
          <Button size="icon" onClick={handleSend} disabled={sending || !message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
