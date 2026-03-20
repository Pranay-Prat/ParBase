"use client";

import { motion } from "framer-motion";

type AnimatedBackgroundProps = {
  variant?: "hero" | "page" | "subtle";
  className?: string;
};

export function AnimatedBackground({
  variant = "page",
  className = "",
}: AnimatedBackgroundProps) {
  if (variant === "hero") {
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
        {/* Large floating orbs */}
        <motion.div
          className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[100px]"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-tertiary/4 blur-[150px]"
          animate={{
            x: ["-50%", "-45%", "-55%", "-50%"],
            opacity: [0.4, 0.6, 0.3, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dot grid overlay for texture */}
        <div className="absolute inset-0 dot-grid opacity-30" />

        {/* Subtle radial gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-surface to-surface-variant" />
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
        <motion.div
          className="absolute top-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-primary/6 blur-[100px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[80px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 dot-grid opacity-15" />
      </div>
    );
  }

  // subtle variant
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-[20%] right-[30%] w-[250px] h-[250px] rounded-full bg-primary/4 blur-[80px]"
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 dot-grid opacity-10" />
    </div>
  );
}
