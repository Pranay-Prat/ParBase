"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AdminDrawsPage() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRunDraw = async () => {
    if (!confirm("Are you sure you want to run the draw? This will calculate winners based on active subscriptions and scores.")) return;
    setRunning(true);
    try {
      const res = await fetch("/api/admin/draws", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "RANDOM" }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        alert(`Draw completed! ${data.winnersCount} winners found.`);
      } else {
        alert(data.error || "Failed finding winners");
      }
    } catch (e) {
      alert("Error calculating draw");
    } finally {
      setRunning(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
      <motion.header variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            Draw <span className="text-secondary italic">Management</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Configure logic, run simulations, and publish results.</p>
        </div>
          <button 
            onClick={handleRunDraw}
            disabled={running}
            className="bg-primary hover:bg-primary-dim text-on-primary font-black py-3 px-6 rounded-xl transition-colors ambient-shadow flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {running ? "progress_activity" : "play_circle"}
            </span>
            {running ? "Processing..." : "Initialize Engine"}
          </button>
        </motion.header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Draw Configuration */}
        <motion.section variants={fadeInUp} className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container rounded-2xl p-8 ghost-border relative overflow-hidden">
            <h2 className="text-xl font-headline font-bold mb-6">Algorithm Logic</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                <input type="radio" name="logic" defaultChecked className="mt-1 accent-primary" />
                <div>
                  <div className="font-bold text-on-surface font-headline mb-0.5">Weighted Random (Default)</div>
                  <div className="text-xs text-on-surface-variant">Standard probability based on Stableford score matching.</div>
                </div>
              </label>
              <label className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-colors cursor-pointer">
                <input type="radio" name="logic" className="mt-1 accent-primary" />
                <div>
                  <div className="font-bold text-on-surface font-headline mb-0.5">True Random Fallback</div>
                  <div className="text-xs text-on-surface-variant">Bypass scoring tier weights (use only if primary fails).</div>
                </div>
              </label>
            </div>
            
            <p className="text-xs text-on-surface-variant mb-4">
              Execute a manual run of the draw algorithm to calculate prize pool distribution and winner selection immediately.
            </p>
            <button 
              onClick={handleRunDraw}
              disabled={running}
              className="w-full bg-surface-bright hover:bg-surface-container-highest text-on-surface font-bold py-3 rounded-xl border border-outline-variant/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">science</span>
              Execute Manual Run
            </button>
          </div>
        </motion.section>

        {/* Live Draw Status & Results */}
        <motion.section variants={fadeInUp} className="xl:col-span-8">
           <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl p-8 ghost-border h-full flex flex-col">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/20">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                     <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                     Awaiting Execution
                   </div>
                   <h2 className="text-2xl font-headline font-bold">October 2023 Mega Draw</h2>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Generated Prize Pool</div>
                  <div className="text-4xl font-headline font-black text-primary">${result ? result.draw.prizePoolTotal : "---"}</div>
                </div>
              </div>

              <div className="flex-1 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 flex flex-col items-center justify-center text-center">
                 {result ? (
                   <>
                     <span className="material-symbols-outlined text-6xl text-primary mb-4 font-light">check_circle</span>
                     <h3 className="text-xl font-bold mb-2">Draw Executed Successfully</h3>
                     <p className="text-sm text-on-surface-variant max-w-sm mb-6">
                       Winning Numbers: <strong className="text-primary">{result.draw.winningNumbers.join(", ")}</strong> <br />
                       Winners Found: <strong className="text-secondary">{result.winnersCount}</strong>
                     </p>
                   </>
                 ) : (
                   <>
                     <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 font-light">casino</span>
                     <h3 className="text-xl font-bold mb-2">Engine is Standby</h3>
                     <p className="text-sm text-on-surface-variant max-w-sm mb-6">
                       Ready to process all active subscriptions against logged scores for the monthly draw logic.
                     </p>
                   </>
                 )}
              </div>
           </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
