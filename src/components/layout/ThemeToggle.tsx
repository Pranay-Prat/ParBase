"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high">
        <span className="material-symbols-outlined text-on-surface-variant">dark_mode</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-bright transition-colors"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-on-surface-variant">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
