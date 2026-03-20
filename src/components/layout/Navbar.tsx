"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/charities", label: "Charities" },
  { href: "/dashboard/draws", label: "Draws" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
    setSigningOut(false);
  }

  // Hide navbar on admin routes (admin has its own layout)
  if (pathname.startsWith("/admin")) return null;

  const initials = user?.user_metadata?.first_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

  return (
    <>
      <header className="fixed top-0 w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center whitespace-nowrap">
          {/* Left Side: Navigation Links */}
          <nav className="hidden md:flex flex-1 items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body font-bold text-sm transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="flex-1 md:flex-none flex justify-start md:justify-center">
            <Link href="/" className="text-xl sm:text-2xl font-black italic tracking-tighter text-primary font-headline">
              ParBase
            </Link>
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-1 justify-end items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-2 text-on-surface hover:text-primary font-bold text-sm transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xs">
                    {initials}
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="hidden sm:flex items-center gap-1 text-on-surface-variant hover:text-error font-bold text-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:block text-on-surface hover:text-primary font-bold text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/subscribe"
                  className="hidden sm:flex items-center gap-1 bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-md"
                >
                  Subscribe
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </>
            )}
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
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="bg-primary-container text-on-primary-container px-5 py-3 rounded-xl font-bold text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleSignOut();
                    }}
                    className="text-error font-medium text-center py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
