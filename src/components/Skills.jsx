import React, { useState, useEffect } from "react";
import skillsData from "../data/skills.json";
const { mainSkills, otherSkills } = skillsData;
import ScrollReveal from "./ScrollReveal";

const ProgressBar = ({ level }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, 300);

    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="w-full bg-[var(--color-surface)] rounded-full h-3 shadow-inner">
      <div
        className="h-3 rounded-full transition-all duration-1000 ease-out 
                   bg-[var(--color-primary)]"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="bg-[var(--color-background)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-bold mb-10">
            <span className="text-gradient-animated">My Skills</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {mainSkills.map((skill, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-[var(--color-text-primary)] font-medium">{skill.name}</span>
                  <span className="text-gradient-static">{skill.level}%</span>
                </div>

                <ProgressBar level={skill.level} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <ScrollReveal direction="up" delay={200}>
            <h3 className="text-2xl font-semibold mb-4">
              <span className="text-gradient-animated">Other Skills</span>
            </h3>
          </ScrollReveal>

          <div className="flex flex-wrap gap-3">
            {otherSkills.map((skill, i) => (
              <ScrollReveal key={i} direction="up" delay={300 + i * 50}>
                <span
                  className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-lg shadow-sm font-medium
                             hover:shadow-lg hover:-translate-y-1
                             transition-all duration-300 ease-in-out cursor-pointer
                             other-skill-text-gradient block"
                >
                  {skill}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;