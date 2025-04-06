"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  React.useEffect(() => {
    if (!theme) {
      setTheme('light') // 设置默认主题为 light
    }
  }, [theme, setTheme])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full hover:bg-purple-200 dark:hover:bg-purple-900"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
        dark:-rotate-90 dark:scale-0 text-purple-600 dark:text-purple-400" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all
        dark:-rotate-90 dark:scale-100 text-purple-600 dark:text-purple-400" />
    </Button>
  )
}
