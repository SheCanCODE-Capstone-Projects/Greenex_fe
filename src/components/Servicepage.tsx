"use client";

import Image from "next/image";
import React, { useState } from "react";

const services = [
  {
    title: "Real-Time Alerts & Schedule",
    description:
      "Citizens receive timely SMS/App reminders and alerts for their specific collection day. They can also view the exact upcoming date and route status.",
    image: "/Service1.png",
  },
  {
    title: "Effortless Digital Payments",
    description:
      "Seamless, integrated payment via popular mobile money channels, coupled with an easily accessible history of all past payments.",
    image: "/Service2.png",
  },
  {
    title: "Instant Reporting & Resolution for Missed Pickups",
    description:
      "A direct portal for citizens to instantly report a missed collection or request a one-off extra pickup for special waste.",
    image: "/Service3.png",
  },
];

export default function ServicePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section id="services" className={`${darkMode ? "dark" : ""}`}>
      {/* MAIN CONTAINER */}
      <div className="w-full bg-[#11ab54] dark:bg-gray-900 py-16 px-4 transition-all">

        {/* DARK MODE TOGGLE BUTTON */}
        <div className="flex justify-end max-w-7xl mx-auto mb-4">
    
        </div>

        {/* TITLE SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-white dark:text-secondary-green text-4xl font-bold mb-4">
            Our services
          </h2>
          <div className="w-24 h-1 bg-white dark:bg-secondary-green mx-auto mb-6"></div>

          <p className="text-white dark:text-gray-300 text-lg leading-relaxed">
            Save Time Managing Your waste collecting <br />
            With Our Best Services
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
          {services.map((srv, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-secondary-green/20 transition-all"
            >
              <div className="w-full h-70 relative">
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.png";
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                  {srv.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
