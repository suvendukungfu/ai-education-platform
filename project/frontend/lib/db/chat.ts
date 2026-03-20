import { createClient } from '@/lib/supabase/client'

export type ConversationSummary = {
  partnerId: string
  partnerName: string | null
  partnerAvatar?: string | null
  lastMessage: string | null
  lastMessageAt: string | null
  unreadCount: number
}

export type ChatMessage = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read: boolean
  isSender: boolean
}

export async function getConversations(limit = 30): Promise<ConversationSummary[]> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('id, sender_id, receiver_id, content, created_at, read')
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false })
    .limit(limit * 10)

  if (error || !messages) {
    console.error('Error fetching conversations:', error)
    return []
  }

  const conversationMap = new Map<string, ConversationSummary>()

  for (const message of messages as ChatMessage[]) {
    const partnerId = message.sender_id === user.id ? message.receiver_id : message.sender_id
    const summary = conversationMap.get(partnerId)

    const previousTime = summary?.lastMessageAt ? new Date(summary.lastMessageAt).getTime() : -Infinity
    const messageTime = new Date(message.created_at).getTime()
    const isNewer = messageTime > previousTime

    conversationMap.set(partnerId, {
      partnerId,
      partnerName: summary?.partnerName ?? null,
      partnerAvatar: summary?.partnerAvatar,
      lastMessage: isNewer ? message.content : summary?.lastMessage ?? null,
      lastMessageAt: isNewer ? message.created_at : summary?.lastMessageAt ?? message.created_at,
      unreadCount:
        (summary?.unreadCount ?? 0) + (message.receiver_id === user.id && !message.read ? 1 : 0),
    })
  }

  const partnerIds = Array.from(conversationMap.keys())

  if (partnerIds.length) {
    const { data: profiles } = await supabase
      .from('users')
      .select('id, name, avatar')
      .in('id', partnerIds)

    profiles?.forEach((profile) => {
      const entry = conversationMap.get(profile.id)
      if (entry) {
        conversationMap.set(profile.id, {
          ...entry,
          partnerName: profile.name,
          partnerAvatar: profile.avatar,
        })
      }
    })
  }

  return Array.from(conversationMap.values()).sort((a, b) => {
    const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0
    const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0
    return bTime - aTime
  })
}

export async function getMessagesWithUser(partnerId: string): Promise<ChatMessage[]> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.error('Error fetching messages:', error)
    return []
  }

  await supabase
    .from('messages')
    .update({ read: true })
    .eq('sender_id', partnerId)
    .eq('receiver_id', user.id)
    .eq('read', false)

  return (data as ChatMessage[]).map((message) => ({
    ...message,
    isSender: message.sender_id === user.id,
  }))
}

export async function sendMessage(partnerId: string, content: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in to send messages.')
  }

  const { error } = await supabase.from('messages').insert({
    sender_id: user.id,
    receiver_id: partnerId,
    content,
    attachments: [],
    read: false,
  })

  if (error) {
    console.error('Error sending message:', error)
    throw new Error(error.message || 'Unable to send message right now.')
  }
}
