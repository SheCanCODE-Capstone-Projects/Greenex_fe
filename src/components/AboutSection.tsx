"use client";
import React from "react";
import { Truck, Users, MapPin, FileText } from "lucide-react";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen w-full bg-light-bg dark:bg-gray-900 py-20 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* About Us Header - Matching the exact layout from image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Images Grid */}
          <div className="relative">
            {/* Main container with 2x2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - Truck Image */}
              <div className="animate-fade-in-left">
                <img
                  src="/About1.png"
                  alt="GreenEx Truck"
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>

              {/* Top Right - Building/Location Image */}
              <div className="animate-fade-in-left animation-delay-100">
                <img
                  src="/About2.png"
                  alt="Location"
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>

              {/* Bottom - Team Image spanning both columns */}
              <div className="col-span-2 animate-fade-in-left animation-delay-200">
                <div className="relative">
                  <img
                    src="/About3.png"
                    alt="GreenEx Team"
                    className="rounded-xl shadow-lg w-full h-48 object-cover"
                  />
                  {/* Green Badge Overlay */}
                  <div className="absolute bottom-4 left-4 bg-primary-green text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                    GreenEx
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - About Text */}
          <div className="space-y-6 animate-fade-in-right">
            <h2 className="text-5xl md:text-6xl font-bold text-primary-green">
              About Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              The Smart Waste Collection Management Information System (MIS) is a
              digital platform created to transform how waste is collected,
              tracked, and managed across Rwanda. It bridges the gap between
              households, companies, and private garbage collection companies by
              providing a modern and reliable technology solution.
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary-green text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#2E7D32] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
            >
              Explore More
            </Link>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-primary-green rounded-3xl p-10 md:p-16 text-center mb-20 animate-scale-in shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Mission
          </h3>
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            GreenEx is committed to revolutionizing waste collection in Rwanda&apos;s
            technology. We empower citizens, companies, and private
            garbage collectors for a cleaner, healthier, and more sustainable
            future. Our vision is a Rwanda where smart waste management brings
            vibrant and eco-friendly communities.
          </p>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-4">
            <Truck className="text-white" size={48} />
          </div>
          <p className="text-white/90 text-sm font-medium">
            GreenEx - for sustainable Rwanda
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Helping a local <span className="text-primary-green">village</span>{" "}
              keeping it&apos;s <span className="text-primary-green">cleaness</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We started here with our hard work and ambition
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-light-bg dark:bg-gray-700 hover:shadow-lg transition-shadow animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4">
                <Users className="text-primary-green" size={32} />
              </div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                30,000
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Residents
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-light-bg dark:bg-gray-700 hover:shadow-lg transition-shadow animate-fade-in-up animation-delay-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4">
                <MapPin className="text-primary-green" size={32} />
              </div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                30
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Territories
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-light-bg dark:bg-gray-700 hover:shadow-lg transition-shadow animate-fade-in-up animation-delay-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4">
                <Users className="text-primary-green" size={32} />
              </div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                23
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Subscribing Companies
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-light-bg dark:bg-gray-700 hover:shadow-lg transition-shadow animate-fade-in-up animation-delay-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4">
                <FileText className="text-primary-green" size={32} />
              </div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                23
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Districts
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center animate-fade-in-up">
          <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Partners
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            We have been working with some Fortune 5+ organaisation
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-7 gap-6 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div
                key={item}
                className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md"
              >
                <span className="text-gray-400 dark:text-gray-500 text-xs font-bold">
                  Logo {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for animation delays */}
      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;