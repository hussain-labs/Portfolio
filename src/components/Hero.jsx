import React from 'react';
import Navbar from './Navbar';
import tagimg from '../assets/Hero/tag.png'
import myImag from "../assets/Hero/man.png"
import ScrollReveal from './ScrollReveal';
const HeroSection = () => {
  return (
    <div className=" px-5 overflow-hidden hero">
      <Navbar />
      {/* Main Content */}
      {/* Main Content */}
      <main className=" max-w-[1638px] mx-auto px-6 md:px-16 pt-50 flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-0">

        {/* Left Side: Text */}
        <div className="hero_left w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20 mb-[15%]">
          <ScrollReveal direction="left"> {/* Wrapped h1 with ScrollReveal */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mainHeding_hero">
              Programmar
            </h1>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 md:gap-4 mt-2">
            <ScrollReveal direction="right" delay={200}> {/* Wrapped h2 with ScrollReveal */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#b4f42c] tracking-tight leading-[0.9] subHeding_hero">
                Full Stack
              </h2>
            </ScrollReveal>
            {/* Junior Tag */}
            {/* <div className="bg-[#3e4d15] px-3 py-1 rounded-full self-center mt-2 border border-[#b4f42c]/30"> */}
            {/* <span className="text-[#b4f42c] text-[10px] font-bold uppercase tracking-tighter">Junior</span> */}
            {/* <img src={jonTag} className="w-[60px] md:w-[80px] lg:w-[100px] h-auto object-contain" alt="Junior" /> */}
            {/* </div> */}
          </div>

          <ScrollReveal direction="up" delay={400}> {/* Wrapped p with ScrollReveal */}
            <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-300 font-medium max-w-lg">
              MERN Stack Developer | React.js | Next.js | Node.js
            </p>
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10 w-full lg:max-w-[442px] h-auto lg:h-[70px]">
            <button className="w-full lg:flex-1 h-[56px] lg:h-full border-2 border-[#b4f42c] text-[#b4f42c] rounded-xl font-bold hover:bg-[#b4f42c] hover:text-black transition-all duration-200 ease-in-out" onClick={() => window.location.href = '#projects'}>
              View Projects
            </button>
            <button className="w-full lg:flex-1 h-[56px] lg:h-full bg-[#b4f42c] text-black rounded-xl font-bold hover:brightness-110 hover:bg-[var(--color-text-primary)] transition-all duration-200 ease-in-out" onClick={() => window.location.href = '#contact'}>
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="hero_right relative w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0 ">
          <div className="relative w-full max-w-[600px] lg:max-w-[809px] aspect-[809/837]">
            {/* Top Tag */}
            <div className="hero_tags absolute sm:top-[5%] top-0 left-[-5%] md:left-[0%] z-20">
              <img src={tagimg} className='w-[77px] sm:w-[100px] lg:w-[150px] ' alt="" />
            </div>

            {/* Background Glow */}
            <div className="hero_glow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-black rounded-full blur-[80px] md:blur-[120px] custom-shadow z-0"></div>

            {/* The Green Circle Outline */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[85%] border-[20px] md:border-[35px] border-[#b4f42c]/60 rounded-full z-10"></div>

            {/* Bottom Tag */}
            <div className="hero_tags absolute bottom-[5%] right-[-15%] sm:right-[-8%] z-20">
              <img src={tagimg} className='w-[77px] sm:w-[100px] lg:w-[150px]' alt="" />
            </div>

            {/* Profile Image */}
            <img
              src={myImag}
              alt="Muzzamil Hussain"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </main>
    </div>
  );
};

// Helper component for the specific </ title> icon style
const CodeIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

export default HeroSection;