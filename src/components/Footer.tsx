"use client";
import React, { useEffect, useRef } from "react";
import { Truck, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
const Footer: React.FC = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  const footerLinks = {
    "Home": "home",
    "About Us": "about",
    "Services": "services",
    "Contact": "contact"
  };
  const services = [
    "Real-Time Alerts & Schedule",
    "Effortless Digital Payments",
    "Instant Reporting & Resolution for Missed Pickups",
  ];
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" }
  ];
  return (
    <footer className="bg-light-bg dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Truck size={40} className="text-secondary-green" />
                <h2 className="text-3xl font-bold">GreenEx</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Transforming waste management in Rwanda through innovative technology and sustainable practices.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-primary-green hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Quick Links */}
            <div className="-mt-8">
              <h3
                ref={el => { elementsRef.current[0] = el }}
                className="text-2xl font-bold mb-16 b-4 opacity-0 transform translate-y-10"
                style={{ animationDelay: "100ms" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-4">
                {Object.entries(footerLinks).map(([label, section], index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-green group-hover:scale-150 transition-transform duration-300"></span>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div className="-mt-8">
              <h3
                ref={el => { elementsRef.current[1] = el }}
                className="text-2xl font-bold mb-16 b-4 opacity-0 transform translate-y-10"
                style={{ animationDelay: "200ms" }}
              >
                Services
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <span className="text-secondary-green">›</span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact Info */}
            <div className="-mt-8">
              <h3
                ref={el => { elementsRef.current[2] = el }}
                className="text-2xl font-bold mb-16 b-4 opacity-0 transform translate-y-10"
                style={{ animationDelay: "300ms" }}
              >
                Contact Info
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-secondary-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">KN 2 Rd, Kigali Heights</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Kigali, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-secondary-green flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">+250 799 5586</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">24/7 Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-secondary-green flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">info@greenex.rw</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">greenex@rwandaclean.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Newsletter Subscription */}
          <div
            ref={el => { elementsRef.current[3] = el }}
            className="mt-16 bg-gradient-to-r from-primary-green to-secondary-green rounded-2xl p-10 text-center opacity-0 transform translate-y-10 text-white shadow-lg"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest updates on sustainable waste management.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/80 focus:outline-none focus:border-white focus:bg-white/30 transition-colors duration-300"
              />
              <button className="bg-white text-primary-green px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-900 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center text-center items-center gap-6">
            <div className="text-gray-600 dark:text-gray-400 text-center md:text-left">
              <p className="text-lg">
                © 2025 GreenEx - Creating a cleaner Rwanda through technology
              </p>
            </div>
            <div className="flex gap-8 text-sm font-semibold opacity-70">
              <Link href="/privacy" className="hover:text-primary-green transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary-green transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;