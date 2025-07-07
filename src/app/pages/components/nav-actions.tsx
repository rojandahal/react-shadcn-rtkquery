"use client"
import { NavUser } from "./nav-user"
import { ThemeToggle } from "./theme-toggle"

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <ThemeToggle />
      <NavUser />
    </div>
  )
}
