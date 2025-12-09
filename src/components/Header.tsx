"use client";
import React, { useState, useEffect } from "react";
import { Truck, Moon, Sun} from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onThemeToggle, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
      setMenuOpen(false);
    }
  }

  const isActive = (section: string) => 
    activeSection === section ? "underline underline-offset-8 decoration-2 text-primary-green dark:text-secondary-green" : "";

  const headerBgClass = scrolled 
    ? "bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg" 
    : activeSection === "home" 
      ? "bg-transparent" 
      : "bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <nav className="flex justify-between items-center px-4 md:px-10 py-4">
        <div className="flex items-center gap-2">
         <Truck size={45} className="text-primary-green dark:text-secondary-green" />
          <h1 className="text-primary-green text-2xl md:text-3xl font-bold tracking-wide dark:text-secondary-green">
            GreenEx
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-90">
          <div className="flex items-center gap-20 font-medium text-lg ">
            <button 
              onClick={() => scrollToSection("home")}
              className={`${isActive("home")} hover:text-primary-green dark:hover:text-secondary-green transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className={`${isActive("about")}  hover:text-primary-green dark:hover:text-secondary-green transition-colors`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className={`${isActive("services")} hover:text-primary-green dark:hover:text-secondary-green transition-colors`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className={`${isActive("contact")} hover:text-primary-green dark:hover:text-secondary-green transition-colors`}
            >
              Contact Us
            </button>
          </div>

          <div className="flex items-center gap-12">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => scrollToSection("/signin")}
              className="bg-primary-green dark:bg-secondary-green text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
            >
              Request a pickup
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className="text-foreground text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 md:hidden bg-white dark:bg-dark-bg w-full h-full z-40 flex flex-col items-center justify-center text-foreground transition-all duration-300 ease-in-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-xl font-medium p-4 w-full max-w-xs">
          <button 
            onClick={() => scrollToSection("home")}
            className={`${isActive("home")} hover:text-primary-green dark:hover:text-secondary-green transition-colors duration-200 py-2 w-full text-center`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")}
            className={`${isActive("about")} hover:text-primary-green dark:hover:text-secondary-green transition-colors duration-200 py-2 w-full text-center`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("services")}
            className={`${isActive("services")} hover:text-primary-green dark:hover:text-secondary-green transition-colors duration-200 py-2 w-full text-center`}
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className={`${isActive("contact")} hover:text-primary-green dark:hover:text-secondary-green transition-colors duration-200 py-2 w-full text-center`}
          >
            Contact Us
          </button>

          <button 
            onClick={() => scrollToSection("contact")}
            className="bg-primary-green dark:bg-secondary-green text-white px-8 py-3 rounded-xl font-medium mt-6 text-base hover:bg-opacity-90 transition-colors w-full"
          >
            Request a pickup
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;