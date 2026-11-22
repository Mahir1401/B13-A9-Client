import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] w-full flex-col bg-background md:flex-row">
      <DashboardSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}