"use client";

import React, { useState } from "react";

import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";

// Note: The contactInfo array uses the data defined in the original component, 
// but I will override it here to better match the content of the uploaded image
const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    details: "+250 789 5396", // Modified to match image data
    description: "" // Removed description to match image's simplicity
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: "greenex@wastecollection.com", // Modified to match image data
    description: ""
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office",
    details: "KG,str Kigali, Rwanda", // Modified to match image data
    description: ""
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Working Hours",
    details: "8:00 AM - 6:00 PM",
    description: "Monday to Saturday"
  }
];


const ContactSection: React.FC = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Reset form
    setFormData({ name: "", email: "", message: "", service: "" });
    alert("Message sent successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-light-bg dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-primary-green dark:bg-secondary-green mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Get in touch with us for efficient waste management solutions. We&apos;re here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-in-left">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground focus:ring-2 focus:ring-primary-green dark:focus:ring-secondary-green focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground focus:ring-2 focus:ring-primary-green dark:focus:ring-secondary-green focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground focus:ring-2 focus:ring-primary-green dark:focus:ring-secondary-green focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="collection">Waste Collection</option>
                    <option value="recycling">Recycling Services</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground focus:ring-2 focus:ring-primary-green dark:focus:ring-secondary-green focus:border-transparent resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full bg-primary-green dark:bg-secondary-green text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary-green/30 dark:hover:shadow-secondary-green/30 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </form>
            </div>
          </div>

          <div className="animate-fade-in-right">
  
            <div className="space-y-6">
              {contactInfo.filter(info => info.title !== "Working Hours").map((info, index) => (
                <div 
                  key={index}
                  // The parent div is now a simple container, not a card with padding/shadow
                  className="flex items-center gap-4 py-2" // Reduced padding and removed background/shadow
                >
                  {/* Icon container styled to match the image: full green circle/square with white icon */}
                  <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {/* Using Tailwind's ring-1 for a subtle border like the image's icons */}
                      {info.icon} 
                    </div>
                  </div>
                  {/* Details section */}
                  <div>
                    {/* The text style is simpler and matches the image's font/color */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                      {info.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* End of the section styled to look like the image */}
            
            <div className="mt-8 bg-gradient-to-br from-primary-green to-secondary-green rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Request a Pickup</h3>
              <p className="mb-6">
                Need immediate waste collection? Schedule a pickup now and we&apos;ll be there promptly.
              </p>
              <button 
                onClick={() => scrollToSection("contact")}
                className="group relative w-full bg-white text-primary-green dark:text-secondary-green px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Schedule Pickup</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-green/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ContactSection;