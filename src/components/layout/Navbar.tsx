"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/charities", label: "Charities" },
  { href: "/dashboard/draws", label: "Draws" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full flex justify-between items-center px-4 sm:px-6 py-4 z-50 glass-panel ambient-shadow">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="text-xl sm:text-2xl font-black italic tracking-tighter text-primary font-headline">
            Impact Golf
          </Link>
          <nav className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/subscribe"
            className="hidden sm:block bg-primary-container text-on-primary-container px-5 py-2 rounded-xl font-bold hover:scale-95 active:scale-90 transition-transform text-sm"
          >
            Subscribe
          </Link>
          <Link
            href="/auth/login"
            className="hidden sm:block text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
          >
            Login
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] z-40 glass-panel p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 rounded-xl font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-surface-bright text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/subscribe"
                onClick={() => setMobileOpen(false)}
                className="bg-primary-container text-on-primary-container px-5 py-3 rounded-xl font-bold text-center"
              >
                Subscribe
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="text-on-surface-variant hover:text-primary font-medium text-center py-2"
              >
                Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
