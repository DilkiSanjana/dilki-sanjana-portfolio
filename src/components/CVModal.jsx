export default function CVModal() {
  return (
    <>
      <div className="modal fade resume-modal" id="cvModal" tabIndex="-1" aria-labelledby="cvModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cvModalLabel">
                <i className="bi bi-file-earmark-person-fill text-primary me-2"></i> Interactive Resume Preview
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" id="printableResumeArea">
              {/* Print Resume Header */}
              <div className="text-center pb-4 mb-4 border-bottom border-color-soft">
                <h2 className="h3 text-primary mb-1">Dilki Sanjana</h2>
                <p className="text-secondary mb-2">Software Engineering Undergraduate | Aspiring DevOps Engineer</p>
                <div className="d-flex justify-content-center gap-3 text-muted small flex-wrap">
                  <span><i className="bi bi-envelope"></i> pkdilki.sanjana@gmail.com</span>
                  <span><i className="bi bi-telephone"></i> +94 76 847 9203</span>
                  <span><i className="bi bi-geo-alt"></i> Kottawagama, Galle, Sri Lanka</span>
                </div>
                <div className="d-flex justify-content-center gap-3 text-muted small mt-1">
                  <span><i className="fab fa-linkedin"></i> linkedin.com/in/dilkisanjana/</span>
                  <span><i className="fab fa-github"></i> github.com/DilkiSanjana</span>
                </div>
              </div>

              {/* Print Resume Sections */}
              <div className="mb-4">
                <h4 className="h5 text-primary border-bottom border-color-soft pb-2 mb-3">Professional Summary</h4>
                <p className="small text-secondary">
                  Motivated undergraduate specializing in Software Engineering with strong interest in DevOps, Cloud Computing, CI/CD pipelines, deployment automation, monitoring, and system reliability engineering. Eager to apply software principles and automation tools in internship positions.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="h5 text-primary border-bottom border-color-soft pb-2 mb-3">Education</h4>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="h6 mb-0 text-white">B.Sc. (Hons) in IT Specializing in Software Engineering</h5>
                    <span className="badge bg-secondary">2024 – present</span>
                  </div>
                  <span className="small text-muted d-block">Sri Lanka Institute of Information Technology (SLIIT)</span>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="h6 mb-0 text-white">Diploma in Information Technology</h5>
                    <span className="badge bg-secondary">Completed</span>
                  </div>
                  <span className="small text-muted d-block">ESOFT Metro Campus</span>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="h6 mb-0 text-white">Diploma in English</h5>
                    <span className="badge bg-secondary">Completed</span>
                  </div>
                  <span className="small text-muted d-block">ESOFT Metro Campus</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="h5 text-primary border-bottom border-color-soft pb-2 mb-3">Key Technical Competencies</h4>
                <div className="row text-secondary small">
                  <div className="col-md-4 mb-2">
                    <strong className="text-white">Programming:</strong> Java, JavaScript, HTML5, CSS3
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong className="text-white">Frameworks & DBs:</strong> Spring Boot, Node.js, Express, React Native, MongoDB, MySQL
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong className="text-white">DevOps & Clouds:</strong> Git/GitHub, Docker (Basics), CI/CD workflows, Linux Terminal, AWS (Basics)
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="h5 text-primary border-bottom border-color-soft pb-2 mb-3">Academic Projects</h4>
                <div className="mb-3">
                  <h5 className="h6 text-white mb-1">Rental Management System (Mobile Application)</h5>
                  <p className="small text-muted mb-1">React Native | Node.js | Express.js | MongoDB | Git</p>
                  <p className="small text-secondary mb-0">
                    Created a collaborative rental app using REST interfaces. Maintained role checks with JWT authorizations, managed listing catalogs, and organized files using Git.
                  </p>
                </div>
                <div>
                  <h5 className="h6 text-white mb-1">Medical Appointment Scheduling System (Web Application)</h5>
                  <p className="small text-muted mb-1">Java | Spring Boot | HTML/CSS | JavaScript</p>
                  <p className="small text-secondary mb-0">
                    Configured clinic calendars, scheduled consultations, integrated patient CRUD profiles, and used OOP principles alongside local file storage techniques.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="h5 text-primary border-bottom border-color-soft pb-2 mb-3">Certifications</h4>
                <ul className="small text-secondary list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-award text-primary me-2"></i> <strong>Python for Beginners</strong> – University of Moratuwa (CODL)
                  </li>
                  <li>
                    <i className="bi bi-award text-primary me-2"></i> <strong>Web Design for Beginners</strong> – University of Moratuwa (CODL)
                  </li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-premium-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn-premium-primary" onClick={() => window.print()}>
                <i className="bi bi-printer-fill"></i> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles Overrides for PDF Export */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #cvModal, #cvModal * {
            visibility: visible !important;
          }
          #cvModal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            background: white !important;
            color: black !important;
          }
          .modal-body {
            max-height: none !important;
            overflow-y: visible !important;
          }
          .modal-footer, .btn-close, .modal-header {
            display: none !important;
          }
          #printableResumeArea {
            color: #000000 !important;
            background: #ffffff !important;
            padding: 0 !important;
          }
          #printableResumeArea .text-primary, 
          #printableResumeArea h2, 
          #printableResumeArea h3, 
          #printableResumeArea h4, 
          #printableResumeArea h5, 
          #printableResumeArea strong {
            color: #0b132b !important;
          }
          #printableResumeArea .text-secondary, 
          #printableResumeArea .text-muted, 
          #printableResumeArea p, 
          #printableResumeArea li, 
          #printableResumeArea span {
            color: #333333 !important;
          }
          #printableResumeArea .border-bottom, 
          #printableResumeArea .border-color-soft {
            border-color: #dddddd !important;
          }
          #printableResumeArea .badge {
            background: #eeeeee !important;
            color: #000000 !important;
            border: 1px solid #cccccc !important;
          }
        }
      `}</style>
    </>
  );
}
