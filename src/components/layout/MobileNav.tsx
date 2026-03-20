"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileLinks = [
  { href: "/dashboard", icon: "dashboard", label: "Home" },
  { href: "/dashboard/scores", icon: "edit_note", label: "Scores" },
  { href: "/dashboard/charity", icon: "volunteer_activism", label: "Impact" },
  { href: "/dashboard/draws", icon: "military_tech", label: "Results" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center py-3 z-50">
      {mobileLinks.map((link, i) => {
        const active = pathname === link.href;
        // Center item (index 2) gets the floating CTA style
        if (i === 2) {
          return (
            <div key={link.href} className="relative -top-5">
              <Link
                href="/dashboard/scores"
                className="w-14 h-14 rounded-full bg-secondary text-white shadow-lg shadow-secondary/40 flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </Link>
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
