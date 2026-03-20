import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative bg-surface hero-pattern min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 lg:ml-20 relative w-full overflow-x-hidden">
        <main className="p-6 md:p-10 max-w-7xl mx-auto pb-24 lg:pb-12">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
