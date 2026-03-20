"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PlatformAnalytics() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="h-64 bg-background rounded-lg border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">User Growth Chart</p>
                <p className="text-xs text-subtle">Visualization showing user registration trends over time</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Students</p>
                <p className="text-2xl font-bold">2,156</p>
                <p className="text-xs text-accent">+15% this month</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Faculty</p>
                <p className="text-2xl font-bold">284</p>
                <p className="text-xs text-accent">+8% this month</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Active Today</p>
                <p className="text-2xl font-bold">892</p>
                <p className="text-xs text-accent">36% of total</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="h-64 bg-background rounded-lg border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Sessions Analytics</p>
                <p className="text-xs text-subtle">Session completion rates and duration metrics</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-accent">+124 this week</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Avg Duration</p>
                <p className="text-2xl font-bold">58 min</p>
                <p className="text-xs text-subtle">Optimal length</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-xs text-accent">+2% improvement</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="h-64 bg-background rounded-lg border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Matching Performance</p>
                <p className="text-xs text-subtle">Match acceptance rates and algorithm effectiveness</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Matches Created</p>
                <p className="text-2xl font-bold">3,842</p>
                <p className="text-xs text-accent">+18% this month</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Accept Rate</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-accent">Excellent</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Avg Match Score</p>
                <p className="text-2xl font-bold">82%</p>
                <p className="text-xs text-subtle">Algorithm accuracy</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="h-64 bg-background rounded-lg border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">User Engagement Metrics</p>
                <p className="text-xs text-subtle">Daily active users and feature usage statistics</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">DAU</p>
                <p className="text-2xl font-bold">892</p>
                <p className="text-xs text-accent">36% of users</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Avg Session Time</p>
                <p className="text-2xl font-bold">24 min</p>
                <p className="text-xs text-accent">+4 min increase</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
                <p className="text-2xl font-bold">76%</p>
                <p className="text-xs text-accent">30-day retention</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
