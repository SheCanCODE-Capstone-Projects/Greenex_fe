"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Lock,
    Eye,
    Database,
    UserPlus,
    Share2,
    ShieldCheck,
    ArrowLeft,
    Clock,
    Fingerprint,
    Mail,
    Smartphone,
    Shield,
    EyeOff,
    Search,
    Key,
    ShieldAlert,
    Truck
} from "lucide-react";

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState("collection");

    const sections = [
        { id: "collection", title: "Information We Collect", icon: Database },
        { id: "usage", title: "How We Use Data", icon: Eye },
        { id: "protection", title: "Data Protection", icon: Lock },
        { id: "rights", title: "Your Rights", icon: UserPlus },
        { id: "sharing", title: "Third-Party Sharing", icon: Share2 },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 120,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFCFA] dark:bg-[#040D07] text-[var(--text-dark)] dark:text-[var(--text-light)] font-sans transition-colors duration-500">
            {/* Mesh Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[var(--secondary-green)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[var(--primary-green)]/5 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-emerald-500/5 blur-[140px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#040D07]/80 backdrop-blur-xl border-b border-green-50 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[var(--primary-green)] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20">
                            <Truck size={20} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-black tracking-tight tracking-tighter">GreenEx <span className="text-[var(--primary-green)]">Privacy</span></span>
                    </Link>
                    <div className="flex gap-6">
                        <Link href="/terms" className="text-sm font-bold opacity-60 hover:text-[var(--primary-green)] transition-all">Terms</Link>
                        <Link href="/signup" className="text-sm font-bold text-[var(--primary-green)] bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-full">Secure Sign Up</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-8 pt-40 pb-40 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Vertical Index Sidebar */}
                    <aside className="lg:w-[320px] shrink-0">
                        <div className="sticky top-32">
                            <div className="bg-white dark:bg-white/5 border border-green-50 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-green-900/10 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-10 px-2">
                                    <div className="w-1.5 h-6 bg-[var(--primary-green)] rounded-full" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Security Index</h3>
                                </div>

                                <nav className="flex flex-col gap-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-500 group ${activeSection === section.id
                                                ? "bg-[var(--primary-green)] text-white shadow-2xl shadow-green-600/30 -translate-y-1"
                                                : "text-gray-400 hover:bg-green-50 dark:hover:bg-white/5 hover:text-[var(--primary-green)]"
                                                }`}
                                        >
                                            <section.icon size={20} className={activeSection === section.id ? "text-white" : "group-hover:scale-110 transition-transform"} />
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>

                                <div className="mt-12 pt-10 border-t border-green-50 dark:border-white/10 flex items-center gap-4 px-2">
                                    <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500">
                                        <Fingerprint size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Encrypted Endpoint</p>
                                        <p className="text-xs font-medium opacity-50 leading-tight">AES-256 standard active across all nodes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Luxury Typography Content */}
                    <main className="flex-1 space-y-40">
                        {/* Page Header */}
                        <section className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 text-[var(--primary-green)] font-black text-xs uppercase tracking-[0.4em]">
                                    <Clock size={14} />
                                    Last Updated: JAN 13, 2026
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-[var(--text-dark)] dark:text-white">
                                    Data. <br /><span className="text-[var(--primary-green)]">Transparency.</span><br />Trust.
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed pt-8">
                                    We treat your digital footprint with the same care we treat the environment. Absolute transparency, no hidden fine print.
                                </p>
                            </motion.div>
                        </section>

                        {/* Content Sections */}
                        {sections.map((section, idx) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32 "
                                onMouseEnter={() => setActiveSection(section.id)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="space-y-12"
                                >
                                    <div className="flex items-baseline gap-6">
                                        <span className="text-8xl font-black opacity-5 dark:opacity-10 pointer-events-none select-none">0{idx + 1}</span>
                                        <h2 className="text-4xl md:text-5xl font-black tracking-tight -ml-20 md:-ml-32">{section.title}</h2>
                                    </div>

                                    <div className="max-w-4xl space-y-8 text-xl font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                        {section.id === "collection" && (
                                            <>
                                                <p>We prioritize data minimization. We only collect what is strictly necessary to route a truck or verify a household bill.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-12">
                                                    <div className="p-8 bg-white dark:bg-white/5 rounded-[2rem] border border-green-50 dark:border-white/10 shadow-xl flex items-start gap-4">
                                                        <Smartphone className="text-[var(--primary-green)] mt-1" />
                                                        <div>
                                                            <h4 className="font-black text-[var(--text-dark)] dark:text-white mb-1">Telemetry Data</h4>
                                                            <p className="text-sm opacity-60">Real-time coordinates and device status for optimized routing.</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-8 bg-white dark:bg-white/5 rounded-[2rem] border border-green-50 dark:border-white/10 shadow-xl flex items-start gap-4">
                                                        <Search className="text-[var(--primary-green)] mt-1" />
                                                        <div>
                                                            <h4 className="font-black text-[var(--text-dark)] dark:text-white mb-1">Verification Logs</h4>
                                                            <p className="text-sm opacity-60">Digital copies of operating licenses for waste companies.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {section.id === "usage" && (
                                            <div className="grid gap-6">
                                                {[
                                                    "Processing service requests and instant invoicing.",
                                                    "Analyzing high-waste zones for municipal reporting.",
                                                    "Security monitoring to prevent unauthorized dashboard access.",
                                                    "Improving our predictive AI for garbage collection cycles."
                                                ].map((text, i) => (
                                                    <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-green-50/50 dark:bg-white/5 border border-green-100 dark:border-white/10 hover:border-[var(--primary-green)] transition-all">
                                                        <div className="w-10 h-10 rounded-xl bg-[var(--primary-green)]/10 text-[var(--primary-green)] flex items-center justify-center font-black">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.id === "protection" && (
                                            <div className="relative p-12 bg-[var(--dark-bg)] rounded-[3rem] text-white shadow-3xl overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] -mr-32 -mt-32 animate-pulse" />
                                                <div className="relative z-10 space-y-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-4 bg-[var(--primary-green)] rounded-2xl">
                                                            <Key size={32} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-3xl font-black uppercase tracking-tighter">Vault Protocol</h4>
                                                            <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Military Grade Encryption</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg opacity-70 leading-relaxed font-bold">
                                                        All passwords are salted and hashed using Argon2id. We utilize end-to-end encryption for all real-time communication between fleet monitors and disposal centers.
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <div className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest bg-white/5">TLS 1.3</div>
                                                        <div className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest bg-white/5">SOC-2 Type II Compliant</div>
                                                        <div className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest bg-white/5">Zero-Trust Network</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {section.id === "rights" && (
                                            <div className="space-y-8">
                                                <p>You own your data. Greenex provides native dashboard tools to export or permanently purge your footprint from our cloud edge servers.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="p-10 rounded-[2.5rem] border-2 border-[var(--primary-green)]/10 bg-white dark:bg-white/5 flex flex-col gap-6">
                                                        <EyeOff size={40} className="text-[var(--primary-green)]" />
                                                        <h4 className="text-2xl font-black">Right to be Forgotten</h4>
                                                        <p className="text-base opacity-60">Permanently delete your profile and all historical geolocation data with a single request.</p>
                                                    </div>
                                                    <div className="p-10 rounded-[2.5rem] border-2 border-[var(--primary-green)]/10 bg-white dark:bg-white/5 flex flex-col gap-6">
                                                        <ShieldCheck size={40} className="text-[var(--primary-green)]" />
                                                        <h4 className="text-2xl font-black">Data Portability</h4>
                                                        <p className="text-base opacity-60">Export your pickup logs and invoices in secure JSON or PDF formats at any time.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {section.id === "sharing" && (
                                            <div className="p-8 bg-black dark:bg-emerald-950/20 rounded-[2.5rem] border border-white/10 text-white flex gap-8 items-center">
                                                <div className="shrink-0 w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                                    <ShieldAlert size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black mb-1">Zero Third-Party Sales</h4>
                                                    <p className="text-sm opacity-60">We never trade, sell, or rent your identifiable data to advertising networks or external data brokers.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </section>
                        ))}

                        {/* Premium CTA */}
                        <section className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-green)] to-[var(--secondary-green)] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative overflow-hidden bg-[var(--dark-bg)] rounded-[4rem] p-16 md:p-24 text-center">
                                <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-[radial-gradient(circle,rgba(56,142,60,0.15)_0%,transparent_70%)]" />
                                <h2 className="relative z-10 text-5xl md:text-7xl font-black text-white tracking-tighter mb-12 leading-[1]">Your Privacy <br />is our <span className="text-[var(--primary-green)]">Priority.</span></h2>
                                <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/signup" className="px-12 py-5 bg-[var(--primary-green)] text-white rounded-[2rem] font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-green-600/40">Secure Your Account</Link>
                                    <Link href="/terms" className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-[2rem] font-black text-lg hover:bg-white/20 transition-all">Review Terms</Link>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <footer className="py-20 border-t border-green-50 dark:border-white/5 flex flex-col items-center gap-4">
                <div className="flex gap-10">
                    <a href="#" className="text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Cloud Edge</a>
                    <a href="#" className="text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Encrypted Node</a>
                    <a href="#" className="text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">RW CLEAN TECH</a>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-20">© 2026 Greenex Platforms . All Rights Reserved</p>
            </footer>
        </div>
    );
}
