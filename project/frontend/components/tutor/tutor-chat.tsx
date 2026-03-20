"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, User, GraduationCap, Link as LinkIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Message = {
  id: string
  role: "user" | "ai"
  content: string
  sources?: string[]
  thinking?: string
  timestamp: Date
}

export function TutorChat({ courseId }: { courseId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: `Hello! I'm your AI Tutor for this course. I've analyzed the materials you've uploaded. How can I help you today?`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [thinking, setThinking] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setThinking("Consulting coarse materials...")

    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: courseId,
          question: input
        })
      })

      if (!response.ok) throw new Error("AI Tutor is currently busy.")

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.answer,
        sources: data.sources,
        thinking: data.thinking,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: "error",
        role: "ai",
        content: `Error: ${error.message}. Please make sure the AI Engine is running.`,
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
      setThinking(null)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Tutor</h3>
            <Badge variant="outline" className="text-[10px] text-primary border-primary/20 bg-primary/5">RAG Active</Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className={msg.role === "user" ? "bg-accent" : "bg-primary"}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-primary-foreground" />}
              </AvatarFallback>
            </Avatar>
            <div className={`space-y-2 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-muted/50 border border-border/40 rounded-tl-none"
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.sources.map(source => (
                    <Badge key={source} variant="outline" className="text-[10px] py-0 bg-background flex items-center gap-1">
                      <LinkIcon className="w-2 h-2" />
                      {source}
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-[10px] text-muted-foreground px-1 opacity-50">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {thinking && (
          <div className="flex gap-4">
            <Avatar className="w-8 h-8 animate-pulse text-primary-foreground bg-primary">
              <AvatarFallback className="bg-primary">
                <Sparkles className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted/30 border border-border/40 p-3 rounded-2xl rounded-tl-none flex items-center gap-3">
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground italic">{thinking}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-muted/10">
        <div className="flex gap-2">
          <Input 
            placeholder="Ask anything about the course materials..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            className="flex-1 bg-background"
          />
          <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
          AI Tutor can make mistakes. Verify important information with your instructor.
        </p>
      </div>
    </div>
  )
}
