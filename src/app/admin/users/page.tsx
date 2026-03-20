"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminUsersPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface">
            User <span className="text-primary italic">Management</span>
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">View users, edit scores, and manage subscriptions.</p>
        </div>
        <div className="relative w-full md:w-64 group">
           <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">search</span>
           <input
             className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary text-sm text-on-surface placeholder:text-outline transition-all"
             placeholder="Search emails..."
             type="text"
           />
        </div>
      </header>

      <div className="bg-surface-container-low rounded-2xl ghost-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container/50">
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">User</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Plan Status</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Recent Scores (Max 5)</th>
                <th className="p-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { name: "Alex Golfer", email: "alex@example.com", plan: "Yearly", status: "Active", scores: [36, 42, 31, 28, 35] },
                { name: "Sarah Jenkins", email: "sarah.j@example.com", plan: "Monthly", status: "Active", scores: [38, 35, 34] },
                { name: "Marcus Chen", email: "marcus.c@example.com", plan: "Yearly", status: "Past Due", scores: [41, 40, 39, 39, 38] },
                { name: "Elena Rodriguez", email: "elena@example.com", plan: "None", status: "Inactive", scores: [] },
              ].map((user) => (
                <tr key={user.email} className="hover:bg-surface-container transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-on-surface">{user.name}</div>
                    <div className="text-xs text-on-surface-variant">{user.email}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'Active' ? 'bg-primary/10 text-primary' : 
                      user.status === 'Past Due' ? 'bg-error/10 text-error' : 
                      'bg-surface-bright text-outline'
                    }`}>
                      {user.plan} • {user.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex gap-1.5">
                      {user.scores.map((score, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface border border-outline-variant/20">
                          {score}
                        </div>
                      ))}
                      {user.scores.length === 0 && <span className="text-xs text-outline italic">No scores</span>}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-bright" title="Edit Scores">
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors rounded-lg hover:bg-surface-bright" title="Manage Subscription">
                        <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                      </button>
                    </div>
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
