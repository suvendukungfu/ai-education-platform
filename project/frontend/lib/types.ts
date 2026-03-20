export type UserRole = "student" | "faculty" | "admin"
export type Batch = "2028" | "2029"
export type SessionMode = "online" | "offline"
export type PostType = "normal" | "club" | "event"
export type CommunityTopic = "dsa" | "web-dev" | "ui-ux" | "maths" | "placement-prep"
export type RoadmapStage = "beginner" | "intermediate" | "advanced"

export interface User {
  id: string
  email: string
  name: string
  batch?: Batch // Required for students, optional for faculty/admin
  role: UserRole
  skills_known: string[]
  skills_learning: string[]
  goals?: string
  skillPoints: number
  streak: number
  verified: boolean
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  name: string
  code: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category?: string
}

export interface Match {
  id: string
  userId: string
  matchedUserId: string
  score: number
  mutualSkills: string[] // Skills both users know
  complementarySkills: string[] // Skills one has that other wants
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

export interface Session {
  id: string
  mentorId: string
  learnerId: string
  skill: string
  scheduledAt: Date
  duration: number // in minutes
  mode: SessionMode
  status: "scheduled" | "completed" | "cancelled"
  meetingLink?: string
  location?: string
  rating?: number // 1-5 stars
  review?: string
  createdAt: Date
}

export interface FeedPost {
  id: string
  authorId: string
  content: string
  isAnonymous: boolean
  tags: string[]
  images: string[]
  likesCount: number
  commentsCount: number
  postType: PostType
  clubId?: string // For club posts
  eventVenue?: string // For event posts
  eventTime?: Date // For event posts
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  isAnonymous: boolean
  likes: number
  createdAt: Date
}

export interface FacultySlot {
  id: string
  facultyId: string
  batch: Batch // MANDATORY: 2028 or 2029
  topic: string
  subject: string
  scheduledAt: Date
  duration: number // in minutes
  capacity: number
  bookedCount: number
  mode: SessionMode
  meetingLink?: string
  location?: string
  createdAt: Date
}

export interface SlotBooking {
  id: string
  slotId: string
  studentId: string
  status: "confirmed" | "cancelled"
  createdAt: Date
}

export interface Roadmap {
  id: string
  userId: string
  skill: string
  stages: RoadmapStageData[]
  createdAt: Date
  updatedAt: Date
}

export interface RoadmapStageData {
  id: string
  stageName: RoadmapStage
  title: string
  description?: string
  youtubeLinks: string[]
  leetcodeProblems: string[] // LeetCode problem IDs or URLs
  githubLinks: string[]
  docsLinks: string[]
  practiceTasks: string[]
  miniProjects: string[]
  completed: boolean
  completedAt?: Date
  order: number
}

export interface Community {
  id: string
  name: string
  slug: string
  description: string
  topic: CommunityTopic
  createdAt: Date
}

export interface CommunityThread {
  id: string
  communityId: string
  authorId: string
  title: string
  content: string
  upvotes: number
  downvotes: number
  commentsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ThreadComment {
  id: string
  threadId: string
  authorId: string
  content: string
  upvotes: number
  downvotes: number
  createdAt: Date
}

export interface Club {
  id: string
  name: string
  description: string
  avatarUrl?: string
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  attachments: string[]
  read: boolean
  createdAt: Date
}

export interface Report {
  id: string
  reportedBy: string
  reportedUserId?: string
  reportedPostId?: string
  reportedThreadId?: string
  reason: string
  status: "pending" | "reviewed" | "resolved"
  createdAt: Date
}
