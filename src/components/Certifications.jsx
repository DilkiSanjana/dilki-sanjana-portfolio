export default function Certifications() {
  const certificationsData = [
    {
      title: 'Python for Beginners',
      authority: 'University of Moratuwa (CODL)',
      desc: 'Completed basic Python programming concepts including loop definitions, parameters, functional scripting, and fundamental algorithmic structures.',
      iconClass: 'bi bi-patch-check-fill',
      aosFade: 'fade-right'
    },
    {
      title: 'Web Design for Beginners',
      authority: 'University of Moratuwa (CODL)',
      desc: 'Covered web layouts structuring, styling designs with CSS rules, standard responsive configurations, and basic layout components.',
      iconClass: 'bi bi-layout-text-window-reverse',
      aosFade: 'fade-left'
    }
  ];

  return (
    <section id="certifications" className="section-spacing">
      <div className="container">
        <div className="section-title-container text-start" data-aos="fade-up">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Certifications</h2>
        </div>
        
        <div className="row g-4">
          {certificationsData.map((cert) => (
            <div key={cert.title} className="col-md-6" data-aos={cert.aosFade} data-aos-delay="100">
              <div className="glass-card cert-card">
                <div className="cert-icon-wrapper">
                  <i className={cert.iconClass}></i>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-authority">{cert.authority}</span>
                <p className="cert-desc">{cert.desc}</p>
                <div className="cert-badge">
                  <i className="bi bi-shield-check"></i> Verified Core Skills
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
