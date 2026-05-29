import { useEffect, useState, useRef } from 'react';

const GITHUB_USER = 'DilkiSanjana';
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

export default function About() {
  const statsRef = useRef(null);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);
  const [stats, setStats] = useState({ projects: 0, tech: 0, certs: 0 });

  // --- Real GitHub contribution state ---
  const [githubData, setGithubData] = useState(null);   // array of {date,count,level}
  const [ghLoading, setGhLoading] = useState(true);
  const [ghError, setGhError] = useState(false);
  const [totalContribs, setTotalContribs] = useState(0);

  // Fetch real contributions on mount
  useEffect(() => {
    setGhLoading(true);
    fetch(CONTRIBUTIONS_API)
      .then((r) => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then((json) => {
        const all = json.contributions || [];
        // Keep only the most-recent 189 days (27 weeks × 7 days)
        const recent = all.slice(-189);
        setGithubData(recent);
        const total = recent.reduce((sum, d) => sum + d.count, 0);
        setTotalContribs(total);
        setGhLoading(false);
      })
      .catch(() => {
        setGhError(true);
        setGhLoading(false);
      });
  }, []);

  // Build column-based grid from the flat daily array
  const buildColumns = (days) => {
    // Pad the front so the first day lands on the correct weekday column
    const firstDow = new Date(days[0].date).getDay(); // 0=Sun
    const padded = [
      ...Array(firstDow).fill(null),
      ...days,
    ];
    const cols = [];
    for (let i = 0; i < padded.length; i += 7) {
      cols.push(padded.slice(i, i + 7));
    }
    return cols;
  };

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

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const columns = githubData ? buildColumns(githubData) : [];

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
              <div className="github-grid-wrap">
                <div className="github-grid-header">
                  <h5>
                    <i className="fab fa-github"></i>
                    {' '}GitHub Contribution Activity
                    {!ghLoading && !ghError && (
                      <span className="github-contrib-total">{totalContribs} contributions</span>
                    )}
                  </h5>
                  <a
                    href={`https://github.com/${GITHUB_USER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-profile-link"
                    title={`View ${GITHUB_USER} on GitHub`}
                  >
                    <i className="bi bi-box-arrow-up-right"></i> View Profile
                  </a>
                </div>

                <div className="github-grid-scroll">
                  {ghLoading && (
                    <div className="github-loading">
                      <div className="spinner-border spinner-border-sm" role="status"></div>
                      <span>Loading contributions…</span>
                    </div>
                  )}

                  {ghError && (
                    <div className="github-error">
                      <i className="bi bi-exclamation-triangle"></i> Could not load contribution data.
                    </div>
                  )}

                  {!ghLoading && !ghError && (
                    <div className="github-grid" id="githubMockGrid">
                      {columns.map((col, colIdx) => (
                        <div key={colIdx} className="github-col">
                          {col.map((cell, cellIdx) => {
                            if (!cell) {
                              return <div key={cellIdx} className="github-box git-level-0 github-box-empty" />;
                            }
                            const commitText = cell.count === 0
                              ? 'No contributions'
                              : `${cell.count} contribution${cell.count > 1 ? 's' : ''}`;
                            return (
                              <div
                                key={cellIdx}
                                className={`github-box git-level-${cell.level}`}
                                data-tooltip={`${commitText} on ${formatDate(cell.date)}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!ghLoading && !ghError && (
                  <div className="d-flex justify-content-end align-items-center gap-2 mt-2 text-muted small">
                    <span>Less</span>
                    <div className="github-box git-level-0"></div>
                    <div className="github-box git-level-1"></div>
                    <div className="github-box git-level-2"></div>
                    <div className="github-box git-level-3"></div>
                    <div className="github-box git-level-4"></div>
                    <span>More</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
