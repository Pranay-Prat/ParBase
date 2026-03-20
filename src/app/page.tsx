"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

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
      <main>
        {/* ── Hero Section ── */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-12 pt-32 pb-16 overflow-hidden">
          {/* Immersive Animated Background */}
          <AnimatedBackground variant="hero" />
          
          <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center relative z-10 mt-6 lg:mt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center w-full"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-7xl md:text-8xl font-headline font-black leading-[1.05] tracking-tighter mb-6 text-on-surface"
              >
                Every swing funds <br />
                <span className="text-primary italic">a better tomorrow.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-12 font-body font-medium leading-relaxed px-2">
                Turn your passion for golf into global impact. Subscribe to track your Stableford scores, fund vital charities, and enter exclusive monthly prize draws.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="w-full max-w-xl px-2">
                <div className="bg-transparent sm:bg-surface/80 sm:backdrop-blur-xl p-0 sm:p-2 rounded-2xl sm:rounded-full sm:shadow-2xl sm:border border-outline-variant/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:ambient-shadow w-full gap-3 sm:gap-0">
                  <div className="flex bg-surface/80 backdrop-blur sm:bg-transparent w-full text-on-surface px-4 py-4 sm:py-0 rounded-2xl sm:rounded-none border border-outline-variant/30 sm:border-transparent">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3 self-center">mail</span>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-transparent w-full outline-none font-body text-lg placeholder:text-on-surface-variant"
                    />
                  </div>
                  <Link
                    href="/subscribe"
                    className="flex-shrink-0 bg-primary text-on-primary font-headline font-extrabold text-lg px-8 py-4 rounded-2xl sm:rounded-full hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 whitespace-nowrap"
                  >
                    Start Impacting <span className="material-symbols-outlined ml-1">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Partner Logos (Inside Hero but visually separated) ── */}
          <div className="w-full max-w-7xl mx-auto mt-auto pt-20 sm:pt-24 z-10 pb-4">
            <div className="border-t border-outline-variant/15 pt-8">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 mb-6">
                Trusted by leading charities
              </p>
              <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 md:gap-12 opacity-50 hover:opacity-100 transition-opacity px-4 text-center">
                {["Global Water Initiative", "Foundation", "Tech For All", "Youth Sport United", "Medicine Across Borders"].map(
                  (name) => (
                    <span key={name} className="text-on-surface-variant font-headline font-bold text-base md:text-xl lg:text-2xl">
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Kinetic Cycle ── */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low relative overflow-hidden">
          <AnimatedBackground variant="subtle" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight mb-4 text-on-surface">
                Impact First.
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl">
                We believe sport is a vehicle for change. Our subscription loop turns your time on the course
                into tangible social progress, while rewarding you along the way.
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
                { num: "01", title: "Track Progress", desc: "Log your rounds with our precision tracking engine. Every birdie and par is recorded as kinetic energy for good.", icon: "edit_note", color: "primary" },
                { num: "02", title: "Support Charity", desc: "A portion of your subscription fee and designated performance milestones go directly to global impact initiatives.", icon: "favorite", color: "secondary" },
                { num: "03", title: "Win Rewards", desc: "Enter exclusive draws for luxury experiences and major cash prizes as a 'thank you' for your charitable contribution.", icon: "military_tech", color: "tertiary" },
              ].map((step) => (
                <motion.div
                  key={step.num}
                  variants={fadeInUp}
                  className="group bg-surface-container/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl ghost-border hover:bg-surface-bright transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-${step.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <span className={`text-2xl md:text-3xl font-headline font-black text-${step.color}`}>
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-bold mb-4 text-on-surface">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">{step.desc}</p>
                  <span className="material-symbols-outlined text-3xl md:text-4xl text-outline-variant/40 group-hover:text-primary transition-colors">
                    {step.icon}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Live Impact Bento ── */}
        <section className="py-24 px-6 md:px-12 bg-surface relative overflow-hidden">
          <AnimatedBackground variant="subtle" />
          <div className="max-w-7xl mx-auto relative z-10">
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
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface-container-highest to-surface rounded-2xl p-8 md:p-10 ghost-border flex flex-col justify-between overflow-hidden relative"
              >
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div>
                  <span className="px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                    Featured Cause
                  </span>
                  <h2 className="text-4xl md:text-5xl font-headline font-black leading-tight mb-6 text-on-surface">
                    Clean Water for <span className="text-primary italic">100 Villages</span>
                  </h2>
                  <p className="text-on-surface-variant text-lg max-w-md">
                    Our current focus is deploying sustainable filtration systems
                    across the Serengeti. Funded by our collective community.
                  </p>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full mt-12 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary glow-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "84%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-4 font-headline font-bold text-on-surface-variant">
                  <span>$84,200 Raised</span>
                  <span className="text-primary">Goal: $100k</span>
                </div>
              </motion.div>

              {/* Next Draw */}
              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 bg-surface-container-high rounded-2xl p-8 ghost-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2 text-on-surface">Next Draw</h3>
                  <div className="text-3xl sm:text-4xl font-headline font-black text-secondary uppercase">
                    2d : 14h : 05m
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-sm font-body text-on-surface-variant mb-1">
                    Current Prize Pool
                  </div>
                  <div className="text-3xl font-headline font-black text-on-surface">$25,000</div>
                </div>
              </motion.div>

              {/* Active Players */}
              <motion.div
                variants={fadeInUp}
                className="bg-surface-container rounded-2xl p-8 ghost-border flex flex-col items-center justify-center text-center group transition-colors hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">
                  volunteer_activism
                </span>
                <div className="text-3xl font-headline font-black text-on-surface">4.2k</div>
                <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest mt-1">
                  Active Donors
                </div>
              </motion.div>

              {/* Charity Partners */}
              <motion.div
                variants={fadeInUp}
                className="bg-surface-container rounded-2xl p-8 ghost-border flex flex-col items-center justify-center text-center group transition-colors hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-4 group-hover:scale-110 transition-transform">
                  public
                </span>
                <div className="text-3xl font-headline font-black text-on-surface">12</div>
                <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest mt-1">
                  Global Partners
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
