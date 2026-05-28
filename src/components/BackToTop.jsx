import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      id="backToTop" 
      className={`back-to-top ${showButton ? 'show' : ''}`} 
      onClick={scrollToTop}
      title="Go to top" 
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}
