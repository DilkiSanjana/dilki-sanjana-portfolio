export default function Projects() {
  const projectsData = [
    {
      title: 'Rental Management System',
      desc: 'A mobile-based app targeting property listings and tenant-owner transactions. Designed to make the agreement generation process easier.',
      image: `${import.meta.env.BASE_URL}assets/images/project-rental.png`,
      features: [
        'Mobile property searches and detail views.',
        'Separate user roles for tenants and property owners.',
        'Secured routes powered by JWT authorization.',
        'Digital contract forms and agreement lifecycle tracking.',
        'Controlled code base using Git repositories.'
      ],
      tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/DilkiSanjana',
      demo: '#',
      demoOffline: true,
      aosFade: 'fade-right'
    },
    {
      title: 'Medical Appointment Scheduler',
      desc: 'A web application created to simplify clinic appointments, scheduling slots for doctors, and handling patient logs.',
      image: `${import.meta.env.BASE_URL}assets/images/project-medical.png`,
      features: [
        'Clean UI dashboard for appointment booking logs.',
        'CRUD operations for patient registration and medical details.',
        'Java OOP patterns ensuring logical modular structures.',
        'Local file handling storage for appointment entries.'
      ],
      tags: ['Java', 'Spring Boot', 'HTML/CSS', 'JavaScript'],
      github: 'https://github.com/DilkiSanjana',
      demo: '#',
      demoOffline: true,
      aosFade: 'fade-left'
    }
  ];

  return (
    <section id="projects" className="section-spacing">
      <div className="container">
        <div className="section-title-container text-start" data-aos="fade-up">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        
        <div className="row g-4">
          {projectsData.map((project, index) => (
            <div key={project.title} className="col-lg-6" data-aos={project.aosFade} data-aos-delay={(index + 1) * 100}>
              <div className="glass-card project-card">
                <div className="project-img-wrapper">
                  <div className="project-img-overlay"></div>
                  <img src={project.image} alt={`${project.title} Mockup Screen`} className="project-img" />
                </div>
                <div className="project-body">
                  <h3 className="project-title text-primary">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <ul className="project-feature-list">
                    {project.features.map((feature, fIndex) => (
                      <li key={fIndex}>
                        <i className="bi bi-check-circle"></i> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-outline">
                      <i className="fab fa-github"></i> Repository
                    </a>
                    {project.demoOffline ? (
                      <a href="#" className="project-btn project-btn-primary disabled" onClick={(e) => e.preventDefault()}>
                        <i className="bi bi-play-fill"></i> Live Demo (Offline)
                      </a>
                    ) : (
                      <a href={project.demo} className="project-btn project-btn-primary">
                        <i className="bi bi-play-fill"></i> Live Demo
                      </a>
                    )}
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
