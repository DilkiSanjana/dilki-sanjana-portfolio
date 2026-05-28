document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          
          if (typeof AOS !== 'undefined') {
            AOS.init({
              duration: 800,
              easing: 'ease-in-out',
              once: true,
              mirror: false
            });
          }
        }, 500);
      }, 800); 
    });
  }

  // ==========================================
  // 2. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply saved theme on start
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let targetTheme = 'dark';
      
      if (theme === 'dark') {
        targetTheme = 'light';
      }
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeIcon(targetTheme);
      
      // Update canvas particle colors
      if (window.updateCanvasColors) {
        window.updateCanvasColors(targetTheme);
      }
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'bi bi-moon-stars-fill';
    } else {
      themeIcon.className = 'bi bi-sun-fill';
    }
  }

  // ==========================================
  // 3. CANVAS PARTICLE SYSTEM
  // ==========================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;
    
    // Theme responsive particle colors
    let particleColor = 'rgba(100, 255, 218, 0.4)'; // dark mode primary (cyan)
    let lineColor = 'rgba(0, 180, 216, 0.08)'; // dark mode line (cyan/blue)
    
    window.updateCanvasColors = function(theme) {
      if (theme === 'light') {
        particleColor = 'rgba(2, 132, 199, 0.3)'; // light blue
        lineColor = 'rgba(2, 132, 199, 0.06)';
      } else {
        particleColor = 'rgba(100, 255, 218, 0.4)'; // cyan
        lineColor = 'rgba(0, 180, 216, 0.08)';
      }
    };
    
    // Set initial colors
    window.updateCanvasColors(currentTheme);

    // Track mouse positions
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Resize canvas helper
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle Blueprints
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
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      
      update() {
        // Bounce off canvas boundaries
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interactions
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
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
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      let speedFactor = 0.5; // low speed for smooth layout backgrounds
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2 - 1) * speedFactor;
        let directionY = (Math.random() * 2 - 1) * speedFactor;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    // Connect close particles with lines
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            ctx.strokeStyle = lineColor.replace('0.08', (opacityValue * 0.15).toFixed(2)).replace('0.06', (opacityValue * 0.12).toFixed(2));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
  }

  // ==========================================
  // 4. TYPED.JS INITIALIZATION
  // ==========================================
  if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
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
  }

  // ==========================================
  // 5. STICKY NAVBAR & BACK-TO-TOP TRIGGER
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Close mobile navbar on click of link
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // ==========================================
  // 6. SCROLL SPY ACTIVE LINK
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  function scrollSpy() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      const targetNavLink = document.querySelector(`.navbar-nav a[href*=${sectionId}]`);
      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', scrollSpy);

  // ==========================================
  // 7. COUNTER STATISTICS ANIMATION
  // ==========================================
  const statsSection = document.querySelector('.about-stats-grid');
  const counters = document.querySelectorAll('.stat-counter');
  let countActivated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 80; // duration divisor
      let count = 0;
      
      const updateCount = () => {
        const increment = Math.ceil(target / speed);
        count += increment;
        
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      
      updateCount();
    });
  };

  if (statsSection) {
    const observerOptions = {
      root: null,
      threshold: 0.1
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countActivated) {
          countUp();
          countActivated = true;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 8. SKILLS CATEGORY FILTERING & PROGRESS ANIMATION
  // ==========================================
  const skillFilters = document.querySelectorAll('.skills-filter-container .filter-btn');
  const skillCards = document.querySelectorAll('.skill-item-col');
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  // Trigger progress bar animations on scroll visibility
  const skillsSection = document.getElementById('skills');
  let progressAnimated = false;

  const animateProgress = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  };

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !progressAnimated) {
          animateProgress();
          progressAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  }

  // Filter skills grid
  skillFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Toggle active filter button style
      skillFilters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');

      const target = filter.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (target === 'all' || category === target) {
          card.style.display = 'block';
          // Trigger slight fade-in scale
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Reinforce progress bar widths when filtering
      setTimeout(() => {
        progressBars.forEach(bar => {
          const parentCol = bar.closest('.skill-item-col');
          if (parentCol.style.display !== 'none') {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          }
        });
      }, 100);
    });
  });

  // ==========================================
  // 9. MOCK GITHUB CONTRIBUTION BOARD
  // ==========================================
  const githubGrid = document.getElementById('githubMockGrid');
  if (githubGrid) {
    // Generate 27 columns * 7 rows = 189 days (approx 6 months)
    const totalCols = 27;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Seed some dates going backwards from today
    const today = new Date();
    
    for (let c = 0; c < totalCols; c++) {
      const colDiv = document.createElement('div');
      colDiv.className = 'github-col';
      
      for (let r = 0; r < 7; r++) {
        // Calculate offset day
        const dayOffset = ((totalCols - 1 - c) * 7) + (6 - r);
        const cellDate = new Date();
        cellDate.setDate(today.getDate() - dayOffset);
        
        // Random commit level (0-4) with weighted probability for realistic lookup (heavy on 0, 1, 2)
        const rand = Math.random();
        let level = 0;
        let commits = 0;
        
        if (rand > 0.85) {
          level = 4;
          commits = Math.floor(Math.random() * 5) + 8; // 8-12 commits
        } else if (rand > 0.70) {
          level = 3;
          commits = Math.floor(Math.random() * 3) + 5; // 5-7 commits
        } else if (rand > 0.45) {
          level = 2;
          commits = Math.floor(Math.random() * 3) + 2; // 2-4 commits
        } else if (rand > 0.25) {
          level = 1;
          commits = 1;
        }
        
        const box = document.createElement('div');
        box.className = `github-box git-level-${level}`;
        
        const dateString = `${months[cellDate.getMonth()]} ${cellDate.getDate()}, ${cellDate.getFullYear()}`;
        const commitText = commits === 0 ? 'No contributions' : `${commits} contribution${commits > 1 ? 's' : ''}`;
        box.setAttribute('data-tooltip', `${commitText} on ${dateString}`);
        
        colDiv.appendChild(box);
      }
      githubGrid.appendChild(colDiv);
    }
  }

  // ==========================================
  // 10. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get button and original content
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnHTML = submitBtn.innerHTML;
      
      // Transition button to loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
      
      // Simulate API post (DevOps mockup)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent!';
        
        if (formStatus) {
          formStatus.className = 'alert alert-success mt-3';
          formStatus.style.display = 'block';
          formStatus.innerHTML = `
            <strong>Success!</strong> Hi ${document.getElementById('name').value}, your message has been delivered. I will get back to you shortly!
          `;
        }
        
        // Reset form
        contactForm.reset();
        
        // Return button to normal after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHTML;
          if (formStatus) {
            formStatus.style.transition = 'opacity 0.5s ease';
            formStatus.style.opacity = '0';
            setTimeout(() => {
              formStatus.style.display = 'none';
              formStatus.style.opacity = '1';
            }, 500);
          }
        }, 4000);
        
      }, 1500);
    });
  }

  // ==========================================
  // 11. DYNAMIC COPY TO CLIPBOARD FOR EMAIL
  // ==========================================
  const emailVal = document.getElementById('email-address');
  if (emailVal) {
    emailVal.style.cursor = 'pointer';
    emailVal.addEventListener('click', () => {
      const emailText = emailVal.innerText;
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = emailVal.innerHTML;
        emailVal.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i> Copied!';
        setTimeout(() => {
          emailVal.innerHTML = originalText;
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
});
