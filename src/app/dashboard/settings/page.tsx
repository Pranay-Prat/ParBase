"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubsLoading, setIsSubsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.profile) {
          setProfile(d.profile);
          setSubscription(d.profile.subscription);
          setFullName(d.profile.fullName || "");
        }
      });
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName }),
      });
      alert("Profile updated!");
    } catch (e) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return;
    setIsSubsLoading(true);
    try {
      const res = await fetch("/api/subscription/cancel", { method: "POST" });
      if (res.ok) {
        alert("Subscription cancelled. It will remain active until the end of the billing period.");
        window.location.reload();
      } else {
        alert("Failed to cancel subscription.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubsLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto space-y-12">
      <motion.header variants={fadeInUp} className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-surface">
          Profile <span className="text-outline italic">Settings.</span>
        </h1>
        <p className="text-on-surface-variant text-lg">
          Manage your account details and preferences.
        </p>
      </motion.header>

      <motion.section variants={fadeInUp} className="space-y-8">
        {/* Profile Information */}
        <div className="bg-surface-container rounded-2xl p-8 md:p-10 ghost-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-on-surface opacity-5 blur-xl group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-9xl">person</span>
          </div>
          
          <h2 className="text-xl font-headline font-bold mb-6 relative z-10">Personal Details</h2>
          
          <form className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-on-surface-variant uppercase font-body">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-on-surface-variant uppercase font-body">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={profile?.email || ""}
                  className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface opacity-50 cursor-not-allowed transition-all"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <h3 className="text-sm font-bold tracking-wider text-on-surface-variant uppercase mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-primary hover:bg-primary-dim text-on-primary font-black py-3 px-8 rounded-xl transition-colors ambient-shadow disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Subscription Management Link */}
        <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl p-8 ghost-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
             <div className={`inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${!subscription || subscription.status !== 'ACTIVE' ? 'opacity-50' : ''}`}>
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              {subscription?.status === "ACTIVE" ? `ParBase Pro ${subscription?.plan === 'YEARLY' ? '(Yearly)' : '(Monthly)'}` : "Free Tier"}
            </div>
            <h3 className="text-xl font-headline font-bold mb-1">Subscription Overview</h3>
            <p className="text-sm text-on-surface-variant">
              {subscription?.status === "ACTIVE" 
                ? (subscription.cancelAtPeriodEnd ? "Your subscription will cancel at the end of the period." : "Your plan is active and renewing automatically.") 
                : "You do not currently have an active subscription."}
            </p>
          </div>
          {subscription?.status === "ACTIVE" && !subscription.cancelAtPeriodEnd && (
            <button 
              onClick={cancelSubscription}
              disabled={isSubsLoading}
              className="bg-surface-bright hover:bg-error/20 hover:text-error text-on-surface px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap border border-outline-variant/20 text-sm disabled:opacity-50"
            >
              {isSubsLoading ? "Cancelling..." : "Cancel Subscription"}
            </button>
          )}
        </div>

      </motion.section>
    </motion.div>
  );
}
