"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const links = [
  { href: "/admin", label: "Overview", icon: "monitoring" },
  { href: "/admin/users", label: "Users & Scores", icon: "group" },
  { href: "/admin/draws", label: "Draw Management", icon: "casino" },
  { href: "/admin/charities", label: "Charities", icon: "volunteer_activism" },
  { href: "/admin/winners", label: "Verifications", icon: "verified_user" },
];

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface hero-pattern flex">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container/50 glass-panel border-r border-outline-variant/20 py-8 hidden lg:flex flex-col z-40">
        <div className="px-6 mb-10 mt-16 lg:mt-0">
          <Link href="/" className="text-xl font-extrabold text-primary mb-1 italic hover:text-primary-dim transition-colors block">ParBase Admin</Link>
          <div className="text-xs text-on-surface-variant font-medium tracking-widest uppercase">System Control</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high hover:translate-x-1"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {link.icon}
                </span>
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto pt-6 border-t border-outline-variant/20">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface transition-all text-sm rounded-xl hover:bg-surface-container-high">
            <span className="material-symbols-outlined">exit_to_app</span>
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Admin Mobile Nav (Simplified) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-variant/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center px-4 py-3 z-50">
        {links.slice(0, 4).map((link) => {
           const isActive = pathname === link.href;
           return (
            <Link key={link.href} href={link.href} className={`flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-on-surface-variant"}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
              <span className="text-[10px] font-bold">{link.label.split(' ')[0]}</span>
            </Link>
           )
        })}
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 relative">
        <header className="fixed top-0 right-0 p-4 lg:p-6 z-50 flex justify-between lg:justify-end w-full lg:w-auto pointer-events-none">
           <Link href="/" className="lg:hidden pointer-events-auto text-xl font-extrabold text-primary italic pl-2 pt-2">ParBase Admin</Link>
          <div className="pointer-events-auto bg-surface/50 backdrop-blur rounded-full p-1 shadow-sm border border-outline-variant/20">
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-7xl mx-auto pb-24 lg:pb-12 mt-12 lg:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
