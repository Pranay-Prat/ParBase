"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminWinnersPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/admin/winners");
      const data = await res.json();
      if (data.results) setResults(data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpdate = async (resultId: string, updates: any) => {
    try {
      const res = await fetch("/api/admin/winners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId, ...updates }),
      });
      if (res.ok) {
        fetchResults();
      }
    } catch (e) {
      alert("Error updating result");
    }
  };

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

      <div className="border border-outline-variant/20 rounded-2xl overflow-hidden bg-surface-container-low ghost-border">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin align-middle mr-2">progress_activity</span>
                    Loading winners...
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    No winners found.
                  </td>
                </tr>
              ) : (
                results.map((win) => (
                  <tr key={win.id} className="hover:bg-surface-container transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-on-surface">{new Date(win.draw.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} Draw</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{win.matchType.replace('_', ' ')}</div>
                    </td>
                    <td className="p-5 font-medium">{win.profile?.fullName || win.profile?.email}</td>
                    <td className="p-5 font-headline font-black text-primary text-lg">${win.prizeAmount}</td>
                    <td className="p-5">
                      {!win.proofUrl ? (
                        <span className="text-xs text-error font-bold bg-error/10 px-2 py-1 rounded">Awaiting User</span>
                      ) : (
                        <a href={win.proofUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-secondary hover:underline underline-offset-4">
                          <span className="material-symbols-outlined text-sm">image</span>
                          View Proof
                        </a>
                      )}
                    </td>
                    <td className="p-5 text-right flex gap-2 justify-end">
                      {win.paymentStatus === "PAID" ? (
                         <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-bright text-on-surface-variant rounded-full text-[10px] font-black uppercase tracking-widest">
                           <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                           Paid
                         </span>
                      ) : win.verificationStatus === "APPROVED" ? (
                         <button onClick={() => handleUpdate(win.id, { paymentStatus: 'PAID' })} className="bg-primary hover:bg-primary-dim text-on-primary text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                           Mark Paid
                         </button>
                      ) : win.verificationStatus === "PENDING" && win.proofUrl ? (
                         <button onClick={() => handleUpdate(win.id, { verificationStatus: 'APPROVED' })} className="bg-secondary hover:bg-secondary-dim text-on-secondary text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                           Verify Proof
                         </button>
                      ) : (
                        <span className="text-xs text-outline-variant font-bold uppercase tracking-widest">Blocked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
         </div>
      </div>
    </motion.div>
  );
}
