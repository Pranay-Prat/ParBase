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

export default function CharityProfilePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[716px] flex items-end px-6 md:px-12 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR_lGdfVWytA2_6TBpV1j_kpnRpzZhhh0P-wI0DTpkhIsCBfrDI4LP7o8lQqEnZFK-gb8rYb67ObCoWMXLuSrsRoFFLye83watoSRHJuOlb-IvfXER0FcmlqlXZvnjMKsLtopzabxkhiwYtcvpk8qbRJKEDp3YxI_cWvyJCdzNqlkLIDRaq-s4tEpUjS9EkO459prKqaYziT3Ms7X86VligF0yCS3IEx2ar4mn67MhFQkwX1z6Uc62xrCfztR-jXo9OlyHLe3FCkvU"
              alt="Ocean waves"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent" />
          </div>
          <motion.div
            className="relative z-10 max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Verified Charity</span>
              <div className="h-[1px] w-12 bg-primary" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-8xl font-headline font-black text-on-surface leading-[0.9] tracking-tighter mb-6">
              Save the <span className="text-secondary italic">Oceans</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light mb-10 leading-relaxed">
              Fighting for the heartbeat of our planet. We deploy advanced filtration systems and community-led cleanup initiatives to restore marine ecosystems.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-xl font-headline font-extrabold text-lg flex items-center gap-2 ambient-shadow transition-all hover:-translate-y-1 active:scale-95">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Select as my Charity
              </button>
              <button className="bg-surface-bright/40 backdrop-blur-md ghost-border text-on-surface px-8 py-4 rounded-xl font-headline font-extrabold text-lg flex items-center gap-2 hover:bg-surface-bright/60 transition-all active:scale-95">
                <span className="material-symbols-outlined">volunteer_activism</span>
                Independent Donation
              </button>
              <button className="w-14 h-14 rounded-xl ghost-border flex items-center justify-center text-on-surface hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Bento */}
        <section className="px-6 md:px-12 py-24 bg-surface">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Main Impact Card */}
            <motion.div variants={fadeInUp} className="md:col-span-2 glass-panel p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700" />
              <div>
                <span className="text-primary font-bold tracking-tighter text-sm mb-2 block">CUMULATIVE IMPACT</span>
                <h2 className="text-4xl sm:text-5xl font-headline font-extrabold text-on-surface mb-4">1.2 tons of plastic removed</h2>
                <p className="text-on-surface-variant leading-relaxed">Through our proprietary kinetic filtration technology and 450+ weekend volunteer surges along coastline hotspots.</p>
              </div>
              <div className="mt-12 flex gap-8">
                <div>
                  <div className="text-3xl font-headline font-black text-primary">14k+</div>
                  <div className="text-xs text-on-surface-variant font-bold tracking-widest uppercase">Marine Lives Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-black text-secondary">82%</div>
                  <div className="text-xs text-on-surface-variant font-bold tracking-widest uppercase">Efficiency Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Goal Tracking */}
            <motion.div variants={fadeInUp} className="bg-surface-container-high p-8 rounded-3xl flex flex-col justify-between ghost-border">
              <div>
                <span className="material-symbols-outlined text-primary mb-4 text-4xl">waves</span>
                <h3 className="text-2xl font-headline font-bold mb-2">Ocean Reforestation</h3>
                <p className="text-sm text-on-surface-variant">Seeding kelp forests in damaged coastal zones to capture carbon.</p>
              </div>
              <div className="mt-8">
                <div className="flex justify-between text-xs font-bold mb-2 uppercase">
                  <span>Progress</span>
                  <span>68%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full glow-primary" style={{ width: "68%" }} />
                </div>
              </div>
            </motion.div>

            {/* Community */}
            <motion.div variants={fadeInUp} className="bg-surface-container p-8 rounded-3xl flex flex-col items-center justify-center text-center ghost-border group hover:bg-surface-bright transition-colors">
              <div className="flex -space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-surface-bright border-2 border-surface flex items-center justify-center text-xs font-bold">JD</div>
                <div className="w-12 h-12 rounded-full bg-surface-bright border-2 border-surface flex items-center justify-center text-xs font-bold">MK</div>
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-black">+4.2k</div>
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">Join the Pulse</h3>
              <p className="text-sm text-on-surface-variant mb-6">Connect with 4,200+ golfers supporting this cause.</p>
              <button className="text-secondary font-bold text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                View Community <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Description + Image Section */}
        <section className="px-6 md:px-12 py-12 mb-24 flex flex-col md:flex-row gap-16">
          <motion.div className="md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-headline font-black mb-8 leading-tight">
              Beyond the surface: Why we <span className="text-primary italic">fight</span>.
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>The ocean isn&apos;t just water; it&apos;s the lifeblood of our planet, regulating climate and providing 50% of our oxygen.</p>
              <p>&quot;Save the Oceans&quot; operates at the intersection of high-technology and grassroots action. We study currents, identify plastic &quot;hot zones,&quot; and deploy tactical teams.</p>
              <p>By selecting us as your charity, a portion of your entry fees goes directly to fueling the boats and operating the filters that keep our blue planet blue.</p>
            </div>
          </motion.div>
          <div className="md:w-1/2 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBJUAb4lRFuh9a-5X5AckYzs4VpopmJspbQHQZfqL7wRmGnq-_xSiJsujgIwOMhxrK_mmXoLiQ61EzFdAB5mluDzAFy-PDF0-_Zvtp19Atxv2V_vCT9V-k5yK6dLfxYk_1VU2MEIuxAAd2HRD_5X3xqtwCSLNlXivugQT62jkVvISiDTYo7GzSJ1dxtwypNdQ3I1ZRA1Mr-t6nSdF0gz8Eau9oV9xu3LTP08_qcqstfl-3IvbAZ9bHtMAtZswJh5FkxBKXW63yRtqB"
                alt="Coral reef"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-surface-bright p-6 rounded-2xl ghost-border max-w-[280px] shadow-xl">
              <p className="italic text-on-surface font-light leading-snug">&quot;The most effective marine conservation group I&apos;ve ever collaborated with.&quot;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-tighter">Dr. Aris Thorne</p>
                  <p className="text-[10px] text-on-surface-variant">Marine Biologist, UN Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="px-6 md:px-12 py-24 bg-surface-container-low">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-headline font-black tracking-tighter mb-2">Upcoming Events</h2>
              <p className="text-on-surface-variant">Turn your scorecard into real-world change.</p>
            </div>
            <button className="text-primary font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all">View All Events</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Coastline Classic Golf Day", tag: "Live Draw", date: "Oct 14, 2023", desc: "Participate in our flagship event at Cypress Point. Every eagle recorded funds 10kg of ocean cleanup.", location: "Monterey, CA", cta: "Register" },
              { title: "The Blue Tee Gala Night", tag: "Charity Gala", date: "Nov 02, 2023", desc: "An evening of impact, auctions, and storytelling from the frontline of conservation.", location: "Miami, FL", cta: "Buy Tickets" },
            ].map((event) => (
              <div key={event.title} className="group bg-surface-container rounded-3xl overflow-hidden ghost-border hover:border-primary/40 transition-all duration-300">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`font-black text-xs uppercase tracking-[0.2em] ${event.tag === "Live Draw" ? "text-secondary" : "text-on-surface-variant"}`}>{event.tag}</span>
                      <span className="text-on-surface-variant text-xs">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-on-surface-variant">{event.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider">{event.location}</span>
                    </div>
                    <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-on-primary transition-all">
                      {event.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 md:px-12 py-32 text-center bg-surface relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black mb-8 leading-none tracking-tighter">
              Ready to <span className="text-primary italic">impact</span> the game?
            </h2>
            <p className="text-xl text-on-surface-variant mb-12">Select Save the Oceans and every swing you take becomes a ripple of hope across the globe.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-primary-fixed text-on-primary-fixed px-12 py-5 rounded-2xl font-headline font-black text-xl ambient-shadow hover:scale-105 active:scale-95 transition-all">
                Confirm Selection
              </button>
              <Link href="/charities" className="bg-surface-bright text-on-surface px-12 py-5 rounded-2xl font-headline font-black text-xl ghost-border hover:bg-surface-container transition-all">
                Back to Explore
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
