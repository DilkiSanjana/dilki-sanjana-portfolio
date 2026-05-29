import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Hero() {
  const typedEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        'Software Engineering Undergraduate',
        'Aspiring DevOps Engineer',
        'Cloud & CI/CD Enthusiast'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Columns */}
          <div className="col-lg-7 text-start" data-aos="fade-right">
            <div className="hero-badge">
              <i className="bi bi-terminal-fill text-primary"></i> Ready for DevOps Internships
            </div>
            <h1 className="hero-title">
              Hi, I'm <br /><span className="gradient-text">Dilki Sanjana</span>
            </h1>
            <div className="hero-subtitle">
              <span ref={typedEl}></span>
            </div>
            <p className="hero-desc">
               Motivated Information Technology undergraduate specializing in Software Engineering at Sri Lanka Institute of Information Technology. Passionate about DevOps, Cloud Computing, CI/CD, and System Reliability, with a strong interest in building efficient and scalable software solutions. Seeking opportunities to enhance skills in cloud infrastructure, monitoring, and modern software delivery practices.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <button className="btn-premium-primary" data-bs-toggle="modal" data-bs-target="#cvModal">
                <i className="bi bi-file-earmark-pdf-fill"></i> View & Download CV
              </button>
              <a href="#contact" className="btn-premium-secondary">
                <i className="bi bi-chat-text-fill text-primary"></i> Contact Me
              </a>
            </div>
            <div className="hero-social-links">
              <a href="https://www.linkedin.com/in/dilkisanjana/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn Profile">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/DilkiSanjana" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub Profile">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          
          {/* Image Column with Floating Tech Elements */}
          <div className="col-lg-5 text-center mt-5 mt-lg-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="hero-image-container">
              <div className="hero-blob-bg"></div>
              
              {/* Orbital Badges */}
              <div className="floating-tech-badge badge-1" title="HTML5">
                <i className="devicon-html5-plain colored"></i>
              </div>
              <div className="floating-tech-badge badge-2" title="Docker">
                <i className="devicon-docker-plain colored"></i>
              </div>
              <div className="floating-tech-badge badge-3" title="JavaScript">
                <i className="devicon-javascript-plain colored"></i>
              </div>
              <div className="floating-tech-badge badge-4" title="AWS Cloud">
                <i className="devicon-amazonwebservices-plain colored"></i>
              </div>
              
              <div className="hero-profile-wrapper">
                <img src={`${import.meta.env.BASE_URL}assets/images/profile.jpg`} alt="Dilki Sanjana Headshot" className="hero-profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <i className="bi bi-chevron-double-down"></i>
      </div>
    </section>
  );
}
