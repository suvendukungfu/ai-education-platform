"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { completeOnboarding, getCurrentUser } from "@/lib/auth/auth-helpers"
import { toast } from "sonner"

const SKILLS_KNOWN = [
  "Python",
  "JavaScript",
  "Java",
  "React",
  "Node.js",
  "SQL",
  "Git",
  "TypeScript",
  "C++",
  "DSA",
  "Photography",
  "UI/UX Design",
  "Machine Learning",
  "Web Development",
]

const SKILLS_LEARNING = [
  "Python",
  "JavaScript",
  "React",
  "DSA",
  "Machine Learning",
  "UI/UX Design",
  "Photography",
  "Web Development",
  "Mobile Development",
  "DevOps",
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [skillsKnown, setSkillsKnown] = useState<string[]>([])
  const [skillsLearning, setSkillsLearning] = useState<string[]>([])
  const [learningGoals, setLearningGoals] = useState("")
  const [customSkillKnown, setCustomSkillKnown] = useState("")
  const [customSkillLearning, setCustomSkillLearning] = useState("")
  const [loading, setLoading] = useState(false)

  const toggleSelection = (item: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item))
    } else {
      setter([...list, item])
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-lg border border-border/50 p-8 shadow-sm">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {step} of 3</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>

          {/* Step 1: Skills You Know */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Skills You Know</h2>
                <p className="text-muted-foreground">
                  Select the skills you're proficient in and can help others with
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {SKILLS_KNOWN.map((skill) => (
                    <Badge
                      key={skill}
                      variant={skillsKnown.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-foreground/10"
                      onClick={() => toggleSelection(skill, skillsKnown, setSkillsKnown)}
                    >
                      {skill}
                      {skillsKnown.includes(skill) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom skill..."
                    className="bg-background"
                    value={customSkillKnown}
                    onChange={(e) => setCustomSkillKnown(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customSkillKnown.trim()) {
                        e.preventDefault()
                        if (!skillsKnown.includes(customSkillKnown.trim())) {
                          setSkillsKnown([...skillsKnown, customSkillKnown.trim()])
                          setCustomSkillKnown("")
                        }
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => {
                      if (customSkillKnown.trim() && !skillsKnown.includes(customSkillKnown.trim())) {
                        setSkillsKnown([...skillsKnown, customSkillKnown.trim()])
                        setCustomSkillKnown("")
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills You Want to Learn */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Skills You Want to Learn</h2>
                <p className="text-muted-foreground">
                  Select the skills you want to learn and find mentors for
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {SKILLS_LEARNING.map((skill) => (
                    <Badge
                      key={skill}
                      variant={skillsLearning.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-foreground/10"
                      onClick={() => toggleSelection(skill, skillsLearning, setSkillsLearning)}
                    >
                      {skill}
                      {skillsLearning.includes(skill) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom skill..."
                    className="bg-background"
                    value={customSkillLearning}
                    onChange={(e) => setCustomSkillLearning(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customSkillLearning.trim()) {
                        e.preventDefault()
                        if (!skillsLearning.includes(customSkillLearning.trim())) {
                          setSkillsLearning([...skillsLearning, customSkillLearning.trim()])
                          setCustomSkillLearning("")
                        }
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => {
                      if (customSkillLearning.trim() && !skillsLearning.includes(customSkillLearning.trim())) {
                        setSkillsLearning([...skillsLearning, customSkillLearning.trim()])
                        setCustomSkillLearning("")
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Learning Goals</h2>
                <p className="text-muted-foreground">
                  Share your learning objectives (e.g., "Learn React by Feb", "Improve DSA fundamentals")
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Learning Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="E.g., Learn React by Feb, Improve DSA fundamentals, Master Python..."
                    className="bg-background min-h-32"
                    value={learningGoals}
                    onChange={(e) => setLearningGoals(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1 || loading}>
              Back
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => {
                  if (step === 1 && skillsKnown.length === 0) {
                    toast.error("Please select at least one skill you know")
                    return
                  }
                  if (step === 2 && skillsLearning.length === 0) {
                    toast.error("Please select at least one skill you want to learn")
                    return
                  }
                  setStep(step + 1)
                }}
                disabled={loading}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  if (!learningGoals.trim()) {
                    toast.error("Please enter your learning goals")
                    return
                  }

                  setLoading(true)
                  try {
                    const user = await getCurrentUser()
                    if (!user) {
                      toast.error("Please sign in first")
                      router.push("/login")
                      return
                    }

                    await completeOnboarding(user.id, skillsKnown, skillsLearning, learningGoals)
                    toast.success("Onboarding complete! Welcome to SkillLink!")
                    router.push("/dashboard")
                    router.refresh()
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Failed to complete onboarding")
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
