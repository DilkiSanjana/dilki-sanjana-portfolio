import { useEffect, useState } from 'react';
import AOS from 'aos';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Delay before starting fade out
    const fadeTimer = setTimeout(() => {
      setFade(true);
      // Wait for transition duration to unmount preloader
      const unmountTimer = setTimeout(() => {
        setVisible(false);
        // Initialize Animate On Scroll (AOS)
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }, 500);

      return () => clearTimeout(unmountTimer);
    }, 800);

    return () => clearTimeout(fadeTimer);
  }, []);

  if (!visible) return null;

  return (
    <div 
      id="preloader" 
      style={{
        transition: 'opacity 0.5s ease',
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? 'none' : 'auto'
      }}
    >
      <div className="spinner-box">
        <div className="circle-border-1"></div>
        <div className="circle-border-2"></div>
        <div className="circle-core">DS</div>
      </div>
      <div className="loader-text">Loading Ecosystem...</div>
    </div>
  );
}
