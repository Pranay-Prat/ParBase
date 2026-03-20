"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* ── Hero Section ── */}
        <section className="relative min-h-[calc(100vh-6rem)] flex items-center px-6 md:px-12 hero-pattern overflow-hidden">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative z-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest ghost-border mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-body font-bold uppercase tracking-widest text-on-surface-variant">
                  Kinetic Link Engine
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter mb-8"
              >
                Play. <br />
                <span className="text-secondary">Give.</span> <br />
                Win.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
                The sport you love, now fueling the change the world needs. Track
                your pulse, donate your score, win the future.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/subscribe"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-headline font-extrabold text-lg rounded-xl ambient-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Subscribe Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link
                  href="/charities"
                  className="px-8 py-4 bg-transparent ghost-border text-on-surface font-headline font-bold text-lg rounded-xl hover:bg-surface-bright transition-all text-center"
                >
                  View Live Impact
                </Link>
              </motion.div>
            </motion.div>

            {/* Asymmetric Kinetic Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute -right-20 -top-20 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl rounded-full" />
              <div className="relative bg-surface-container-high p-8 rounded-[2.5rem] ghost-border shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h3 className="font-headline font-bold text-2xl text-primary">
                      Global Contribution
                    </h3>
                    <p className="text-on-surface-variant">Real-time donation velocity</p>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-secondary">
                    insights
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="h-16 w-full bg-surface-container rounded-2xl flex items-center px-6 gap-4 border-l-4 border-primary">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">
                        golf_course
                      </span>
                    </div>
                    <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary glow-primary" />
                    </div>
                    <span className="font-headline font-bold">$12.4k</span>
                  </div>
                  <div className="h-16 w-full bg-surface-container rounded-2xl flex items-center px-6 gap-4 border-l-4 border-secondary">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        volunteer_activism
                      </span>
                    </div>
                    <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-secondary glow-secondary" />
                    </div>
                    <span className="font-headline font-bold">$8.2k</span>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-outline-variant/20 flex justify-around">
                  <div className="text-center">
                    <div className="text-3xl font-headline font-black text-on-surface">1.2M</div>
                    <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">
                      Lives Impacted
                    </div>
                  </div>
                  <div className="text-center border-x border-outline-variant/20 px-8">
                    <div className="text-3xl font-headline font-black text-on-surface">15k</div>
                    <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">
                      Score Logs
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-headline font-black text-primary">$450k</div>
                    <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">
                      Prizes Won
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Kinetic Cycle ── */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight mb-4">
                The Kinetic Cycle
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl">
                Every swing matters. Our three-step loop turns your passion for golf
                into tangible social change.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { num: "01", title: "Enter Scores", desc: "Log your rounds with our precision tracking engine. Every birdie and par is recorded as kinetic energy for good.", icon: "edit_note", color: "primary" },
                { num: "02", title: "Support Charity", desc: "A portion of every entry fee and designated performance milestones go directly to global impact initiatives.", icon: "favorite", color: "secondary" },
                { num: "03", title: "Win Rewards", desc: "Enter exclusive draws for premium golf gear, luxury experiences, and major cash prizes as a 'thank you' for your impact.", icon: "military_tech", color: "tertiary" },
              ].map((step) => (
                <motion.div
                  key={step.num}
                  variants={fadeInUp}
                  className="group bg-surface-container p-10 rounded-3xl ghost-border hover:bg-surface-bright transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <span className={`text-3xl font-headline font-black text-${step.color}`}>
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">{step.desc}</p>
                  <span className="material-symbols-outlined text-4xl text-outline-variant/40">
                    {step.icon}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Live Impact Bento ── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 md:grid-rows-2 gap-4 md:min-h-[600px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Featured Cause */}
              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface-container-highest to-surface rounded-[2.5rem] p-10 ghost-border flex flex-col justify-between overflow-hidden relative"
              >
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div>
                  <span className="px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                    Featured Cause
                  </span>
                  <h2 className="text-4xl md:text-5xl font-headline font-black leading-tight mb-6">
                    Clean Water for <span className="text-primary">100 Villages</span>
                  </h2>
                  <p className="text-on-surface-variant text-lg max-w-md">
                    Our current focus is deploying sustainable filtration systems
                    across the Serengeti. Powered by your swings.
                  </p>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full mt-12 overflow-hidden">
                  <div className="w-[84%] h-full bg-primary glow-primary" />
                </div>
                <div className="flex justify-between mt-4 font-headline font-bold">
                  <span>$84,200 Raised</span>
                  <span className="text-primary">Goal: $100k</span>
                </div>
              </motion.div>

              {/* Next Draw */}
              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 bg-surface-container-high rounded-[2.5rem] p-8 ghost-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Next Draw</h3>
                  <div className="text-3xl sm:text-4xl font-headline font-black text-secondary uppercase">
                    2d : 14h : 05m
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-sm font-body text-on-surface-variant mb-1">
                    Current Prize Pool
                  </div>
                  <div className="text-3xl font-headline font-black">$25,000</div>
                </div>
              </motion.div>

              {/* Active Players */}
              <motion.div
                variants={fadeInUp}
                className="bg-surface-container rounded-[2.5rem] p-8 ghost-border flex flex-col items-center justify-center text-center"
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-4">
                  groups
                </span>
                <div className="text-3xl font-headline font-black">4.2k</div>
                <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">
                  Active Players
                </div>
              </motion.div>

              {/* Charity Partners */}
              <motion.div
                variants={fadeInUp}
                className="bg-surface-container rounded-[2.5rem] p-8 ghost-border flex flex-col items-center justify-center text-center"
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-4">
                  emoji_events
                </span>
                <div className="text-3xl font-headline font-black">12</div>
                <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">
                  Charity Partners
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Charity Partners Marquee ── */}
        <section className="py-16 px-6 md:px-12 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-center font-body font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-12">
              Fueling Global Movements
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-70 transition-opacity">
              {["Global Water Initiative", "Foundation", "Tech For All", "Youth Sport United", "Medicine Across Borders"].map(
                (name) => (
                  <span key={name} className="text-on-surface-variant font-headline font-bold text-lg">
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
