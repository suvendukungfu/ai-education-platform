"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, X } from "lucide-react"
import { createPost } from "@/lib/db/posts"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const SUGGESTED_TAGS = ["React", "Algorithms", "Python", "Web Dev", "Help Needed", "Study Group"]

export function CreatePost() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('name, avatar')
          .eq('id', user.id)
          .single()
        setUser({ ...user, ...profile })
      }
    }
    loadUser()
  }, [])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handlePost = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content')
      return
    }

    setLoading(true)
    try {
      await createPost(content, selectedTags, isAnonymous)
      toast.success('Post created!')
      setContent('')
      setSelectedTags([])
      setIsAnonymous(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border/50">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} />
            <AvatarFallback className="bg-foreground text-background">
              {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts, ask questions, or find study partners..."
              className="min-h-24 bg-background border-border resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              <div className="flex items-center gap-2">
                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Post anonymously
                </Label>
              </div>
            </div>
            <Button onClick={handlePost} disabled={loading || !content.trim()}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
