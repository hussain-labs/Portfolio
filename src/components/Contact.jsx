import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { FaUpwork, FaStackOverflow } from "react-icons/fa6";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";
import { SiLeetcode } from "react-icons/si";

const Contact = () => {
  return (
    <section id="contact" className="bg-[var(--color-background)] py-16">
      <div className="max-w-[1638px] mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-start">

        {/* --- Left: Contact Form (No Changes) --- */}
        <ScrollReveal direction="left">
          <div
            className="bg-[var(--color-surface)] p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-gradient-animated">Get in Touch</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Have a project or just want to say hi? Fill the form below and I'll get back to you soon!
            </p>
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* --- Right: Contact Info + Social (No Changes except icons) --- */}
        <ScrollReveal direction="right" delay={200}>
          <div className="flex flex-col justify-start space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-gradient-animated">Contact Info</h2>
            <p className="text-[var(--color-text-secondary)]">
              I'd love to hear from you! Whether it's a project idea, collaboration, or just a hello, feel free to reach out through any of the options below.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[var(--color-text-secondary)]">
                <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                <a href="mailto:muzamilhusain.dev@gmail.com?subject=Inquiry from Portfolio" className="text-gradient-static hover:underline">
                  muzamilhusain.dev@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-[var(--color-text-secondary)]">
                <Phone className="w-6 h-6 text-[var(--color-primary)]" />
                <span className="text-gradient-static">+923030458064</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 text-gradient-static"><span className="text-gradient-static">Follow Me</span></h3>
            <div className="flex space-x-4 mt-2">

              {/* --- ONLY THESE ICONS ARE CHANGED --- */}
              <a href="https://www.linkedin.com/in/muzamil-mern-stack-developer/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-12 h-12 p-2 rounded-md social-icon-themed transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:-translate-y-1" />
              </a>
              <a href="https://github.com/hussain-labs" target="_blank" rel="noopener noreferrer">
                <Github className="w-12 h-12 p-2 rounded-md social-icon-themed transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:-translate-y-1" />
              </a>
              <a href="https://stackoverflow.com/users/30405022/muzamil-hussain" target="_blank" rel="noopener noreferrer">
                <FaStackOverflow className="w-12 h-12 p-2 rounded-md social-icon-themed transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:-translate-y-1" />
              </a>
              <a href="https://leetcode.com/u/tj39MJoM3P/" target="_blank" rel="noopener noreferrer">
                <SiLeetcode className="w-12 h-12 p-2 rounded-md social-icon-themed transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:-translate-y-1" />
              </a>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;