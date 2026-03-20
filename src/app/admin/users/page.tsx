"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.fullName && u.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
             placeholder="Search emails or names..."
             type="text"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
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
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin align-middle mr-2">progress_activity</span>
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isActive = user.subscription?.status === 'ACTIVE';
                  const planName = user.subscription?.plan === 'YEARLY' ? 'Yearly' : user.subscription?.plan === 'MONTHLY' ? 'Monthly' : 'None';
                  const status = user.subscription?.status || 'Inactive';

                  return (
                    <tr key={user.id} className="hover:bg-surface-container transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-on-surface">{user.fullName || "Unknown"}</div>
                        <div className="text-xs text-on-surface-variant">{user.email}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                          isActive ? 'bg-primary/10 text-primary' : 
                          status === 'PAST_DUE' ? 'bg-error/10 text-error' : 
                          'bg-surface-bright text-outline'
                        }`}>
                          {planName} • {status}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex gap-1.5">
                          {user.scores.map((score: any, i: number) => (
                            <div key={i} className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface border border-outline-variant/20">
                              {score.score}
                            </div>
                          ))}
                          {user.scores.length === 0 && <span className="text-xs text-outline italic">No scores</span>}
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-bright" title="Dummy Actions">
                            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
