import { createClient } from '@/lib/supabase/client'

/**
 * Get feed posts
 */
export async function getFeedPosts(limit = 20) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('feed_posts')
    .select(`
      *,
      author:users!feed_posts_author_id_fkey(id, name, avatar)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

/**
 * Create a new post
 */
export async function createPost(content: string, tags: string[] = [], isAnonymous = false) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('feed_posts')
    .insert({
      author_id: user.id,
      content,
      tags,
      is_anonymous: isAnonymous,
      images: [],
      likes_count: 0,
      comments_count: 0,
      post_type: 'normal',
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Like a post
 */
export async function likePost(postId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    // Unlike
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id)
    return false
  } else {
    // Like
    await supabase
      .from('post_likes')
      .insert({
        post_id: postId,
        user_id: user.id,
      })
    return true
  }
}

