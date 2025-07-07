"use client";

import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarMenu className="mt-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            className={cn(
              "text-xl text-gray-700 dark:text-gray-50 p-4",
              item.isActive ? "text-blue-600 dark:text-blue-600" : ""
            )}
          >
            <Link
              to={item.url}
              className="mt-1.5 mb-1.5"
              style={{ padding: "20px" }}
            >
              <item.icon
                className={cn(
                  "text-xl text-gray-700 dark:text-gray-50 nav-icons",
                  item.isActive ? "text-blue-600 dark:text-blue-600" : ""
                )}
              />
              <span
                className={cn(
                  "text-xl text-gray-700 dark:text-gray-50",
                  item.isActive ? "text-blue-600 dark:text-blue-600" : ""
                )}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
