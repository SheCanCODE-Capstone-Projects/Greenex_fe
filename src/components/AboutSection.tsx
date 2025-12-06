/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Truck, Users, MapPin, FileText } from "lucide-react";
import Link from "next/link";

const AboutSection: React.FC = () => {
  const logos = [
  "/rema.png",
  "/mtnmomo.png",
  "/wastecollector1.png",
  "/wastecollector2.png",
  "/wastecollector3.png",
  "/wastecollector4.png",
  "/rdb.png",
  "/rra.png",
];

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-light-bg dark:bg-gray-900 py-20 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* ===================== IMAGE GRID + TEXT ===================== */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* LEFT SIDE — 3 Image Group */}
          <div className="relative w-full">
            {/*  Greenex FLOATING CIRCLE */}
            <div
              className="
    absolute left-[38%] top-1/2 
    -translate-y-1/2
    z-30 rounded-full bg-light-bg shadow-xl 
    w-24 h-24 flex items-center justify-center
    cursor-pointer text-foreground font-semibold text-lg
    transition-all duration-300 hover:scale-110
  "
            >
              GreenEx
            </div>

            {/* IMAGES GRID */}
            <div className="grid grid-cols-3 gap-4">
              {/* LEFT — 2 stacked images */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg shadow-lg group h-[350px] w-[300px]">
                  <img
                    src="/About1.png"
                    alt="About Image 1"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="overflow-hidden rounded-lg shadow-lg group h-[350px] w-[300px]">
                  <img
                    src="/About3.png"
                    alt="About Image 2"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* RIGHT — image */}
              <div className="overflow-hidden rounded-lg shadow-lg group h-[350px] w-[300px] mt-60 -ml-25">
                <img
                  src="/About3.png"
                  alt="About Image 3"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE TEXT */}
          <div className="space-y-6 animate-fade-in-right pl-40">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-green">
              About Us
            </h2>

            <p className="text-gray-700 dark:text-foreground text-lg leading-relaxed">
              Greenex is a digital platform created to transform how waste is collected,
              tracked, and managed across Rwanda. It bridges the gap between
              households, companies, and private garbage collection companies by
              providing a modern and reliable technology solution.
            </p>

<Link
  href="/login"
  className="inline-block bg-[#2E7D32] text-white px-8 py-3 
             font-semibold text-sm uppercase tracking-wide 
             transition-all transform hover:scale-105 rounded-lg
             shadow-[0_6px_12px_rgba(0,0,0,0.15)]
             [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]"
>
  Explore More
</Link>


          </div>
        </div>

        {/* ===================== MISSION SECTION ===================== */}
        <div className="bg-primary-green rounded-3xl p-10 md:p-16 text-center mb-20 animate-scale-in shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Mission
          </h3>
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            GreenEx is committed to revolutionizing waste collection in
            Rwanda&apos;s technology. We empower citizens, companies, and
            private garbage collectors for a cleaner, healthier, and more
            sustainable future. Our vision is a Rwanda where smart waste
            management brings vibrant and eco-friendly communities.
          </p>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-4">
            <Truck className="text-white" size={48} />
          </div>

          <p className="text-white/90 text-sm font-medium">
            GreenEx - for sustainable Rwanda
          </p>
        </div>

       {/* ===================== STATS SECTION ===================== */}
<div className=" py-20 px-6 md:px-16">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE TEXT */}
    <div>
      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug dark:text-foreground">
        Helping a local <span className="text-primary-green">village</span><br />
        keeping it&apos;s <span className="text-primary-green">cleaness</span>
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        We reached here with our hard work and dedication
      </p>
    </div>

    {/* RIGHT SIDE 2x2 GRID */}
    <div className="grid grid-cols-2 gap-10">

      {/* Item 1 */}
      <div className="text-center">
        <Users className="text-primary-green mb-2 mx-auto" size={36} />
        <p className="text-3xl font-bold text-gray-800 dark:text-white">30,000+</p>
        <p className="text-gray-600 text-md dark:text-gray-400">Members</p>
      </div>

      {/* Item 2 */}
      <div className="text-center">
        <MapPin className="text-primary-green mb-2 mx-auto" size={36} />
        <p className="text-3xl font-bold text-gray-800 dark:text-white">10+</p>
        <p className="text-gray-600 text-md dark:text-gray-400">Partnerships</p>
      </div>

      {/* Item 3 */}
      <div className="text-center">
        <Users className="text-primary-green mb-2 mx-auto" size={36} />
        <p className="text-3xl font-bold text-gray-800 dark:text-white">13+</p>
        <p className="text-gray-600 text-md dark:text-gray-400">Waste collectors companies</p>
      </div>

      {/* Item 4 */}
      <div className="text-center">
        <FileText className="text-primary-green mb-2 mx-auto" size={36} />
        <p className="text-3xl font-bold text-gray-800 dark:text-white">20+</p>
        <p className="text-gray-600 text-md dark:text-gray-400">Districts</p>
      </div>
    </div>

  </div>
</div>
       {/* ===================== PARTNERS SECTION ===================== */}
<div className="pt-16">
  <h3 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4">
    Our Partners
  </h3>

  <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12">
    We have been working with some Fortune 5+ organisations
  </p>

  {/* Infinite Scrolling Wrapper */}
  <div className="overflow-hidden relative py-6">
    <div className="flex whitespace-nowrap animate-scroll">
      {/* Duplicate logos twice for seamless infinite scrolling */}
      {[...logos, ...logos].map((logo, index) => (
        <img
          key={index}
          src={logo}
          className="mx-10 h-20 w-auto object-contain"
          alt="partner logo"
        />
      ))}
    </div>
  </div>
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-scroll {
      animation: scroll 25s linear infinite;
    }
  `}</style>
</div>

    </section>
  );
};

export default AboutSection;
