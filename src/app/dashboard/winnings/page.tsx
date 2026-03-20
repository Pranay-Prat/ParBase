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

export default function WinningsPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto space-y-12">
      <motion.header variants={fadeInUp} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
          My <span className="text-primary italic">Winnings.</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          Track your draw victories, upload your scorecard proof, and monitor payout status.
        </p>
      </motion.header>

      {/* Upload Proof Section (Only visible if pending verification) */}
      <motion.section variants={fadeInUp} className="bg-gradient-to-r from-surface-container-high to-surface-container rounded-3xl p-8 border border-secondary/20 shadow-lg shadow-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 text-error rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              Action Required
            </div>
            <h2 className="text-2xl font-headline font-bold mb-3">Verify Your Score</h2>
            <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
              Congratulations on placing in the Top 5 for the October Draw! To release your <strong className="text-primary">$5,000</strong> payout, we need a photo or screenshot of your scorecard from <strong className="text-on-surface">Royal St. Georges (Oct 12)</strong>.
            </p>
            <div className="bg-surface-container-lowest p-4 rounded-xl text-xs text-on-surface-variant flex gap-3 border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline">policy</span>
              <p>Proof must clearly show your name, date, course, and Stableford points matching your entry. Falsified records result in immediate ban per T&Cs.</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-2xl ghost-border border-dashed border-2 hover:bg-surface-bright transition-colors text-center">
            {file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface mb-1">{file.name}</p>
                  <p className="text-xs text-on-surface-variant">Ready to upload</p>
                </div>
                <div className="flex gap-2 justify-center mt-6">
                  <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm">Submit Proof</button>
                  <button onClick={() => setFile(null)} className="text-on-surface-variant hover:text-error text-sm font-bold px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block space-y-4">
                <div className="w-16 h-16 bg-surface-container-highest text-on-surface-variant rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-on-surface-variant">JPG, PNG or PDF (max. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </div>
        </div>
      </motion.section>

      {/* Winnings History */}
      <motion.section variants={fadeInUp} className="space-y-6">
        <h3 className="text-2xl font-headline font-bold mb-6">Winnings History</h3>
        
        <div className="overflow-x-auto bg-surface-container-low rounded-3xl ghost-border">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Draw Event</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Prize</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant hidden md:table-cell">Score Used</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Needs Verif */}
              <tr className="bg-surface-container-highest/50 hover:bg-surface-container-highest transition-colors">
                <td className="p-6">
                  <div className="font-bold text-on-surface">Oct 2023 Mega Draw</div>
                  <div className="text-xs text-on-surface-variant mt-1">Runner Up (2nd)</div>
                </td>
                <td className="p-6 font-headline font-black text-primary text-xl">$5,000</td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-sm font-medium">38 pts</div>
                  <div className="text-xs text-on-surface-variant">Royal St. Georges</div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full border border-error text-error text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Needs Proof
                  </span>
                </td>
              </tr>
              {/* Paid */}
              <tr className="bg-surface hover:bg-surface-container transition-colors">
                <td className="p-6">
                  <div className="font-bold text-on-surface">Aug 2023 Consolation</div>
                  <div className="text-xs text-on-surface-variant mt-1">4th Place</div>
                </td>
                <td className="p-6 font-headline font-black text-on-surface text-xl">$1,000</td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-sm font-medium">36 pts</div>
                  <div className="text-xs text-on-surface-variant">Pebble Beach</div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-1 w-max">
                    <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Paid
                  </span>
                </td>
              </tr>
              {/* Processing */}
              <tr className="bg-surface hover:bg-surface-container transition-colors">
                <td className="p-6">
                  <div className="font-bold text-on-surface">Jun 2023 3-Match</div>
                  <div className="text-xs text-on-surface-variant mt-1">3rd Place</div>
                </td>
                <td className="p-6 font-headline font-black text-on-surface text-xl">$2,500</td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-sm font-medium">35 pts</div>
                  <div className="text-xs text-on-surface-variant">Spyglass Hill</div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-surface-bright text-on-surface text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Processing
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}
