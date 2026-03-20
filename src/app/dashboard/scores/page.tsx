"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ScoreEntryPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [points, setPoints] = useState("");
  const [playedAt, setPlayedAt] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await fetch("/api/scores");
      if (res.ok) {
        const data = await res.json();
        setScores(data.scores);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: parseInt(points), playedAt }),
      });
      if (res.ok) {
        setPoints("");
        setPlayedAt("");
        fetchScores();
      } else {
        alert("Failed to add score");
      }
    } catch (e) {
      alert("Error adding score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto space-y-12">
      {/* Hero Header */}
      <motion.header variants={fadeInUp} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
          Submit Your <span className="text-secondary italic">Score.</span>
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg">
          Record your performance and fuel the movement. Every point contributes to our collective goal.
        </p>
      </motion.header>

      {/* Score Entry Bento Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Entry Form Card */}
        <div className="lg:col-span-7 bg-surface-container rounded-2xl p-8 ghost-border shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">Points</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    required
                    placeholder="36"
                    className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-6 py-4 text-3xl font-black text-primary focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all font-headline"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">pts</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wider text-on-surface-variant uppercase font-body">Date</label>
                <input
                  type="date"
                  required
                  value={playedAt}
                  onChange={(e) => setPlayedAt(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-6 py-4 text-lg font-medium text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-black text-lg py-5 rounded-xl ambient-shadow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                {loading ? "Adding..." : "Add Score"}
              </button>
              <button
                type="reset"
                className="px-8 py-5 border-2 border-outline-variant/20 text-on-surface-variant font-bold rounded-xl hover:bg-surface-variant/40 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Info Module */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-high p-8 rounded-2xl ghost-border flex-1 flex flex-col justify-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary">info</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-3">Stored 5 Policy</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Only your latest <span className="text-on-surface font-bold">5 scores</span> are stored in the kinetic vault. 
              Adding a new performance automatically replaces the oldest entry to maintain an active pulse of your play.
            </p>
          </div>
        </div>
      </motion.section>

      {/* History List Section */}
      <motion.section variants={fadeInUp} className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-2xl font-black font-headline tracking-tight">Recent Pulse</h2>
            <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold mt-1">The Stored 5 History</p>
          </div>
        </div>
        <div className="space-y-3">
          {scores.length === 0 ? (
            <div className="text-on-surface-variant text-center py-8 bg-surface-container rounded-2xl ghost-border">
              No scores recorded yet. Time to hit the course!
            </div>
          ) : (
            scores.map((score, i) => {
              const isNewest = i === 0;
              return (
                <div key={score.id} className={`group ${isNewest ? "bg-surface-container-highest" : "bg-surface-container-low"} hover:bg-surface-variant transition-colors rounded-2xl p-6 flex items-center justify-between ghost-border`}>
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-xl ${isNewest ? "bg-primary/10 border border-primary/20" : "bg-surface-container-highest border border-outline-variant/20"} flex items-center justify-center`}>
                      <span className={`text-2xl font-black font-headline tracking-tighter ${isNewest ? "text-primary" : "text-on-surface"}`}>
                        {score.score}
                      </span>
                    </div>
                    <div>
                      <div className="text-on-surface font-bold text-lg">Stableford Points</div>
                      <div className="text-on-surface-variant text-sm mt-1">{new Date(score.playedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {isNewest && (
                      <span className="hidden md:inline px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest cursor-default">
                        Newest
                      </span>
                    )}
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
