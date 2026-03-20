"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function MyCharityPage() {
  const [contribution, setContribution] = useState(10);
  const [profile, setProfile] = useState<any>(null);
  const [charity, setCharity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
          setCharity(data.profile.charity);
          setContribution(data.profile.charityContributionPct || 10);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contribution }),
      });
      alert("Contribution updated successfully!");
    } catch (e) {
      alert("Error updating contribution");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-primary animate-spin">progress_activity</span> Loading...</div>;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <motion.header variants={fadeInUp} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
          My <span className="text-secondary italic">Impact.</span>
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg">
          Manage your chosen charity and adjust the impact of your subscription.
        </p>
      </motion.header>

      {/* Current Selection Bento */}
      <motion.section variants={fadeInUp} className="bg-surface-container rounded-2xl p-8 md:p-10 ghost-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-primary opacity-10 blur-xl">
          <span className="material-symbols-outlined text-9xl">water_drop</span>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high flex items-center justify-center">
            {charity?.imageUrl ? (
              <Image
                src={charity.imageUrl}
                alt={charity.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">volunteer_activism</span>
            )}
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Currently Supporting
              </div>
              <h2 className="text-3xl sm:text-4xl font-headline font-black mb-2">{charity?.name || "No Charity Selected"}</h2>
              <p className="text-on-surface-variant">{charity?.description || "Select a charity from our directory to start making an impact with your subscription."}</p>
            </div>
            
            <div className="bg-surface-container-high p-6 rounded-2xl ghost-border space-y-6">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">Subscription Allocation</div>
                    <div className="text-xs text-on-surface-variant mt-1">Minimum required: 10%</div>
                  </div>
                  <div className="text-3xl font-headline font-black text-primary">{contribution}%</div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={contribution}
                  onChange={(e) => setContribution(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface font-medium">
                <span className="material-symbols-outlined text-secondary text-sm">info</span>
                Increasing this reduces the prize pool contribution but maximizes your direct charity impact.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary-dim text-on-primary font-black py-4 px-8 rounded-xl transition-colors ambient-shadow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? "Saving..." : "Save Allocation"}
              </button>
              <Link href="/charities" className="text-center font-bold text-on-surface py-4 px-8 rounded-xl border-2 border-outline-variant/20 hover:bg-surface-bright transition-colors">
                Change Charity
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Independent Donation */}
      <motion.section variants={fadeInUp} className="bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl p-8 md:p-10 ghost-border">
        <div className="max-w-xl mb-8">
          <h3 className="text-2xl font-headline font-black mb-2 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">volunteer_activism</span>
            Independent Donation
          </h3>
          <p className="text-on-surface-variant">
            Want to give more outside of your subscription? Make a one-time donation specifically to Save the Oceans. 100% of this goes directly to them.
          </p>
        </div>
        
        <form className="space-y-6 max-w-lg">
          <div className="grid grid-cols-3 gap-4">
            {["$20", "$50", "$100"].map((amount) => (
              <button key={amount} type="button" className="bg-surface-container-high hover:border-primary border-2 border-transparent text-lg font-headline font-black py-4 rounded-xl transition-all ghost-border">
                {amount}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant font-headline font-black text-xl">$</div>
            <input 
              type="number" 
              placeholder="Custom Amount" 
              className="w-full bg-surface-container-high border-2 border-outline-variant/20 rounded-xl py-4 pl-12 pr-6 text-xl font-bold focus:border-primary focus:ring-0 focus:bg-surface-container-highest transition-all"
            />
          </div>
          <button type="button" className="w-full bg-surface-bright hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface font-black py-4 rounded-xl transition-colors">
            Proceed to Payment
          </button>
        </form>
      </motion.section>
    </motion.div>
  );
}
