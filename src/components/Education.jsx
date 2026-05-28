export default function Education() {
  const educationData = [
    {
      date: '2024 – present',
      title: 'B.Sc. (Hons) in IT specializing in Software Engineering',
      institute: 'Sri Lanka Institute of Information Technology (SLIIT)',
      desc: 'Current undergraduate studies covering core software developments, design principles, database configurations, internet architectures, and introductory DevOps automations.',
      markerIcon: 'bi bi-mortarboard-fill',
      delay: 100
    },
    {
      date: 'Completed',
      title: 'Diploma in Information Technology',
      institute: 'ESOFT Metro Campus',
      desc: 'Focused on basic web development technologies (HTML, CSS), structured scripting, and introductory computer applications.',
      markerIcon: 'bi bi-award-fill',
      delay: 200
    },
    {
      date: 'Completed',
      title: 'Diploma in English',
      institute: 'ESOFT Metro Campus',
      desc: 'Studied advanced grammar structures, technical report writings, and presentations to enable effective communication.',
      markerIcon: 'bi bi-globe',
      delay: 300
    },
    {
      date: 'Completed',
      title: 'G.C.E. Advanced Level (A/L)',
      institute: 'G/Siridhamma College',
      desc: 'Completed Advanced Level examinations in the physical science stream with excellent results, forming a strong foundation in technological concepts and practical engineering applications.',
      markerIcon: 'bi bi-award-fill',
      delay: 400
    }
  ];

  return (
    <section id="education" className="section-spacing">
      <div className="container">
        <div className="section-title-container text-center" data-aos="fade-up">
          <span className="section-subtitle">Academic Journey</span>
          <h2 className="section-title">Education</h2>
        </div>
        
        <div className="timeline-container">
          {educationData.map((item, index) => (
            <div key={index} className="timeline-item" data-aos="fade-up" data-aos-delay={item.delay}>
              <div className="timeline-marker">
                <i className={item.markerIcon}></i>
              </div>
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-institute">{item.institute}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
