import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import About from "../components/About";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Certifications from "../components/Certifications";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

function Home() {

  useEffect(() => {
    localStorage.removeItem('isAdminLoggedIn');
  })


  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Helmet>
        <title>Muzamil Hussain | MERN Stack, AI-Driven, and Web3 Developer Portfolio</title>
        <meta name="description" content="Muzamil Hussain - Full Stack Developer, MERN Stack Developer, JavaScript Expert, AI-Driven Developer, Node.js Expert, and SaaS Developer. Skilled in AWS, Azure, Hostinger deployments, RAG, Web3, Microservices, and scalable architecture." />
        <meta name="keywords" content="Full stack developer, mern stack developer, javascript expert, javascript developer, ai driven developer, node js expert, web developer, app developer, saas developer, expert in AWS, expert in Azure, hostinger, go daddy, deployment expert, linux cli expert, RAG expert, socket.io expert, AI integration Expert, optimised code writer, architecture maker, micro frontend, microservices expert, Web3 project, Muzamil Hussain" />
        <link rel="canonical" href="https://muzamilhussain.netlify.app" />
      </Helmet>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
