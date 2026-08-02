import React from "react";
import { Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import certifications from "../data/certifications.json";

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[var(--color-background)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-bold mb-12 text-start">
            <span className="text-gradient-animated">Certifications</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 100}
              className="group"
            >
              <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-md border border-[var(--color-surface)]
                              hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/30 
                              hover:-translate-y-2 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-[#3b82f6]/10 rounded-full text-[#3b82f6] group-hover:scale-110 group-hover:bg-[#3b82f6] group-hover:text-[#0A0C10] transition-all duration-300">
                      <Award className="w-6 h-6" />
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[#3b82f6] transition-colors duration-300">
                      {cert.name}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-widest">
                    {cert.issuer}
                  </p>
                </div>
                
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#3b82f6] hover:text-white transition-colors duration-300"
                >
                  View Certificate
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
