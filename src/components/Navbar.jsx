import { useState, useEffect } from 'react';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky scrolled class
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy logic
      const scrollY = window.pageYOffset;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className={`navbar navbar-expand-lg fixed-top navbar-glass ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#home" onClick={() => setIsCollapsed(true)}>
            <span className="gradient-text me-2 font-headings">&lt;DILKI</span>
            <span className="d-none d-sm-inline">SANJANA /&gt;</span>
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-controls="navbarNav" 
            aria-expanded={!isCollapsed} 
            aria-label="Toggle navigation"
          >
            <div className="navbar-toggler-icon-custom">
              <span style={{ top: !isCollapsed ? '11px' : '4px', transform: !isCollapsed ? 'rotate(135deg)' : 'rotate(0deg)' }}></span>
              <span style={{ opacity: !isCollapsed ? 0 : 1, left: !isCollapsed ? '-60px' : '0px' }}></span>
              <span style={{ top: !isCollapsed ? '11px' : '18px', transform: !isCollapsed ? 'rotate(-135deg)' : 'rotate(0deg)' }}></span>
            </div>
          </button>
          
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <a 
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`} 
                    href={item.href}
                    onClick={() => setIsCollapsed(true)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="nav-item ms-lg-2">
                <button 
                  className="theme-toggle-btn" 
                  onClick={toggleTheme} 
                  title="Toggle Theme" 
                  aria-label="Toggle dark and light theme"
                >
                  <i className={theme === 'light' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill'}></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
