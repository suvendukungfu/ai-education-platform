"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Star, Users } from "lucide-react"
import { getMatches } from "@/lib/db/matches"

export function MatchGrid() {
  const router = useRouter()
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches(20)
        setMatches(data)
      } catch (error) {
        console.error('Error loading matches:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMatches()
  }, [])

  const handleMessage = (userId: string) => {
    router.push(`/chat?user=${userId}`)
  }

  const handleBook = (userId: string) => {
    router.push(`/sessions?book=${userId}`)
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading matches...</div>
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <Users className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">No matches found</p>
        <p className="text-sm text-muted-foreground">Complete your profile to find matches</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {matches.length} matches</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="bg-card border-border/50 hover:border-border transition">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={match.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-foreground text-background">
                    {match.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold">{match.name}</h3>
                    <Badge variant="secondary" className="bg-muted text-foreground border-0 text-xs">
                      {match.matchScore}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{match.bio || 'No bio'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {match.complementarySkills?.slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleMessage(match.id)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleBook(match.id)}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
