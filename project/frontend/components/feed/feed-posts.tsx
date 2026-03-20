"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { getFeedPosts, likePost } from "@/lib/db/posts"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function FeedPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getFeedPosts(20)
        setPosts(data)
      } catch (error) {
        console.error('Error loading posts:', error)
        toast.error('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <p className="text-muted-foreground">No posts yet</p>
        <p className="text-sm text-muted-foreground">Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkLiked() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .single()

      setIsLiked(!!data)
    }
    checkLiked()
  }, [post.id])

  const handleLike = async () => {
    if (loading) return
    setLoading(true)
    try {
      const newLiked = await likePost(post.id)
      setIsLiked(newLiked)
      setLikesCount(newLiked ? likesCount + 1 : likesCount - 1)
    } catch (error) {
      toast.error('Failed to like post')
    } finally {
      setLoading(false)
    }
  }

  const authorName = post.is_anonymous ? 'Anonymous' : (post.author?.name || 'Unknown')
  const authorAvatar = post.is_anonymous ? null : (post.author?.avatar || null)
  const timestamp = post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 'Recently'

  return (
    <Card className="bg-card border-border/50">
      <CardContent className="p-6 space-y-4">
        {/* Post Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={authorAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-foreground text-background">
                {post.is_anonymous ? "A" : authorName.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{authorName}</h3>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-sm leading-relaxed">{post.content}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 ${isLiked ? "text-accent" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-accent" : ""}`} />
            <span className="text-sm">{likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">{post.comments_count || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
            <Share2 className="w-4 h-4 mr-2" />
            <span className="text-sm">Share</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-3">
              {/* Mock Comments */}
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-foreground text-background text-xs">ER</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-background rounded-lg p-3">
                    <h4 className="font-semibold text-xs mb-1">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Great explanation! I had the same confusion before.</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-3">1 hour ago</p>
                </div>
              </div>
            </div>

            {/* Add Comment */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-foreground text-background text-xs">JD</AvatarFallback>
              </Avatar>
              <Input placeholder="Write a comment..." className="flex-1 bg-background" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
