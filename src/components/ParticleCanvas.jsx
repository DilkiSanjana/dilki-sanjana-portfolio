import { useEffect, useRef } from 'react';

export default function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null);
  
  // Keep colors in refs so the animation loop can access updated values without recreation
  const colorsRef = useRef({
    particleColor: 'rgba(100, 255, 218, 0.4)',
    lineColor: 'rgba(0, 180, 216, 0.08)'
  });

  // Update canvas colors when theme prop changes
  useEffect(() => {
    if (theme === 'light') {
      colorsRef.current = {
        particleColor: 'rgba(2, 132, 199, 0.3)',
        lineColor: 'rgba(2, 132, 199, 0.06)'
      };
    } else {
      colorsRef.current = {
        particleColor: 'rgba(100, 255, 218, 0.4)',
        lineColor: 'rgba(0, 180, 216, 0.08)'
      };
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    const numberOfParticles = 80;

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    // Track mouse movement
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Particle Blueprint class inside useEffect
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = colorsRef.current.particleColor;
        ctx.fill();
      }
      
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 2;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 2;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 2;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 2;
          }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const speedFactor = 0.5;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2 - 1) * speedFactor;
        let directionY = (Math.random() * 2 - 1) * speedFactor;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            
            // Replace line opacity based on current theme configuration colors
            const baseLineColor = colorsRef.current.lineColor;
            let currentLineColor;
            if (theme === 'light') {
              currentLineColor = baseLineColor.replace('0.06', (opacityValue * 0.12).toFixed(2));
            } else {
              currentLineColor = baseLineColor.replace('0.08', (opacityValue * 0.15).toFixed(2));
            }
            
            ctx.strokeStyle = currentLineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas bounds
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} id="particleCanvas" />;
}
