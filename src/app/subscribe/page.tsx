"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { createClient } from "@/lib/supabase/client";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const plans = [
  {
    name: "Monthly",
    price: "£9.99",
    period: "/month",
    features: [
      "Enter Stableford scores",
      "Monthly prize draw entry",
      "Choose your charity",
      "Min 10% auto contribution",
      "Full dashboard access",
      "Email notifications",
    ],
    cta: "Start Monthly",
    highlight: false,
  },
  {
    name: "Yearly",
    price: "£89.99",
    period: "/year",
    badge: "Save 25%",
    features: [
      "Everything in Monthly",
      "Priority draw entries",
      "Increase charity contribution %",
      "Independent donation option",
      "Exclusive annual events",
      "Early access to new features",
    ],
    cta: "Start Yearly",
    highlight: true,
  },
];

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleSubscribe = async (planName: string) => {
    if (!user) {
      router.push("/auth/signup");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName.toUpperCase() }),
      });

      if (res.ok) {
        router.push("/dashboard?subscribed=true");
      } else {
        alert("Failed to subscribe");
        setLoading(false);
      }
    } catch (e) {
      alert("Error processing subscription");
      setLoading(false);
    }
  };

  return (
    <>
      <main className="pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
        <AnimatedBackground variant="page" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black tracking-tighter mb-6">
              Join the <span className="text-secondary">Movement</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
              Subscribe to enter monthly draws, track your Stableford scores, and
              support your chosen charity. Every swing counts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 md:p-10 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-gradient-to-br from-surface-container-high to-surface-container ghost-border ring-1 ring-primary/30 hover:shadow-xl hover:shadow-primary/10"
                    : "bg-surface-container/80 backdrop-blur-sm ghost-border hover:shadow-xl hover:shadow-primary/5"
                }`}
              >
                {plan.badge && (
                  <span className="absolute top-6 right-6 bg-secondary text-on-secondary text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h2 className="text-2xl font-headline font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-headline font-black text-primary">
                    {plan.price}
                  </span>
                  <span className="text-on-surface-variant font-body">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                        check_circle
                      </span>
                      <span className="text-on-surface-variant">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-headline font-bold text-lg text-center transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlight
                      ? "bg-gradient-to-r from-primary to-primary-dim text-on-primary ambient-shadow hover:scale-[1.02]"
                      : "bg-surface-bright text-on-surface ghost-border hover:bg-surface-container-highest"
                  }`}
                >
                  {loading ? "Processing..." : plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Prize Pool Distribution Info */}
          <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-headline font-bold text-center mb-10">
              How Your Subscription Fuels the Prize Pool
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { match: "5-Match", pct: "40%", note: "Jackpot (rolls over)", color: "primary" },
                { match: "4-Match", pct: "35%", note: "Major prize", color: "secondary" },
                { match: "3-Match", pct: "25%", note: "Consolation prize", color: "tertiary" },
              ].map((tier) => (
                <div
                  key={tier.match}
                  className="bg-surface-container-low rounded-2xl p-6 ghost-border text-center"
                >
                  <div className={`text-4xl font-headline font-black text-${tier.color} mb-2`}>
                    {tier.pct}
                  </div>
                  <div className="font-headline font-bold text-lg mb-1">{tier.match}</div>
                  <div className="text-on-surface-variant text-sm">{tier.note}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-on-surface-variant text-sm mt-6">
              Min 10% of your subscription goes directly to your chosen charity. Unclaimed 5-match jackpots carry forward.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
