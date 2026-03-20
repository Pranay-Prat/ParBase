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

export default function SettingsPage() {
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
        <div className="bg-surface-container rounded-3xl p-8 md:p-10 ghost-border relative overflow-hidden group">
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
                  defaultValue="Alex Golfer"
                  className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-on-surface-variant uppercase font-body">Email Address</label>
                <input
                  type="email"
                  defaultValue="alex@example.com"
                  className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 focus:bg-surface-container-high transition-all"
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
                className="bg-primary hover:bg-primary-dim text-on-primary font-black py-3 px-8 rounded-xl transition-colors ambient-shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Subscription Management Link */}
        <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-3xl p-8 ghost-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              Impact Pro Plan
            </div>
            <h3 className="text-xl font-headline font-bold mb-1">Subscription Overview</h3>
            <p className="text-sm text-on-surface-variant">Your Yearly plan is active and renewing in 8 months.</p>
          </div>
          <button className="bg-surface-bright hover:bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap border border-outline-variant/20 text-sm">
            Manage Billing
          </button>
        </div>

      </motion.section>
    </motion.div>
  );
}
