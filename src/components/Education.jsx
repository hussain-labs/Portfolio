import React from "react";
import { GraduationCap } from "lucide-react"; // nice education icon
import ScrollReveal from "./ScrollReveal";

// Education Data
const education = [
  {
    degree: "BSCS",
    institute: "University of Sahiwal",
    period: "2022 – 2026 (Ongoing)",
  },
  {
    degree: "FSc Pre-Engineering",
    institute: "Govt Higher Secondary School 105/15-L, Mian Channu, Khanewal",
    period: "2020 – 2022",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="bg-[var(--color-surface)] py-16"
    >
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-bold mb-12 text-start">
            <span className="text-gradient-animated">Education</span>
          </h2>
        </ScrollReveal>

        {/* --- This is the main change --- */}
        {/* Container for the timeline. The border is removed from here. */}
        <div className="relative ml-4">
          {/* This new div creates the vertical gradient line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>

          {education.map((edu, index) => (
            <ScrollReveal
              key={index}
              direction="right"
              delay={index * 100}
              className="mb-10 ml-6 group"
            >
              {/* The icon's position is now relative to the new line */}
              <span className="image-glow absolute -left-11 flex items-center justify-center w-10 h-10 
                               bg-[var(--color-primary)] 
                               rounded-full ring-4 ring-[var(--color-primary)]/20 shadow-md 
                               group-hover:scale-110 transition-transform">
                <GraduationCap className="text-[var(--color-background)] w-5 h-5" />
              </span>

              <div className="bg-[var(--color-surface)] p-6 mx-2 rounded-xl shadow-md 
                              hover:shadow-xl hover:-translate-y-1
                              transition-all duration-300 border border-[var(--color-surface)] ">
                <span className="text-xl font-semibold mb-1 text-gradient-static">
                  {edu.degree}
                </span>
                <p className="text-gray-200 text-xl font-bold">{edu.institute}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{edu.period}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;