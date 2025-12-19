"use client";
import React, { useEffect, useRef } from "react";
import { Truck, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
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
    "Waste Collection",
    "Recycling",
    "Composting",
    "E-Waste Management",
    "Industrial Waste",
    "Consulting"
  ];
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" }
  ];
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Truck size={32} className="sm:w-10 sm:h-10 text-secondary-green" />
                <h2 className="text-2xl sm:text-3xl font-bold">GreenEx</h2>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Transforming waste management in Rwanda through innovative technology and sustainable practices.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full bg-gray-800 hover:bg-primary-green flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                ref={el => elementsRef.current[0] = el}
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
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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
                ref={el => elementsRef.current[1] = el}
                className="text-2xl font-bold mb-16 b-4 opacity-0 transform translate-y-10"
                style={{ animationDelay: "200ms" }}
              >
                Services
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
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
                ref={el => elementsRef.current[2] = el}
                className="text-2xl font-bold mb-16 b-4 opacity-0 transform translate-y-10"
                style={{ animationDelay: "300ms" }}
              >
                Contact Info
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-secondary-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">KN 2 Rd, Kigali Heights</p>
                    <p className="text-gray-400 text-sm">Kigali, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-secondary-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">+250 799 5586</p>
                    <p className="text-gray-400 text-sm">24/7 Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-secondary-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">info@greenex.rw</p>
                    <p className="text-gray-400 text-sm">greenex@rwandaclean.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Newsletter Subscription */}
          <div
            ref={el => elementsRef.current[3] = el}
            className="mt-16 bg-gradient-to-r from-primary-green to-secondary-green rounded-2xl p-10 text-center opacity-0 transform translate-y-10"
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
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors duration-300"
              />
              <button className="bg-white text-primary-green dark:text-secondary-green px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center text-center items-center gap-6">
            <div className="text-gray-400 text-center md:text-left">
              <p className="text-lg">
                © 2025 GreenEx - Creating a cleaner Rwanda through technology
              </p>
          
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;