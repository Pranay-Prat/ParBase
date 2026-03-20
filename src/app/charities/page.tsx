"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categories = ["All Causes", "Environment", "Youth Sports", "Health & Wellness", "Community Dev", "Education"];

const charities = [
  { id: "save-the-oceans", name: "Save the Oceans", desc: "Protecting marine biodiversity and cleaning plastic from our global coastlines through innovative tech.", category: "Environment", icon: "water_drop", supporting: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnoO_JxiUyQMO1JG-JCg0bo3TlFczIT2KtiSI8hl0WJkYA5Y4CLlv32TCU3N0sRTzhKWqxqMqJS8vZf_dMPhT5mJXqmeLIyDXTRq_YBPuLpFVXq-rZqi8tFbtlVimP7u9jXc6g96-AkPgzZ8zhBLyCR54J5oKIwUZkcFiioVCdCpp4sO9Y6_VEF30_Mx_eOYLGBDb2-f1MrsoK_Pr9LfLWUD3rXUahjI_coFcXtbx6B96U6JGP2LUS2Lfk3Xzl04SL1-eNCe5jTff8" },
  { id: "junior-golf-fund", name: "Junior Golf Fund", desc: "Empowering the next generation of players by providing equipment and coaching to underprivileged communities.", category: "Youth Sports", icon: "sports_golf", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbWBD6x7xqD8N4rGP57lhZa9E9g3Wh3Q5gEoE8tpvYyIJeaTyL1QtGIu_MUa7RiPs3x8HSbK8cosh1ws40R3yE42qG_THP7OKjTnM8cIUAInr2c7oEqnPC1kzFPPUBm7egoQ0F2eJ6P1TBkJoGBI8lKOP-6oSMTlN2TfHkbHHnOkn9OsS41PsPpV5ghp9P7U5rynfDFZ4Yigr54WvnozEEetBidLZuzYNflaOTzUaVGL-mU8-ZqYRfbyxbfga8h_BNwHh7jnEG0fma" },
  { id: "heart-health", name: "Heart Health Foundation", desc: "Funding critical cardiovascular research and preventative healthcare education globally.", category: "Health & Wellness", icon: "favorite", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgGQnQcL6MLuwPXcDQvdobmI6fwbdWaQ814sZCVU7MSh7hp6hHr7FGdgZpofz8n-InWwT_638m4i7dNd4K0lBpwiLvHI3ucSbYnsyhxCBn4SjmtUWdtZjJwC3ra8gRYy5INJvePuu7gyPAMJC-i8INd6l45CJ4ZNMx-VTS37-PBmqqR8Q3oHlMkOObtGOWTF2m5gGLLQegBpCY4ono-UDfOaF5ZQLOxvfHcO3psQaH8xrBm0QblDKiQd-Ekrl1EKpyvw4iSbljGAiD" },
  { id: "literacy-for-all", name: "Literacy for All", desc: "Providing books and educational resources to children in remote and rural areas.", category: "Education", icon: "menu_book", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCicmzOip1YFJ1aoWfo-I4i64K6w7XEV747DQ7DYSiQTW83f1SomNmfmUGx93cfJMebZGYA_UMQZTXvZdddxXpxqNgAlbMgEtU8Zp-vT2dpJGtyq5uYcrUjeIxpWcXckAb3HJadA8CVrqqUmnloCay2PyA0ZntYcoxocTF_rfhitlH3T7pCdV-Zk9g-prT8qxeVjD_s_OWZZk214rm_i87KF8f8Y0bObz4AyZj148yyq2BTUa281hh_Sb5AguvCnteGsiXt2KeZgxdc" },
  { id: "urban-gardens", name: "Urban Gardens", desc: "Transforming vacant city lots into vibrant community gardens and food sources.", category: "Community Dev", icon: "potted_plant", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBVSxYliTcuVI2Ozy-_vmHVABQVP-WIxYyxd67QK4StTLJfm395NGQvX7PPo0XFmBeY0ZXDIkxHtWnrSGld7mRkooao3CYPdG_siGc64O8b66ixPzzJvzHYfE3ka_gAoSTpAFAsIu01J60i5TVFQoEaZvjXynyx41NL8X1fLuYIje_GQLkWQHX0uv8hgQA1zN-wbq69faD76emNgKWBTbqRdcwh9Wl6BbZnN8-niRh-r4LxsO8qfiEzBFdaFBJN2z2Tavf0meyjJyV" },
  { id: "tech-for-good", name: "Tech for Good", desc: "Bridging the digital divide by recycling old hardware for non-profits and schools.", category: "Education", icon: "developer_board", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_FP__kADV9AyI2-1AX3ushOlzGKtHyxxvMgEfKadZUgvpNCjfh9e0Tf0eEG_c-MVTKxN5UzTla6BulF2jbLknLqQtil_qm0Wlgl_914bNBHRylSiUBNuaL0rB8r8Oc2VsXLfuIRI03EKTs655tymQ-jEv5_M3uJfD3nMYcwL65ogpdsWyXXxvREDDtsubyIZNKEsaFAIYt7QnnjKRuq1ptF7wCTTfpMcAuOZUOmTUsNfaux-n84fbCf1SOW5gMh4LbfG9oc7V5Txt" },
];

export default function CharitiesPage() {
  const [activeFilter, setActiveFilter] = useState("All Causes");
  const [search, setSearch] = useState("");

  const filtered = charities.filter((c) => {
    const matchCat = activeFilter === "All Causes" || c.category === activeFilter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>

      <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        {/* Header & Search */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-on-surface leading-tight tracking-tighter mb-2">
                CHARITY <span className="text-secondary">DIRECTORY</span>
              </h1>
              <p className="text-on-surface-variant font-medium">Find the causes that fuel your fire on the course.</p>
            </motion.div>
            <div className="relative w-full md:w-96 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                className="w-full bg-surface-container-high border-2 border-outline-variant/20 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-surface-container-highest text-on-surface placeholder:text-outline/60 transition-all"
                placeholder="Search by name or mission..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  activeFilter === cat
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                    : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Charity Spotlight */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-2xl bg-surface-container ghost-border group">
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent z-10" />
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZL2Xu49sMqeErClKLEiNyMGUQC-oTa48RmHEQWNpkgAZuFV0oyleaepaDZlNRNyqixCiuvSTdY07UcvJpKP9wqRdxmdhFMKAuubW2LxqUpxiZhw1DcAGfqllEHjKJVzct5Ho3c3RRZh5PZuWl-FtvYlz_BvwEPqpHJ-gurkrYuwVttxiBVXMJEAAEHl7-3AXz4_GU-ufLKKqxUAz4DMBEWKr4P_cgD_CFISufauLkEaDgTY-kNF6Z8Uqt0PMk5VlgG54cWR3bggJ"
              alt="Featured Charity Background"
              fill
              className="object-cover opacity-40 scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="relative z-20 p-8 md:p-12 flex flex-col items-start max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-8">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                Spotlight Organization
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-4 leading-none">Green Links Reforestation</h2>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                Join the mission to plant 1 million trees on former industrial sites.
                Every birdie you score helps fund a new sapling. Currently leading our
                &apos;Environment&apos; category with over 4,500 active supporters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/charities/green-links" className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                  Learn Their Story
                </Link>
                <button className="bg-surface-bright/50 backdrop-blur text-on-surface ghost-border px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-surface-bright transition-colors">
                  Switch Support
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Charity Grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h3 className="font-headline text-2xl font-bold">All Organizations</h3>
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-4 border border-primary/20 bg-primary/5">
            <span className="material-symbols-outlined text-primary">volunteer_activism</span>
            <span className="text-sm font-bold text-on-surface">Support any charity independently?</span>
            <button className="text-primary hover:underline text-sm font-black uppercase tracking-widest">Donate Directly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((charity, i) => (
            <motion.div
              key={charity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/charities/${charity.id}`}
                className={`block bg-surface-container-low group hover:bg-surface-container-high transition-all duration-500 rounded-2xl p-1 relative overflow-hidden ghost-border ${
                  charity.supporting ? "ring-1 ring-primary/20" : ""
                }`}
              >
                {charity.supporting && (
                  <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-black uppercase px-3 py-1 rounded-full z-20 shadow-lg">
                    Supporting
                  </div>
                )}
                <div className="relative h-48 overflow-hidden rounded-2xl">
                  <Image
                    src={charity.img}
                    alt={charity.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                  <div className="absolute bottom-4 left-6 bg-inverse-surface rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                    <span className="material-symbols-outlined text-surface text-3xl">{charity.icon}</span>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <h4 className="font-headline text-xl font-bold mb-2">{charity.name}</h4>
                  <p className="text-on-surface-variant font-body mb-6 text-sm leading-relaxed line-clamp-2">
                    {charity.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
                      {charity.category}
                    </span>
                    {charity.supporting ? (
                      <div className="flex items-center gap-1 text-primary text-xs font-bold">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Active Choice
                      </div>
                    ) : (
                      <span className="text-xs font-black text-on-surface hover:text-primary transition-colors uppercase tracking-widest">
                        Select Charity
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-2 text-on-surface font-black uppercase tracking-[0.2em] text-sm bg-surface-container-high px-10 py-5 rounded-2xl hover:bg-surface-variant transition-colors ghost-border">
            Load More Charities
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
