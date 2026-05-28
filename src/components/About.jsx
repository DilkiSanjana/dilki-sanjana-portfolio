import { useEffect, useState, useRef, useMemo } from 'react';

export default function About() {
  const statsRef = useRef(null);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    tech: 0,
    certs: 0
  });

  // Animated counters configuration
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStartedCounting) {
          setHasStartedCounting(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStartedCounting]);

  useEffect(() => {
    if (!hasStartedCounting) return;

    const targets = { projects: 2, tech: 16, certs: 2 };
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      setStats({
        projects: Math.min(targets.projects, Math.ceil(targets.projects * progress)),
        tech: Math.min(targets.tech, Math.ceil(targets.tech * progress)),
        certs: Math.min(targets.certs, Math.ceil(targets.certs * progress))
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, [hasStartedCounting]);

  //Procedural Mock Github Commit grid data generation (6 months = 27 cols * 7 rows)
  const githubBoardData = useMemo(() => {
    const totalCols = 27;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const columns = [];

    for (let c = 0; c < totalCols; c++) {
      const columnCells = [];
      for (let r = 0; r < 7; r++) {
        const dayOffset = ((totalCols - 1 - c) * 7) + (6 - r);
        const cellDate = new Date();
        cellDate.setDate(today.getDate() - dayOffset);
        
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

        const dateString = `${months[cellDate.getMonth()]} ${cellDate.getDate()}, ${cellDate.getFullYear()}`;
        const commitText = commits === 0 ? 'No contributions' : `${commits} contribution${commits > 1 ? 's' : ''}`;
        
        columnCells.push({
          level,
          tooltip: `${commitText} on ${dateString}`
        });
      }
      columns.push(columnCells);
    }
    return columns;
  }, []);

  return (
    <section id="about" className="section-spacing">
      <div className="container">
        <div className="section-title-container text-start" data-aos="fade-up">
          <span className="section-subtitle">Discovery</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <div className="glass-card mb-4 mb-lg-0">
              <h3 className="h4 mb-3 gradient-text-accent">Undergraduate & DevOps Practitioner</h3>
              <p className="mb-4">
                I am currently a Software Engineering student at the Sri Lanka Institute of Information Technology (SLIIT). I enjoy programming and focusing on DevOps, cloud environments, and automation processes.
              </p>
              <p className="mb-4">
                My goals include learning how to make deployments faster and system architectures more reliable. I look forward to working on deployment pipelines, server configurations, and container environments.
              </p>
              
              <div className="about-bullet">
                <div className="about-bullet-icon">
                  <i className="bi bi-cpu-fill"></i>
                </div>
                <div className="about-bullet-text">
                  <h5>Systems Automation</h5>
                  <p>Configuring Docker systems and basics of script scheduling for local testing environments.</p>
                </div>
              </div>
              
              <div className="about-bullet">
                <div className="about-bullet-icon">
                  <i className="bi bi-cloud-arrow-up-fill"></i>
                </div>
                <div className="about-bullet-text">
                  <h5>CI/CD & Cloud</h5>
                  <p>Exploring GitHub Actions workflows and basic web deployments on AWS cloud environments.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            {/* Stats Blocks */}
            <div className="about-stats-grid" ref={statsRef}>
              <div className="stat-card">
                <span className="stat-number">
                  <span className="stat-counter">{stats.projects}</span>
                </span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  <span className="stat-counter">{stats.tech}</span>+
                </span>
                <span className="stat-label">Technologies Studied</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  <span className="stat-counter">{stats.certs}</span>
                </span>
                <span className="stat-label">Certifications Obtained</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">SLIIT</span>
                <span className="stat-label">Undergraduate Study</span>
              </div>
            </div>
            
            {/* Interactive Github Contributions Board */}
            <div className="github-mock-container" data-aos="fade-up" data-aos-delay="300">
              <div className="github-grid-wrap">
                <div className="github-grid-header">
                  <h5><i className="fab fa-github"></i> Recent Learning Commit Activity</h5>
                  <span className="text-muted small">Interactive View</span>
                </div>
                <div className="github-grid-scroll">
                  <div className="github-grid" id="githubMockGrid">
                    {githubBoardData.map((col, colIdx) => (
                      <div key={colIdx} className="github-col">
                        {col.map((cell, cellIdx) => (
                          <div
                            key={cellIdx}
                            className={`github-box git-level-${cell.level}`}
                            data-tooltip={cell.tooltip}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-center gap-2 mt-2 text-muted small">
                  <span>Less</span>
                  <div className="github-box git-level-0"></div>
                  <div className="github-box git-level-1"></div>
                  <div className="github-box git-level-2"></div>
                  <div className="github-box git-level-3"></div>
                  <div className="github-box git-level-4"></div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
