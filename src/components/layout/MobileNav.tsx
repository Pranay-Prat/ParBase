"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileLinks = [
  { href: "/dashboard", icon: "dashboard", label: "Home" },
  { href: "/dashboard/draws", icon: "military_tech", label: "Draws" },
  { href: "/dashboard/charity", icon: "volunteer_activism", label: "Impact" },
  { href: "/dashboard/winnings", icon: "emoji_events", label: "Wins" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center py-3 z-50">
      {mobileLinks.map((link, i) => {
        const active = pathname === link.href;
        // Center item (index 2) gets the floating CTA style — quick "Add Score"
        if (i === 2) {
          return (
            <div key="fab" className="relative -top-5 flex flex-col items-center">
              <Link
                href="/dashboard/scores"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary shadow-lg shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </Link>
              <span className="text-[9px] font-bold text-on-surface-variant mt-1">Score</span>
            </div>
          );
        }
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 ${
              active ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span className="text-[10px] font-bold">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
