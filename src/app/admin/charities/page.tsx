"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminCharitiesPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            Charity <span className="text-tertiary italic">Directory</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage partner organizations, content, and media assets.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dim text-on-primary font-black py-3 px-6 rounded-xl transition-colors ambient-shadow flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          Add New Partner
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          { name: "Save the Oceans", category: "Environment", status: "Active Spotlight", icon: "water_drop" },
          { name: "Junior Golf Fund", category: "Youth Sports", status: "Active", icon: "sports_golf" },
          { name: "Green Links", category: "Environment", status: "Active", icon: "park" },
          { name: "Heart Health", category: "Medical", status: "Draft", icon: "favorite" },
        ].map((charity) => (
          <div key={charity.name} className="bg-surface-container rounded-3xl p-6 ghost-border group hover:bg-surface-container-high transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-outline-variant group-hover:text-primary transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{charity.icon}</span>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                charity.status === 'Active Spotlight' ? 'bg-secondary/10 text-secondary' : 
                charity.status === 'Active' ? 'bg-primary/10 text-primary' : 
                'bg-surface-bright text-outline'
              }`}>
                {charity.status}
              </span>
            </div>
            <h3 className="text-xl font-headline font-bold mb-1">{charity.name}</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">{charity.category}</p>
            
            <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/20">
              <button className="flex-1 py-2 bg-surface-bright hover:bg-surface-container-highest text-on-surface rounded-lg text-sm font-bold transition-colors">
                Edit Content
              </button>
              <button className="flex-1 py-2 bg-surface-bright hover:bg-surface-container-highest text-on-surface rounded-lg text-sm font-bold transition-colors">
                Media
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
