"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function MatchFilters() {
  return (
    <Card className="bg-surface border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Match Score</Label>
          <Slider defaultValue={[70]} max={100} step={5} className="mt-2" />
          <p className="text-xs text-muted-foreground">Minimum: 70%</p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Courses</Label>
          <div className="space-y-2">
            {["Web Development", "Data Structures", "Algorithms", "Machine Learning"].map((course) => (
              <div key={course} className="flex items-center space-x-2">
                <Checkbox id={course} />
                <label htmlFor={course} className="text-sm text-muted-foreground cursor-pointer">
                  {course}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Skills</Label>
          <div className="space-y-2">
            {["React", "Python", "Node.js", "TypeScript"].map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox id={skill} />
                <label htmlFor={skill} className="text-sm text-muted-foreground cursor-pointer">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
