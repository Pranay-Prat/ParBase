"use client";

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
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
      <motion.header variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            Draw <span className="text-secondary italic">Management</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Configure logic, run simulations, and publish results.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dim text-on-primary font-black py-3 px-6 rounded-xl transition-colors ambient-shadow flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
          Initialize Engine
        </button>
      </motion.header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Draw Configuration */}
        <motion.section variants={fadeInUp} className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container rounded-3xl p-8 ghost-border relative overflow-hidden">
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
            
            <h2 className="text-xl font-headline font-bold mb-4 mt-8">Pre-Simulation Mode</h2>
            <p className="text-xs text-on-surface-variant mb-4">
              Run a dry-run of the draw algorithm to verify prize pool distribution and winner selection without writing to the database.
            </p>
            <button className="w-full bg-surface-bright hover:bg-surface-container-highest text-on-surface font-bold py-3 rounded-xl border border-outline-variant/20 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">science</span>
              Execute Dry Run
            </button>
          </div>
        </motion.section>

        {/* Live Draw Status & Results */}
        <motion.section variants={fadeInUp} className="xl:col-span-8">
           <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-3xl p-8 ghost-border h-full flex flex-col">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/20">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                     <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                     Awaiting Execution
                   </div>
                   <h2 className="text-2xl font-headline font-bold">October 2023 Mega Draw</h2>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Locked Prize Pool</div>
                  <div className="text-4xl font-headline font-black text-primary">$45,000</div>
                </div>
              </div>

              <div className="flex-1 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 flex flex-col items-center justify-center text-center">
                 <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 font-light">casino</span>
                 <h3 className="text-xl font-bold mb-2">Engine is Standby</h3>
                 <p className="text-sm text-on-surface-variant max-w-sm mb-6">
                   Ready to process 34,210 logged scores against the 5-match, 4-match, and 3-match tier requirements.
                 </p>
                 <button className="bg-surface-bright text-outline-variant font-bold py-3 px-8 rounded-xl cursor-not-allowed opacity-50 flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">publish</span>
                   Publish Results to Users
                 </button>
              </div>
           </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
