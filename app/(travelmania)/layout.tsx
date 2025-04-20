"use client";

import { MainNav } from "@/components/main-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const profile = "/assets/profile.png"; // Placeholder for profile image

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/auth/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");
    // Redirect to login
    router.push("/auth/signin");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

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
            <SidebarFooter
              onClick={handleLogout}
              className="mt-auto pt-2 cursor-pointer"
            >
              <div className="text-destructive flex items-center ">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </div>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex-1 overflow-x-hidden flex flex-col min-h-screen">
          <header className="border-b bg-slate-50 px-6 py-3 w-full flex items-center justify-between">
            <h1 className="text-lg font-medium "></h1>
            <Link href="/home/setting">
            <div className="relative w-10">

              <Avatar className="h-5 w-5">
                <AvatarImage src={profile} alt="Profile" />
              </Avatar>
            </div>
            </Link>
          </header>
          <main className="px-6 flex-1">{children}</main>
          <footer className=" mt-5 bg-slate-50 border-t py-4 px-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Travel Mania. All rights reserved.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
