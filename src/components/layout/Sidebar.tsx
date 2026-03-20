"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard/scores", icon: "edit_note", label: "Score Entry" },
  { href: "/dashboard/charity", icon: "volunteer_activism", label: "My Impact" },
  { href: "/dashboard/draws", icon: "military_tech", label: "Draw Results" },
  { href: "/dashboard/winnings", icon: "emoji_events", label: "Winnings" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant/20 hidden lg:flex flex-col py-8 z-40">
      <div className="px-6 mb-10 mt-16">
        <div className="text-xl font-extrabold text-primary font-headline mb-1">Impact Hub</div>
        <div className="text-xs text-on-surface-variant font-medium tracking-widest uppercase">
          The Electric Pulse
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-surface-bright text-primary border-r-4 border-primary font-bold rounded-r-none"
                  : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface hover:translate-x-1"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto pt-6 border-t border-outline-variant/20">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface transition-all"
        >
          <span className="material-symbols-outlined">help</span>
          <span>Support</span>
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
