import { useEffect, useState, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const GITHUB_USER = 'DilkiSanjana';

export default function About({ theme }) {
  const statsRef = useRef(null);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);
  const [stats, setStats] = useState({ projects: 0, tech: 0, certs: 0 });

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStartedCounting) setHasStartedCounting(true); },
      { threshold: 0.1 }
    );
    const ref = statsRef.current;
    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, [hasStartedCounting]);

  useEffect(() => {
    if (!hasStartedCounting) return;
    const targets = { projects: 2, tech: 16, certs: 2 };
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const p = frame / totalFrames;
      setStats({
        projects: Math.min(targets.projects, Math.ceil(targets.projects * p)),
        tech:     Math.min(targets.tech,     Math.ceil(targets.tech     * p)),
        certs:    Math.min(targets.certs,    Math.ceil(targets.certs    * p)),
      });
      if (frame >= totalFrames) clearInterval(interval);
    }, frameRate);
    return () => clearInterval(interval);
  }, [hasStartedCounting]);

  const selectLastHalfYear = contributions => {
    // Display roughly the last 6 months (26 weeks = 182 days)
    return contributions.slice(-182);
  };

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
              <h3 className="h4 mb-3 gradient-text-accent">Undergraduate &amp; DevOps Practitioner</h3>
              <p className="mb-4">
                I am currently a Software Engineering student at the Sri Lanka Institute of Information Technology (SLIIT). I enjoy programming and focusing on DevOps, cloud environments, and automation processes.
              </p>
              <p className="mb-4">
                My goals include learning how to make deployments faster and system architectures more reliable. I look forward to working on deployment pipelines, server configurations, and container environments.
              </p>

              <div className="about-bullet">
                <div className="about-bullet-icon"><i className="bi bi-cpu-fill"></i></div>
                <div className="about-bullet-text">
                  <h5>Systems Automation</h5>
                  <p>Configuring Docker systems and basics of script scheduling for local testing environments.</p>
                </div>
              </div>

              <div className="about-bullet">
                <div className="about-bullet-icon"><i className="bi bi-cloud-arrow-up-fill"></i></div>
                <div className="about-bullet-text">
                  <h5>CI/CD &amp; Cloud</h5>
                  <p>Exploring GitHub Actions workflows and basic web deployments on AWS cloud environments.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            {/* Stats Blocks */}
            <div className="about-stats-grid" ref={statsRef}>
              <div className="stat-card">
                <span className="stat-number"><span className="stat-counter">{stats.projects}</span></span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number"><span className="stat-counter">{stats.tech}</span>+</span>
                <span className="stat-label">Technologies Studied</span>
              </div>
              <div className="stat-card">
                <span className="stat-number"><span className="stat-counter">{stats.certs}</span></span>
                <span className="stat-label">Certifications Obtained</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">SLIIT</span>
                <span className="stat-label">Undergraduate Study</span>
              </div>
            </div>

            {/* Real GitHub Contributions Board */}
            <div className="github-mock-container" data-aos="fade-up" data-aos-delay="300">
              <div className="github-grid-wrap" style={{ overflowX: 'auto', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: 'var(--border-radius-md)' }}>
                <div className="github-grid-header d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="fab fa-github" style={{ color: 'var(--text-primary)' }}></i>
                    {' '}GitHub Contribution Activity
                  </h5>
                  <a
                    href={`https://github.com/${GITHUB_USER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-profile-link"
                    title={`View ${GITHUB_USER} on GitHub`}
                    style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    <i className="bi bi-box-arrow-up-right"></i> View Profile
                  </a>
                </div>

                <div style={{ overflowX: 'auto', paddingBottom: '10px', width: '100%' }}>
                  <GitHubCalendar 
                    username={GITHUB_USER} 
                    colorScheme={theme === 'dark' ? 'dark' : 'light'}
                    transformData={selectLastHalfYear}
                    labels={{
                      totalCount: '{{count}} contributions in the last half year',
                    }}
                    theme={{
                      light: ['rgba(0,0,0,0.05)', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                      dark: ['rgba(255,255,255,0.05)', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      margin: '0 auto',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
