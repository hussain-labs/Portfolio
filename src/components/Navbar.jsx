import { Link } from "lucide-react";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--color-background)] z-50 shadow shadow-[var(--color-primary)]/20 animate-slide-down">
      <div className="max-w-[1638px] h-[80px] md:h-[116px] mx-auto px-6 md:px-16 py-4 flex justify-between items-center shadow shadow-[var(--color-primary)]/20 md:shadow-none">
        {/* Logo with Gradient */}
        <a href="/">
          <h1 className="flex items-end">
            <img src={logo} className="w-[90px] h-auto md:w-[110px] lg:w-[144px] md:h-auto logoimg_hero" alt="logo" />
            <span className="flex flex-col ml-2 md:ml-0">
              <h3 className="text-[18px] md:text-[24px] lg:text-[32px] font-[600] font-[Poppins] leading-tight logotext_hero">Muzamil Hussain</h3>
              <p className="text-[10px] md:text-[12px] lg:text-[15px] font-[400] font-[Poppins] text-[var(--color-primary)] logosubtext_hero">MERN Stack Developer</p>
            </span>
          </h1>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-4 xl:space-x-6 text-[14px] xl:text-[16px] text-[var(--color-text-secondary)] font-medium items-center text-gradient-animated">
          <li><a href="/#about" className="hover:text-[var(--color-primary)]">About</a></li>
          <li><a href="/#skills" className="hover:text-[var(--color-primary)]">Skills</a></li>
          <li><a href="/#projects" className="hover:text-[var(--color-primary)]">Projects</a></li>
          <li><a href="/#experience" className="hover:text-[var(--color-primary)]">Experience</a></li>
          <li><a href="/#education" className="hover:text-[var(--color-primary)]">Education</a></li>
          <li><a href="/#contact" className="hover:text-[var(--color-primary)]">Contact</a></li>
          <li className="w-[293px] h-[56px] border-[3px] border-[var(--color-primary)] rounded-[15px] flex items-center justify-center text-[26px] font-[600] font-[Poppins] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 ease-in-out download_button">
            {/* Desktop Download Button with Gradient */}
            <a
              href="/cv/Muzamil_Hussain.pdf"
              download="Muzamil Hussain.pdf"
              className=""
            >
              Download Resume
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden relative w-8 h-6 flex flex-col justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text-secondary)] transform transition duration-300 ${isOpen ? "rotate-45 translate-y-[11px]" : ""
              }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text-secondary)] transition duration-300 ${isOpen ? "opacity-0" : "opacity-100"
              }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-[var(--color-text-secondary)] transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-[11px]" : ""
              }`}
          ></span>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out px-6 bg-[var(--color-background)] border-t border-[var(--color-primary)]/20 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-[var(--color-text-secondary)] font-medium ">
          <li className="opacity-0 menu-item-animate" style={{ animationDelay: '100ms' }}>
            <a href="/#about" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>About</a>
          </li>
          <li className="opacity-0 menu-item-animate" style={{ animationDelay: '200ms' }}>
            <a href="/#skills" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>Skills</a>
          </li>
          <li className="" style={{ animationDelay: '300ms' }}>
            <a href="/#projects" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>Projects</a>
          </li>
          <li className="" style={{ animationDelay: '400ms' }}>
            <a href="/#experience" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>Experience</a>
          </li>
          <li className="" style={{ animationDelay: '500ms' }}>
            <a href="/#education" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>Education</a>
          </li>
          <li className="" style={{ animationDelay: '600ms' }}>
            <a href="/#contact" className="hover:text-[var(--color-primary)]" onClick={() => setIsOpen(false)}>Contact</a>
          </li>
          <li className="w-full flex mx-auto opacity-0 menu-item-animate" style={{ animationDelay: '700ms' }}>
            {/* Mobile Download Button with Gradient */}
            <a
              href="/cv/Muzamil_Hussain.pdf"
              download="Muzamil Hussain.pdf"
              onClick={() => setIsOpen(false)}
              className="group w-full h-[56px] border-[3px] border-[var(--color-primary)] rounded-[15px] flex items-center justify-center text-[18px] font-[600] font-[Poppins] hover:bg-[var(--color-primary)] transition-all duration-300 ease-in-out"
            >
              <span className="text-gradient-animated group-hover:bg-none group-hover:!text-black group-hover:bg-clip-border transition-all duration-300">
                Download Resume
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;