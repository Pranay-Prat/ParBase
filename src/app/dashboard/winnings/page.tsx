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

export default function WinningsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [winnings, setWinnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchWinnings = async () => {
    try {
      const res = await fetch("/api/winnings");
      const data = await res.json();
      if (data.results) setWinnings(data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinnings();
  }, []);

  const pendingWin = winnings.find(w => w.verificationStatus === "PENDING" && !w.proofUrl);

  const handleUpload = async () => {
    if (!file || !pendingWin) return;
    setUploading(true);
    try {
      // Dummy proof URL generation for demonstration purposes
      const dummyUrl = `https://parbase-dummy-storage.com/proofs/${Date.now()}_${file.name}`;
      
      const res = await fetch("/api/winnings/upload-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId: pendingWin.id, proofUrl: dummyUrl }),
      });
      
      if (res.ok) {
        alert("Proof submitted successfully! Awaiting admin review.");
        setFile(null);
        fetchWinnings();
      } else {
        alert("Failed to submit proof");
      }
    } catch (e) {
      alert("Error submitting proof");
    } finally {
      setUploading(false);
    }
  };

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
      {pendingWin && (
        <motion.section variants={fadeInUp} className="bg-gradient-to-r from-surface-container-high to-surface-container rounded-2xl p-8 border border-secondary/20 shadow-lg shadow-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 text-error rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                Action Required
              </div>
              <h2 className="text-2xl font-headline font-bold mb-3">Verify Your Score</h2>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                Congratulations on placing in the draw! To release your <strong className="text-primary">${pendingWin.prizeAmount}</strong> payout, we need a photo or screenshot of your scorecard.
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
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
                  >
                    {uploading ? "Submitting..." : "Submit Proof"}
                  </button>
                  <button onClick={() => setFile(null)} disabled={uploading} className="text-on-surface-variant hover:text-error text-sm font-bold px-4 py-2 disabled:opacity-50">Cancel</button>
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
      )}

      {/* Winnings History */}
      <motion.section variants={fadeInUp} className="space-y-6">
        <h3 className="text-2xl font-headline font-bold mb-6">Winnings History</h3>
        
        <div className="overflow-x-auto bg-surface-container-low rounded-2xl ghost-border">
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
              {loading ? (
                <tr>
                   <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                     <span className="material-symbols-outlined animate-spin align-middle mr-2">progress_activity</span>
                     Loading history...
                   </td>
                </tr>
              ) : winnings.length === 0 ? (
                <tr>
                   <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                     You haven't won any draws yet. Keep recording those scores!
                   </td>
                </tr>
              ) : (
                winnings.map((win) => (
                  <tr key={win.id} className={`${win.verificationStatus === "PENDING" && !win.proofUrl ? "bg-surface-container-highest/50" : "bg-surface"} hover:bg-surface-container transition-colors`}>
                    <td className="p-6">
                      <div className="font-bold text-on-surface">{new Date(win.draw.month).toLocaleDateString()} Draw</div>
                      <div className="text-xs text-on-surface-variant mt-1">{win.matchType.replace("_", " ")}</div>
                    </td>
                    <td className="p-6 font-headline font-black text-primary text-xl">${win.prizeAmount}</td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="text-sm font-medium">---</div>
                      <div className="text-xs text-on-surface-variant">Score verification ID: {win.id.slice(0, 8)}</div>
                    </td>
                    <td className="p-6">
                      {win.paymentStatus === "PAID" ? (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-1 w-max">
                          <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Paid
                        </span>
                      ) : win.verificationStatus === "APPROVED" ? (
                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-1 w-max">
                          <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                          Approved
                        </span>
                      ) : win.proofUrl ? (
                        <span className="px-3 py-1 rounded-full bg-surface-bright text-on-surface text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                          Reviewing...
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full border border-error text-error text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                          Needs Proof
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}
