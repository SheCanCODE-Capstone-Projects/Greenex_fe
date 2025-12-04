'use client';
import React, { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path ? "underline underline-offset-8 text-emerald-300" : "";

  // Typing Animation
  const fullText = "GreenEx";
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsTypingDone(true), 200);
      }
    }, 130);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/landingImage.png')" }}
    >
      <div className="absolute inset-0 bg-[#0c351f]/80"></div>

      
      <nav className="absolute top-0 inset-x-0 flex justify-between items-center px-4 md:px-10 py-5 z-20">
      
        <div className="flex items-center gap-2">
          <Truck size={45} className="text-white" />
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
            GreenEx
          </h1>
        </div>

        
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-10 text-white font-medium text-lg pr-10 lg:pr-40">
            <Link className={`${isActive("/")} hover:text-emerald-300 transition`} href="/">
              Home
            </Link>
            <Link className={`${isActive("/about")} hover:text-emerald-300 transition`} href="/about">
              About
            </Link>
            <Link className={`${isActive("/services")} hover:text-emerald-300 transition`} href="/services">
              Services
            </Link>
            <Link className={`${isActive("/contact")} hover:text-emerald-300 transition`} href="/contact">
              Contact Us
            </Link>
          </div>

          <button className="ml-4 lg:ml-10 bg-[#31a366] text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg font-medium hover:bg-[#2a8f57] transition">
            Request a pickup
          </button>
        </div>
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

    
      {menuOpen && (
        <div className="absolute top-16 left-0 md:hidden bg-[#0c351f]/95 w-full p-6 text-white z-20">
          <div className="flex flex-col gap-5 text-lg font-medium">
            <Link className="hover:text-emerald-300" href="/">Home</Link>
            <Link className="hover:text-emerald-300" href="/about">About</Link>
            <Link className="hover:text-emerald-300" href="/services">Services</Link>
            <Link className="hover:text-emerald-300" href="/contact">Contact Us</Link>

            <button className="bg-[#25b86a] text-white px-8 py-4 rounded-lg font-medium mt-3">
              Request a pickup
            </button>
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-4 drop-shadow-lg tracking-tight bg-gradient-to-r from-white via-white to-[#25b86a] text-transparent bg-clip-text"
        >
          {typedText}
          {!isTypingDone && (
            <span className="border-r-4 border-white animate-pulse ml-1"></span>
          )}
        </h1>

        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light opacity-90 mb-10 sm:mb-14">
          Cleaner waste management
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button className="bg-[#25b86a] text-white px-10 sm:px-14 py-3 sm:py-4 rounded-2xl text-lg sm:text-xl hover:bg-[#1f9c58] transition shadow-xl">
            Get Started
          </button>

          <button className="border-2 border-white text-white px-10 sm:px-14 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
