"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard/scores", icon: "edit_note", label: "Score Entry" },
  { href: "/dashboard/charity", icon: "volunteer_activism", label: "My ParBase" },
  { href: "/dashboard/draws", icon: "military_tech", label: "Draw Results" },
  { href: "/dashboard/winnings", icon: "emoji_events", label: "Winnings" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface-container/80 backdrop-blur-xl border-r border-outline-variant/20 hidden lg:flex flex-col py-6 z-40 w-20 hover:w-64 transition-all duration-300 overflow-hidden group">
      <div className="px-6 mb-8 mt-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
        <Link href="/" className="text-xl font-extrabold text-primary font-headline mb-1 hover:text-primary-dim transition-colors block">ParBase Hub</Link>
        <div className="text-[10px] text-on-surface-variant font-black tracking-widest uppercase">
          The Electric Pulse
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all whitespace-nowrap overflow-hidden ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high hover:translate-x-1"
              }`}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {link.icon}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-6 border-t border-outline-variant/20 whitespace-nowrap">
        <Link
          href="#"
          className="flex items-center gap-4 px-3 py-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
        >
          <span className="material-symbols-outlined text-[22px] shrink-0">help</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Support</span>
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-4 px-3 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 transition-all"
        >
          <span className="material-symbols-outlined text-[22px] shrink-0">logout</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
