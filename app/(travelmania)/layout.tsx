import { MainNav } from "@/components/main-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className=" w-64 bg-slate-900 text-slate-50  [&>div]:bg-slate-900">
          <SidebarHeader className="border-b border-slate-800 px-4 py-6">
            <div className="flex items-center justify-center text-lg font-semibold">
              Travel Mania
            </div>
          </SidebarHeader>
          <SidebarContent className="flex flex-1 flex-col justify-between p-4">
            <MainNav />
            <SidebarFooter className="mt-auto pt-2"> 
              <div className="text-destructive flex items-center ">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </div>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex-1">
          <header className="border-b bg-slate-50 px-6 py-3 w-full">
            <h1 className="text-lg font-medium ">Dashboard</h1>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
