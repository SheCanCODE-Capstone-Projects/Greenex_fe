"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Award } from "lucide-react";
import { initialCompanyInfo, initialAboutUs, initialServices, initialServiceAreas, initialCertifications } from "@/data/profile-data";

export default function HomePage() {
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);
  const [aboutUs, setAboutUs] = useState(initialAboutUs);
  const [services, setServices] = useState(initialServices);
  const [serviceAreas, setServiceAreas] = useState(initialServiceAreas);
  const [certifications, setCertifications] = useState(initialCertifications);

  useEffect(() => {
    const savedProfile = localStorage.getItem("companyProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setCompanyInfo(profile.companyInfo || initialCompanyInfo);
      setAboutUs(profile.aboutUs || initialAboutUs);
      setServices(profile.services || initialServices);
      setServiceAreas(profile.serviceAreas || initialServiceAreas);
      setCertifications(profile.certifications || initialCertifications);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Preview Mode:</strong> This is how households/users will see your company profile when accessing your services.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-green to-secondary-green text-white p-8">
          <h1 className="text-4xl font-bold mb-2">{companyInfo.name}</h1>
          <p className="text-lg opacity-90">Your Trusted Waste Management Partner</p>
        </div>

        <div className="p-8 border-b">
          <h2 className="text-2xl font-bold text-dark-bg mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">{aboutUs}</p>
        </div>

        <div className="p-8 bg-light-bg/30 border-b">
          <h2 className="text-2xl font-bold text-dark-bg mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-dark-bg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-b">
          <h2 className="text-2xl font-bold text-dark-bg mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-green" />
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {serviceAreas.map((area) => (
              <div key={area.id} className="bg-primary-green/10 text-primary-green px-4 py-2 rounded-full font-medium">
                {area.city}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-light-bg/30 border-b">
          <h2 className="text-2xl font-bold text-dark-bg mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-green" />
            Certifications & Partnerships
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center justify-center text-center">
                {cert.logo && cert.logo.startsWith('http') ? (
                  <img src={cert.logo} alt={cert.name} className="w-16 h-16 object-contain mb-2" />
                ) : (
                  <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-primary-green font-bold text-lg">
                      {cert.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <p className="text-sm font-medium text-gray-700">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-dark-bg mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-green mt-1" />
                <div>
                  <p className="font-medium text-dark-bg">Address</p>
                  <p className="text-gray-600">{companyInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-green mt-1" />
                <div>
                  <p className="font-medium text-dark-bg">Phone</p>
                  <p className="text-gray-600">{companyInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-green mt-1" />
                <div>
                  <p className="font-medium text-dark-bg">Email</p>
                  <p className="text-gray-600">{companyInfo.email}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-dark-bg mb-3">Follow Us</p>
              <div className="flex gap-4">
                {companyInfo.linkedin && (
                  <a href={`https://${companyInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center hover:bg-primary-green/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-primary-green" />
                  </a>
                )}
                {companyInfo.twitter && (
                  <a href={`https://twitter.com/${companyInfo.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center hover:bg-primary-green/20 transition-colors">
                    <Twitter className="w-5 h-5 text-primary-green" />
                  </a>
                )}
                {companyInfo.facebook && (
                  <a href={`https://${companyInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center hover:bg-primary-green/20 transition-colors">
                    <Facebook className="w-5 h-5 text-primary-green" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
