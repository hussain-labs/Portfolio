import React from "react";
import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="bg-[var(--color-surface)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16">
        <ScrollReveal direction="left">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-gradient-animated">About Me</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <p className="text-lg leading-8 text-gradient-paragraph">
            I am a results-driven MERN Stack Developer with a primary focus on creating high-performance, pixel-perfect user interfaces. With a year of hands-on experience, I specialize in translating complex designs into seamless web experiences using React.js and Next.js. As a frontend expert, I have a proven track record of implementing and managing a high volume of complex APIs using advanced state management tools like Redux Toolkit and React Query. While my core expertise lies in frontend architecture and mastering Advanced JavaScript, I also develop robust backend systems using Node.js to support full-stack project requirements. As a dedicated problem-solver, I excel at debugging and optimizing code to deliver secure, scalable, and visually precise digital solutions.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;