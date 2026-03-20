import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative">
        {/* Top header area for mobile (and theme toggle on desktop) */}
        <header className="fixed top-0 right-0 p-4 lg:p-6 z-50 flex justify-end w-full lg:w-auto pointer-events-none">
          <div className="pointer-events-auto bg-surface/50 backdrop-blur rounded-full p-1 shadow-sm border border-outline-variant/20">
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-7xl mx-auto pb-24 lg:pb-12">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
