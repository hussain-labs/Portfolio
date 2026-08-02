import { useEffect } from "react";
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
