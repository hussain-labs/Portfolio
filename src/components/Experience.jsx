import React from "react";
import { Briefcase } from "lucide-react";
import experiences from "../data/experience.json";
import ScrollReveal from "./ScrollReveal";

const Experience = () => {
  return (
    <section id="experience" className="bg-[var(--color-background)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        {/* Heading with animated gradient */}
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-bold mb-12 text-start">
            <span className="text-gradient-animated">Work Experience</span>
          </h2>
        </ScrollReveal>

        {/* Timeline container with gradient line */}
        <div className="relative ml-4">
          {/* This div creates the vertical gradient line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>

          {experiences.map((exp, index) => (
            // Staggered animation for each timeline entry
            <ScrollReveal
              key={index}
              direction="right"
              delay={index * 100}
              className="mb-10 ml-6 group"
            >
              {/* Icon with gradient and glow effect */}
              <span className="image-glow absolute -left-11 flex items-center justify-center w-10 h-10 
                               bg-[var(--color-primary)] 
                               rounded-full ring-4 ring-[var(--color-primary)]/20 shadow-md 
                               group-hover:scale-110 transition-transform">
                <Briefcase className="text-[var(--color-background)] w-5 h-5" />
              </span>

              {/* Card with added hover lift effect */}
              <div className="bg-[var(--color-surface)] p-6 rounded-xl mx-2 shadow-md 
                              hover:shadow-xl hover:-translate-y-1
                              transition-all duration-300 border border-[var(--color-surface)]">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {/* Job title with static gradient */}
                  <span className="text-gradient-static">{exp.title}</span> – <span className="text-[var(--color-primary)]">{exp.company}</span>
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{exp.period}</p>

                <ul className="list-disc ml-5 space-y-2 text-[var(--color-text-secondary)]">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;