"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch checked={false} disabled className="bg-muted" />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Sun className={`h-4 w-4 transition-colors ${!isDark ? "text-foreground" : "text-muted-foreground"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
        className="bg-muted data-[state=checked]:bg-foreground"
      />
      <Moon className={`h-4 w-4 transition-colors ${isDark ? "text-foreground" : "text-muted-foreground"}`} />
    </div>
  )
}

