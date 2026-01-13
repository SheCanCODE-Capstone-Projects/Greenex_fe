"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    FileText,
    ChevronRight,
    Clock,
    ArrowLeft,
    ShieldAlert,
    UserCheck,
    BadgeCheck,
    Scale,
    Gavel,
    CheckCircle2,
    Truck
} from "lucide-react";

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState("introduction");

    const sections = [
        { id: "introduction", title: "Introduction", icon: FileText, content: "Welcome to Greenex. These Terms and Conditions govern your use of our platform and waste management services." },
        { id: "acceptance", title: "Acceptance", icon: UserCheck, content: "By accessing Greenex, you agree to bound by these terms legally." },
        { id: "services", title: "Our Services", icon: BadgeCheck, content: "Coordination between citizens and licensed waste management providers." },
        { id: "conduct", title: "User Conduct", icon: ShieldAlert, content: "Guidelines for maintaining a respectful and efficient community." },
        { id: "liability", title: "Legal Bounds", icon: Scale, content: "Understanding the limits of responsibility and service warranty." },
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
        <div className="min-h-screen bg-[#F8FAF8] dark:bg-[#06140B] text-[var(--text-dark)] dark:text-[var(--text-light)] font-sans selection:bg-[var(--primary-green)] selection:text-white">
            {/* Premium Glass Header */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#06140B]/70 backdrop-blur-xl border-b border-green-100 dark:border-green-900/30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-[var(--primary-green)] rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
                            <Truck size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-[var(--text-dark)] dark:text-white">GreenEx</span>
                    </Link>
                    <div className="hidden md:flex gap-8">
                        <Link href="/signin" className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">Sign In</Link>
                        <Link href="/signup" className="text-sm font-bold text-[var(--primary-green)]">Join Platform</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Mesh Gradient */}
            <header className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[var(--primary-green)]/10 blur-[120px] rounded-full animate-float" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-[var(--secondary-green)]/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-green)] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-green-900/20">
                            <Gavel size={12} />
                            Platform Guidelines
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1]">
                            Terms of <span className="text-[var(--primary-green)]">Service.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                            Legal clarity for our community. Ensuring a sustainable and transparent partnership between our users and providers.
                        </p>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[300px_1fr] gap-20 pb-40">
                {/* Modern Nav Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-32 space-y-8">
                        <div className="bg-white dark:bg-white/5 p-2 rounded-3xl border border-green-100 dark:border-white/10 shadow-2xl shadow-green-900/5 backdrop-blur-sm">
                            <nav className="flex flex-col gap-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeSection === section.id
                                            ? "bg-[var(--primary-green)] text-white shadow-xl shadow-green-600/30 scale-[1.05]"
                                            : "text-gray-400 hover:text-[var(--primary-green)] hover:bg-green-50/50 dark:hover:bg-white/5"
                                            }`}
                                    >
                                        <section.icon size={20} className={activeSection === section.id ? "text-white" : ""} />
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-8 bg-[var(--dark-bg)] rounded-3xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-green)] opacity-20 blur-3xl -mr-10 -mt-10 group-hover:opacity-40 transition-opacity" />
                            <div className="relative z-10">
                                <ShieldCheck className="text-[var(--secondary-green)] mb-4" size={32} />
                                <h4 className="text-lg font-bold mb-2">Need Help?</h4>
                                <p className="text-sm opacity-60 leading-relaxed">Our legal experts are ready to assist with any questions.</p>
                                <a href="mailto:legal@greenex.rw" className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-[var(--secondary-green)] hover:underline">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Section */}
                <main className="space-y-32">
                    {sections.map((section, idx) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-32 group"
                            onMouseEnter={() => setActiveSection(section.id)}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative"
                            >
                                <div className="absolute -left-12 top-0 h-full w-1 bg-green-50 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="w-full bg-[var(--primary-green)] rounded-full"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-6xl font-black text-green-100 dark:text-white/5 select-none">0{idx + 1}</span>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">{section.title}</h2>
                                </div>

                                <div className="prose prose-xl dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                    {section.id === "introduction" && (
                                        <>
                                            <p>These Platform Terms and Conditions ("Terms") are entered into between Greenex Platforms Ltd ("Greenex", "we", "us", or "our") and the individual or legal entity accessing our services ("User", "you").</p>
                                            <p>By registering, accessed, or using any part of the Greenex ecosystem—including our desktop dashboard, mobile applications, and IoT sensors—you unconditionally accept these terms.</p>
                                            <div className="not-prose grid gap-4 mt-12">
                                                <div className="p-6 bg-white dark:bg-white/5 rounded-3xl border border-green-100 dark:border-white/10 shadow-lg flex items-start gap-4">
                                                    <CheckCircle2 className="text-[var(--primary-green)] mt-1 shrink-0" size={24} />
                                                    <div>
                                                        <h4 className="text-lg font-black mb-1">Environmental Compliance</h4>
                                                        <p className="text-sm opacity-60 italic">"We align all digital workflows with the Rwanda Environmental Management Authority (REMA) guidelines."</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {section.id === "acceptance" && (
                                        <>
                                            <p>Full legal capacity is required. If you are a Resident, you must be 18+. If you are a Manager, you must represent a registered Waste Managing Company with valid operating licenses.</p>
                                            <div className="not-prose p-8 bg-green-50 dark:bg-white/5 rounded-[2rem] border-2 border-dashed border-[var(--primary-green)]/20 mt-8 relative group">
                                                <div className="absolute -top-4 -right-4 bg-[var(--primary-green)] text-white p-2 rounded-xl rotate-12 group-hover:rotate-0 transition-transform">
                                                    <Scale size={20} />
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-[var(--primary-green)]" />
                                                        <span>Mandatory Electronic Signature verification for all managers.</span>
                                                    </li>
                                                    <li className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-[var(--primary-green)]" />
                                                        <span>Real-time GPS tracking data sharing agreement.</span>
                                                    </li>
                                                    <li className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-[var(--primary-green)]" />
                                                        <span>Automatic billing and digital invoice generation consent.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}

                                    {section.id === "services" && (
                                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                                            <div className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-green-100 dark:border-white/10 hover:shadow-2xl hover:border-[var(--primary-green)] transition-all">
                                                <Truck className="text-[var(--primary-green)] mb-6" size={40} />
                                                <h4 className="text-2xl font-black mb-4 tracking-tight">Fleet Management</h4>
                                                <p className="text-base opacity-70">Dedicated tools for zone analysis, route creation, and workforce dispatching for service providers.</p>
                                            </div>
                                            <div className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-green-100 dark:border-white/10 hover:shadow-2xl hover:border-[var(--primary-green)] transition-all">
                                                <UserCheck className="text-[var(--primary-green)] mb-6" size={40} />
                                                <h4 className="text-2xl font-black mb-4 tracking-tight">Citizen Engagement</h4>
                                                <p className="text-base opacity-70">Direct bridge for reporting missed pickups, paying garbage fees, and viewing pickup history.</p>
                                            </div>
                                        </div>
                                    )}

                                    {section.id === "conduct" && (
                                        <div className="space-y-8">
                                            <p>The Greenex ecosystem thrives on trust. We maintain a zero-tolerance policy regarding fraudulent document uploads or falsified pickup reports.</p>
                                            <div className="bg-red-50 dark:bg-red-950/20 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/30">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <ShieldAlert className="text-red-600" size={32} />
                                                    <h4 className="text-2xl font-black text-red-900 dark:text-red-400 uppercase tracking-tighter">Prohibition Matrix</h4>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-red-800 dark:text-red-300 font-bold">
                                                    <div className="flex gap-3"><span>✕</span><span>Data scraping and reverse engineering</span></div>
                                                    <div className="flex gap-3"><span>✕</span><span>Duplicate account registration</span></div>
                                                    <div className="flex gap-3"><span>✕</span><span>Bypassing tariff verification logs</span></div>
                                                    <div className="flex gap-3"><span>✕</span><span>Impersonating city council officials</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {section.id === "liability" && (
                                        <p>While we leverage AI for route optimization, Greenex does not guarantee that pickups will always be executed at the exact second scheduled. We are not responsible for physical property damage during waste collection.</p>
                                    )}
                                </div>
                            </motion.div>
                        </section>
                    ))}

                    {/* Call to Action Section */}
                    <section className="relative p-1 bg-[var(--primary-green)] rounded-[4rem] shadow-2xl shadow-green-900/40 transform overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                        <div className="relative bg-[var(--primary-green)] rounded-[3.8rem] p-12 md:p-20 text-center text-white">
                            <Truck className="mx-auto mb-8 animate-bounce" size={64} fill="currentColor" />
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Green Thinking. Clean Living.</h2>
                            <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto font-medium">Ready to start managing your waste with professional digital tools?</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/signup" className="px-12 py-5 bg-white text-[var(--primary-green)] rounded-3xl font-black text-lg hover:scale-105 transition-transform shadow-xl">Agree & Start</Link>
                                <Link href="/privacy" className="px-12 py-5 bg-[var(--dark-bg)] text-white rounded-3xl font-black text-lg hover:bg-black transition-colors">Privacy Policy</Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Fancy Footer Credit */}
            <footer className="py-20 border-t border-green-100 dark:border-white/5 text-center px-6">
                <p className="text-sm font-black uppercase tracking-[0.5em] opacity-20 dark:opacity-40">© 2026 Greenex Platforms . Rwanda Clean Tech</p>
            </footer>
        </div>
    );
}
