import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CVModal from './components/CVModal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* 1. Preloader Screen */}
      <Preloader />

      {/* 2. Particle Canvas Background */}
      <ParticleCanvas theme={theme} />

      {/* 3. Header & Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 4. Main Contents */}
      <main className="z-index-10">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Education Section */}
        <Education />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Back To Top Button */}
      <BackToTop />

      {/* 7. Interactive CV Modal */}
      <CVModal />
    </>
  );
}
