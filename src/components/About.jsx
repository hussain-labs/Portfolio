import React from "react";
import ScrollReveal from "./ScrollReveal";
import CodeCanvas from "./CodeCanvas";

const About = () => {
  return (
    <section id="about" className="bg-[var(--color-surface)] py-16 overflow-hidden">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        
        {/* Left Side: Mac Code Canvas */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <ScrollReveal direction="left" className="w-full max-w-[600px]">
            <CodeCanvas />
          </ScrollReveal>
        </div>

        {/* Right Side: Text */}
        <div className="w-full lg:w-1/2">
          <ScrollReveal direction="right" delay={200}>
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-gradient-animated">About Me</span>
            </h2>
            <p className="text-lg leading-8 text-[#A0A0A0] mb-6">
              I am a MERN Stack Developer obsessed with crafting pixel-perfect, high-performance web applications. I specialize in transforming complex designs into seamless digital experiences using <strong className="text-white">React.js</strong> and <strong className="text-white">Next.js</strong>.
            </p>
            <p className="text-lg leading-8 text-[#A0A0A0]">
              While my core expertise lies in frontend architecture and advanced state management, I also build robust backend systems with <strong className="text-white">Node.js</strong>. I thrive on solving complex problems, writing clean code, and delivering scalable full-stack solutions.
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default About;