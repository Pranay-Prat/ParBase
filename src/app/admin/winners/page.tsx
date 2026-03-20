"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminWinnersPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            Payout & <span className="text-primary italic">Verification</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Review proofs, verify scores, and mark winnings as paid.</p>
        </div>
      </header>

      <div className="border border-outline-variant/20 rounded-3xl overflow-hidden bg-surface-container-low ghost-border">
         <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container/50">
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Draw / Tier</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Winner (User)</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Payout</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Verification Proof</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { draw: "Oct Mega Draw", tier: "5-Match Winner", user: "Marcus Chen", payout: "$12,500", proof: "marcus_card_verify.jpg", status: "Paid" },
                { draw: "Oct Mega Draw", tier: "Runner Up", user: "Sarah Jenkins", payout: "$5,000", proof: "Pending Upload", status: "Awaiting Proof" },
                { draw: "Sept Bonus", tier: "Consolation", user: "Elena Rodriguez", payout: "$1,000", proof: "elena_screenshot.png", status: "Verify" },
              ].map((win, i) => (
                <tr key={i} className="hover:bg-surface-container transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-on-surface">{win.draw}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{win.tier}</div>
                  </td>
                  <td className="p-5 font-medium">{win.user}</td>
                  <td className="p-5 font-headline font-black text-primary text-lg">{win.payout}</td>
                  <td className="p-5">
                    {win.proof === "Pending Upload" ? (
                      <span className="text-xs text-error font-bold bg-error/10 px-2 py-1 rounded">Awaiting User</span>
                    ) : (
                      <button className="flex items-center gap-2 text-xs font-bold text-secondary hover:underline underline-offset-4">
                        <span className="material-symbols-outlined text-sm">image</span>
                        {win.proof}
                      </button>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    {win.status === "Paid" ? (
                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-bright text-on-surface-variant rounded-full text-[10px] font-black uppercase tracking-widest">
                         <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                         Sent
                       </span>
                    ) : win.status === "Verify" ? (
                       <button className="bg-primary hover:bg-primary-dim text-on-primary text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                         Review & Pay
                       </button>
                    ) : (
                      <span className="text-xs text-outline-variant font-bold uppercase tracking-widest">Blocked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
      </div>
    </motion.div>
  );
}
