export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container text-center">
        <ul className="footer-nav">
          <li><a href="#home" className="footer-nav-link">Home</a></li>
          <li><a href="#about" className="footer-nav-link">About</a></li>
          <li><a href="#skills" className="footer-nav-link">Skills</a></li>
          <li><a href="#projects" className="footer-nav-link">Projects</a></li>
          <li><a href="#education" className="footer-nav-link">Education</a></li>
          <li><a href="#certifications" className="footer-nav-link">Certifications</a></li>
          <li><a href="#contact" className="footer-nav-link">Contact</a></li>
        </ul>
        
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/dilkisanjana/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn Profile">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/DilkiSanjana" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub Profile">
            <i className="fab fa-github"></i>
          </a>
        </div>
        
        <p className="footer-copyright">
          &copy; 2026 Dilki Sanjana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
