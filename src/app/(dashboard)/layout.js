import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4.5rem)] bg-[#F2E8DA] dark:bg-[#23150E]">
      <DashboardSidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
