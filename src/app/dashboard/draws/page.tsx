"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DrawsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-7xl mx-auto pb-20">
      {/* Hero: Upcoming Draws */}
      <motion.section variants={fadeInUp} className="mb-24 relative">
        <div className="absolute -top-24 -right-12 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -z-10" />
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-tight tracking-tighter mb-4">
              UPCOMING <span className="text-secondary italic">DRAWS</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl font-medium max-w-md">
              Your monthly opportunity to turn birdies into breakthroughs. The more you play, the more we give.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl w-full md:w-auto min-w-[320px] ambient-shadow">
            <div className="text-on-surface-variant text-xs uppercase font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Next Monthly Reward Draw
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="font-headline text-4xl text-primary">14</span>
                <span className="text-[10px] uppercase text-outline font-bold tracking-widest mt-1">Days</span>
              </div>
              <span className="text-4xl text-outline-variant mt-[-4px]">:</span>
              <div className="flex flex-col items-center">
                <span className="font-headline text-4xl text-primary">22</span>
                <span className="text-[10px] uppercase text-outline font-bold tracking-widest mt-1">Hours</span>
              </div>
              <span className="text-4xl text-outline-variant mt-[-4px]">:</span>
              <div className="flex flex-col items-center">
                <span className="font-headline text-4xl text-primary">45</span>
                <span className="text-[10px] uppercase text-outline font-bold tracking-widest mt-1">Mins</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Middle Section: Supported Charities */}
      <motion.section variants={fadeInUp} className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Supported Charities</h2>
          <button className="text-tertiary font-bold hover:underline underline-offset-8 transition-all hidden sm:block">
            View All Organizations
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: "save-the-oceans",
              name: "Save the Oceans",
              desc: "Protecting marine biodiversity and cleaning plastic from our global coastlines through innovative tech.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnoO_JxiUyQMO1JG-JCg0bo3TlFczIT2KtiSI8hl0WJkYA5Y4CLlv32TCU3N0sRTzhKWqxqMqJS8vZf_dMPhT5mJXqmeLIyDXTRq_YBPuLpFVXq-rZqi8tFbtlVimP7u9jXc6g96-AkPgzZ8zhBLyCR54J5oKIwUZkcFiioVCdCpp4sO9Y6_VEF30_Mx_eOYLGBDb2-f1MrsoK_Pr9LfLWUD3rXUahjI_coFcXtbx6B96U6JGP2LUS2Lfk3Xzl04SL1-eNCe5jTff8",
              supporting: true,
            },
            {
              id: "junior-golf-fund",
              name: "Junior Golf Fund",
              desc: "Empowering the next generation of players by providing equipment and coaching to underprivileged communities.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbWBD6x7xqD8N4rGP57lhZa9E9g3Wh3Q5gEoE8tpvYyIJeaTyL1QtGIu_MUa7RiPs3x8HSbK8cosh1ws40R3yE42qG_THP7OKjTnM8cIUAInr2c7oEqnPC1kzFPPUBm7egoQ0F2eJ6P1TBkJoGBI8lKOP-6oSMTlN2TfHkbHHnOkn9OsS41PsPpV5ghp9P7U5rynfDFZ4Yigr54WvnozEEetBidLZuzYNflaOTzUaVGL-mU8-ZqYRfbyxbfga8h_BNwHh7jnEG0fma",
              supporting: false,
            },
            {
              id: "green-links",
              name: "Green Links",
              desc: "Reforestation initiatives focused on offsetting the environmental footprint of global sporting events.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZL2Xu49sMqeErClKLEiNyMGUQC-oTa48RmHEQWNpkgAZuFV0oyleaepaDZlNRNyqixCiuvSTdY07UcvJpKP9wqRdxmdhFMKAuubW2LxqUpxiZhw1DcAGfqllEHjKJVzct5Ho3c3RRZh5PZuWl-FtvYlz_BvwEPqpHJ-gurkrYuwVttxiBVXMJEAAEHl7-3AXz4_GU-ufLKKqxUAz4DMBEWKr4P_cgD_CFISufauLkEaDgTY-kNF6Z8Uqt0PMk5VlgG54cWR3bggJ",
              supporting: false,
            },
          ].map((charity) => (
            <div key={charity.id} className="bg-surface-container-low group hover:bg-surface-container-high transition-all duration-500 rounded-3xl p-1 relative overflow-hidden ghost-border">
              {charity.supporting && (
                <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-black uppercase px-3 py-1 rounded-full z-10">Supporting</div>
              )}
              <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={charity.img}
                  alt={charity.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
              </div>
              <div className="px-6 pb-8">
                <h3 className="font-headline text-2xl font-bold mb-3">{charity.name}</h3>
                <p className="text-on-surface-variant font-body mb-6 text-sm leading-relaxed">{charity.desc}</p>
                {charity.supporting ? (
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-bright flex items-center justify-center text-[10px] font-bold">JD</div>
                      <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-bright flex items-center justify-center text-[10px] font-bold">MK</div>
                      <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-bright flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                    <span className="text-xs font-bold text-primary">Active Choice</span>
                  </div>
                ) : (
                  <button className="w-full py-3 rounded-xl border border-outline-variant text-on-surface font-bold hover:bg-surface-bright transition-colors">Switch Support</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bottom Section: Past Draw Results */}
      <motion.section variants={fadeInUp}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Past Draw Results</h2>
            <p className="text-on-surface-variant">Celebrating our community of winners and their impact.</p>
          </div>
          {/* Rollover Status */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">5-Match Jackpot Status</div>
              <div className="text-2xl font-headline font-black text-on-surface">ROLLOVER: $45,000.00</div>
            </div>
          </div>
        </div>

        {/* Bento Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Large Featured Winner */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-primary/10">
              <span className="material-symbols-outlined text-9xl">military_tech</span>
            </div>
            <div className="relative z-10">
              <div className="inline-block bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                Last Month&apos;s Top Winner
              </div>
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/20">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1rKUV7x2RsM927pqfsnRuERP_tCPWszIGnz8psCFbYzDxXE3piPPCrcdYMto84ivieRXDf4SxjB5pb2HqEcy0NwfHpHb8stYyiRkuDM0BHnh9JDQsclyNLJxRdPjIjcW1TobXwN8ZHxzqzbksJgu3IqqKrSF40Yf5aflVGbKLHdcAtH1fZct4jt-j8rb0SQ0MuGhHYPOaxOieHp91izDr9zHKvUTEGrZ_v1gpwLNNeUYVsvULqPYhJ8OOIjNlhuEqAYiJ8Bq7UCdv"
                    alt="Winner Portrait"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-headline text-3xl font-bold mb-1">Marcus Chen</h4>
                  <p className="text-on-surface-variant font-medium text-sm">Eagle Valley Club • Member since 2022</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface/40 p-5 rounded-2xl ghost-border">
                  <div className="text-[10px] text-outline font-bold uppercase tracking-wider mb-2">Prize Won</div>
                  <div className="text-2xl sm:text-3xl font-headline font-black text-primary">$12,500<span className="text-xl">.00</span></div>
                </div>
                <div className="bg-surface/40 p-5 rounded-2xl ghost-border">
                  <div className="text-[10px] text-outline font-bold uppercase tracking-wider mb-2">Impact Generated</div>
                  <div className="text-2xl sm:text-3xl font-headline font-black text-secondary">$3,125<span className="text-xl">.00</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { pos: "02", name: "Sarah Jenkins", club: "Royal St. Georges", prize: "$5,000", tag: "Runner Up" },
              { pos: "03", name: "Robert Miller", club: "Pinehurst No. 2", prize: "$2,500", tag: "Runner Up" },
              { pos: "04", name: "Elena Rodriguez", club: "The Old Course", prize: "$1,000", tag: "Consolation" },
              { pos: "05", name: "David Thompson", club: "Cypress Point", prize: "$1,000", tag: "Consolation" },
            ].map((winner) => (
              <div key={winner.pos} className="bg-surface-container-low hover:bg-surface-container-high transition-colors p-5 rounded-3xl flex items-center justify-between ghost-border group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-surface-bright rounded-2xl flex items-center justify-center font-bold text-outline group-hover:text-primary transition-colors">
                    {winner.pos}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{winner.name}</div>
                    <div className="text-sm text-on-surface-variant">{winner.club}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline font-black text-xl text-primary">{winner.prize}</div>
                  <div className="text-[10px] text-outline uppercase font-bold tracking-widest">{winner.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
