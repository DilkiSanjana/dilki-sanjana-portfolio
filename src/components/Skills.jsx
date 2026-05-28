import { useEffect, useState, useRef } from 'react';

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [animateProgress, setAnimateProgress] = useState(false);

  const skillsData = [
    // Programming Languages
    { name: 'Java', subtext: 'OOP & Backend', level: 75, category: 'programming', iconClass: 'devicon-java-plain colored' },
    { name: 'JavaScript', subtext: 'Web & Mobile Logic', level: 80, category: 'programming', iconClass: 'devicon-javascript-plain colored' },
    { name: 'HTML5', subtext: 'Structure', level: 85, category: 'programming', iconClass: 'devicon-html5-plain colored' },
    { name: 'CSS3', subtext: 'Design & Styles', level: 75, category: 'programming', iconClass: 'devicon-css3-plain colored' },
    // Frameworks & Databases
    { name: 'React Native', subtext: 'Mobile Applications', level: 70, category: 'frameworks', iconClass: 'devicon-react-original colored' },
    { name: 'Node.js', subtext: 'Javascript Runtime', level: 75, category: 'frameworks', iconClass: 'devicon-nodejs-plain colored' },
    { name: 'Express.js', subtext: 'REST API Framework', level: 75, category: 'frameworks', iconClass: 'devicon-express-original colored' },
    { name: 'Spring Boot', subtext: 'Java Server Architecture', level: 50, category: 'frameworks', iconClass: 'devicon-spring-original colored' },
    { name: 'MongoDB', subtext: 'Document Database', level: 70, category: 'frameworks', iconClass: 'devicon-mongodb-plain colored' },
    { name: 'MySQL', subtext: 'Relational Database', level: 75, category: 'frameworks', iconClass: 'devicon-mysql-plain colored' },
    // DevOps & Tools
    { name: 'Git', subtext: 'Version Management', level: 60, category: 'devops', iconClass: 'devicon-git-plain colored' },
    { name: 'GitHub', subtext: 'Remote Collaborative Host', level: 60, category: 'devops', iconClass: 'devicon-github-original colored' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimateProgress(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const filteredSkills = skillsData.filter(
    (skill) => activeFilter === 'all' || skill.category === activeFilter
  );

  return (
    <section id="skills" className="section-spacing" ref={sectionRef}>
      <div className="container">
        <div className="section-title-container text-center" data-aos="fade-up">
          <span className="section-subtitle">Proficiencies</span>
          <h2 className="section-title">My Tech Stack</h2>
        </div>
        
        {/* Filter Controls */}
        <div className="skills-filter-container" data-aos="fade-up" data-aos-delay="100">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Tech
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'programming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('programming')}
          >
            Programming Languages
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'frameworks' ? 'active' : ''}`}
            onClick={() => setActiveFilter('frameworks')}
          >
            Frameworks & Databases
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'devops' ? 'active' : ''}`}
            onClick={() => setActiveFilter('devops')}
          >
            DevOps & Platforms
          </button>
        </div>
        
        {/* Skills Grid */}
        <div className="row g-4 justify-content-center" style={{ minHeight: '300px' }}>
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="col-lg-3 col-md-4 col-sm-6 skill-item-col"
              data-category={skill.category}
              data-aos="zoom-in"
              data-aos-delay={100 + (index % 4) * 50}
              style={{
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: 1,
                transform: 'scale(1)'
              }}
            >
              <div className="skill-card">
                <div className="skill-header">
                  <div className="skill-icon-wrap">
                    <i className={skill.iconClass}></i>
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span>{skill.subtext}</span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress-label-row">
                    <span>Level</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-custom">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: animateProgress ? `${skill.level}%` : '0%',
                        transition: 'width 1s cubic-bezier(0.1, 0.8, 0.2, 1)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
