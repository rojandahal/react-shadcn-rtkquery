import {
  Home,
  Settings,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Branding } from "./branding";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
        isActive: false,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "settings",
        icon: Settings,
        isActive: false,
      },
    ],
  };

  return (
    <Sidebar className="border-r-0 bg-[var(--sidebar)] text-[var(--sidebar-foreground)]" {...props}>
      <SidebarHeader className="mt-2">
        <Branding />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
