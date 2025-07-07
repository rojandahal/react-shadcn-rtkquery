import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";

export function Branding() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="px-1.5 w-full text-[var(--sidebar-foreground)]">
          <div>
            <Command className="size-3 text-[var(--sidebar-foreground)]" />
          </div>
          <span>Admin</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
