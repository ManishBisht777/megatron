import DashBoardNav from "@/app/components/dashboard/sidebar";
import { dashboardConfig } from "@/app/config/dashboard";
import { getCurrentUser } from "@/app/lib/session";
import { notFound } from "next/navigation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="container grid gap-12 md:grid-cols-[200px_1fr] ">
      <aside className="hidden w-[200px] flex-col md:flex">
        {/* <DashboardNav items={dashboardConfig.sidebarNav} /> */}
        <DashBoardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
