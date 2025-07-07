import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "../components/app-sidebar";
import { NavActions } from "../components/nav-actions";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
