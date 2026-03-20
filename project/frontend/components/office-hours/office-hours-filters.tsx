"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Batch } from "@/lib/types"

export function OfficeHoursFilters({ onBatchChange }: { onBatchChange: (batch: Batch | null) => void }) {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [userBatch, setUserBatch] = useState<Batch | null>(null)

  useEffect(() => {
    async function loadUserBatch() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('batch')
          .eq('id', user.id)
          .single()
        
        if (profile?.batch) {
          setUserBatch(profile.batch as Batch)
          setSelectedBatch(profile.batch as Batch)
          onBatchChange(profile.batch as Batch)
        }
      }
    }
    loadUserBatch()
  }, [onBatchChange])

  const handleBatchChange = (batch: string) => {
    const batchValue = batch === '2028' || batch === '2029' ? batch as Batch : null
    setSelectedBatch(batchValue)
    onBatchChange(batchValue)
  }

  return (
    <Card className="bg-card border-border/50 sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">
            Batch <span className="text-destructive">*</span>
          </Label>
          <Select value={selectedBatch || ''} onValueChange={handleBatchChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select your batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2028">2028</SelectItem>
              <SelectItem value="2029">2029</SelectItem>
            </SelectContent>
          </Select>
          {!selectedBatch && (
            <div className="flex items-start gap-2 p-2 bg-muted rounded text-xs text-muted-foreground">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Batch selection is required to view office hours</span>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Department</Label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Course</Label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="cs101">CS 101</SelectItem>
              <SelectItem value="cs201">CS 201</SelectItem>
              <SelectItem value="cs301">CS 301</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Availability</Label>
          <div className="space-y-2">
            {["Today", "This Week", "Next Week"].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox id={time} />
                <label htmlFor={time} className="text-sm text-muted-foreground cursor-pointer">
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Meeting Type</Label>
          <div className="space-y-2">
            {["Virtual", "In-Person"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
