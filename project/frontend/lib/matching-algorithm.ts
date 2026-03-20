// TF-IDF Based Matching Algorithm for SkillLink

interface UserProfile {
  id: string
  courses: string[]
  skills: string[]
  learningGoals: string
}

interface MatchResult {
  userId: string
  score: number
  commonCourses: string[]
  complementarySkills: string[]
}

/**
 * Calculate TF (Term Frequency) for a term in a document
 */
function calculateTF(term: string, document: string[]): number {
  const termCount = document.filter((t) => t.toLowerCase() === term.toLowerCase()).length
  return termCount / document.length
}

/**
 * Calculate IDF (Inverse Document Frequency) for a term across all documents
 */
function calculateIDF(term: string, allDocuments: string[][]): number {
  const documentsWithTerm = allDocuments.filter((doc) => doc.some((t) => t.toLowerCase() === term.toLowerCase())).length
  return Math.log(allDocuments.length / (1 + documentsWithTerm))
}

/**
 * Calculate TF-IDF score for a term
 */
function calculateTFIDF(term: string, document: string[], allDocuments: string[][]): number {
  const tf = calculateTF(term, document)
  const idf = calculateIDF(term, allDocuments)
  return tf * idf
}

/**
 * Create TF-IDF vector for a user profile
 */
function createTFIDFVector(userProfile: UserProfile, allProfiles: UserProfile[], allTerms: string[]): number[] {
  const userDocument = [...userProfile.courses, ...userProfile.skills]
  const allDocuments = allProfiles.map((p) => [...p.courses, ...p.skills])

  return allTerms.map((term) => calculateTFIDF(term, userDocument, allDocuments))
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0)
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

  if (magnitudeA === 0 || magnitudeB === 0) return 0
  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Find complementary skills between two users
 */
function findComplementarySkills(userA: UserProfile, userB: UserProfile): string[] {
  const userASkills = new Set(userA.skills.map((s) => s.toLowerCase()))
  const userBSkills = new Set(userB.skills.map((s) => s.toLowerCase()))

  const complementary: string[] = []

  // Skills userB has that userA doesn't
  userB.skills.forEach((skill) => {
    if (!userASkills.has(skill.toLowerCase())) {
      complementary.push(skill)
    }
  })

  return complementary
}

/**
 * Find common courses between two users
 */
function findCommonCourses(userA: UserProfile, userB: UserProfile): string[] {
  const userACourses = new Set(userA.courses.map((c) => c.toLowerCase()))
  return userB.courses.filter((course) => userACourses.has(course.toLowerCase()))
}

/**
 * Main matching algorithm: Find top matches for a user using TF-IDF
 */
export function findMatches(currentUser: UserProfile, allUsers: UserProfile[], limit = 10): MatchResult[] {
  // Filter out the current user
  const otherUsers = allUsers.filter((user) => user.id !== currentUser.id)

  // Get all unique terms (courses and skills)
  const allTerms = Array.from(new Set([...allUsers.flatMap((u) => [...u.courses, ...u.skills])]))

  // Create TF-IDF vector for current user
  const currentUserVector = createTFIDFVector(currentUser, allUsers, allTerms)

  // Calculate similarity scores for all other users
  const matches: MatchResult[] = otherUsers.map((user) => {
    const userVector = createTFIDFVector(user, allUsers, allTerms)
    const similarity = cosineSimilarity(currentUserVector, userVector)

    // Convert to percentage and add some randomness for demo purposes
    const score = Math.round(similarity * 100)

    return {
      userId: user.id,
      score,
      commonCourses: findCommonCourses(currentUser, user),
      complementarySkills: findComplementarySkills(currentUser, user),
    }
  })

  // Sort by score descending and return top matches
  return matches.sort((a, b) => b.score - a.score).slice(0, limit)
}

/**
 * Get match explanation for UI display
 */
export function getMatchExplanation(match: MatchResult): string {
  const parts: string[] = []

  if (match.commonCourses.length > 0) {
    parts.push(`${match.commonCourses.length} common course(s)`)
  }

  if (match.complementarySkills.length > 0) {
    parts.push(`${match.complementarySkills.length} complementary skill(s)`)
  }

  return parts.join(" • ") || "Similar learning interests"
}
