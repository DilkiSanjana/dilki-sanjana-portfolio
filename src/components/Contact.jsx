import { useState } from 'react';

export default function Contact() {
  const emailAddress = 'pkdilki.sanjana@gmail.com';
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      return;
    }

    setIsSending(true);
    setErrorMessage('');
    setSentSuccess(false);
    setSubmittedName(formState.name);

    // Read Access Key from environment variable or fallback to a placeholder
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '88a07616-0ced-4402-8026-061b2a47071a';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          from_name: 'Portfolio Contact Form'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSentSuccess(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setSentSuccess(false);
        }, 5000);
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setErrorMessage('Failed to send message. Please check your internet connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-spacing">
      <div className="container">
        <div className="section-title-container text-center" data-aos="fade-up">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact</h2>
        </div>
        
        <div className="row g-4 align-items-stretch">
          {/* Left details card */}
          <div className="col-lg-5" data-aos="fade-right" data-aos-delay="100">
            <div className="glass-card h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h4 mb-3 gradient-text-accent">Let's Discuss Internships!</h3>
                <p className="text-muted mb-4">
                  I'm actively searching for internship opportunities in Software Engineering and DevOps roles. Let's connect!
                </p>
                
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div className="contact-info-details">
                      <h5>Email</h5>
                      <p 
                        id="email-address" 
                        onClick={handleCopyEmail} 
                        style={{ cursor: 'pointer' }}
                        title="Click to copy"
                      >
                        {copied ? (
                          <>
                            <i className="bi bi-check-circle-fill text-success"></i> Copied!
                          </>
                        ) : (
                          emailAddress
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div className="contact-info-details">
                      <h5>Phone</h5>
                      <p>+94 76 847 9203</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="contact-info-details">
                      <h5>Location</h5>
                      <p>Galle, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-top border-color-soft mt-4">
                <span className="d-block text-muted small mb-2 text-uppercase">Check my networks:</span>
                <div className="d-flex gap-3">
                  <a href="https://www.linkedin.com/in/dilkisanjana/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/DilkiSanjana" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Form card */}
          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
            <div className="glass-card h-100">
              <h3 className="h4 mb-4">Send Me a Message</h3>
              <form id="contactForm" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating-custom">
                      <input 
                        type="text" 
                        className="form-control-custom" 
                        id="name" 
                        placeholder=" " 
                        value={formState.name}
                        onChange={handleInputChange}
                        required 
                      />
                      <label className="form-label-custom" htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating-custom">
                      <input 
                        type="email" 
                        className="form-control-custom" 
                        id="email" 
                        placeholder=" " 
                        value={formState.email}
                        onChange={handleInputChange}
                        required 
                      />
                      <label className="form-label-custom" htmlFor="email">Your Email</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating-custom">
                  <input 
                    type="text" 
                    className="form-control-custom" 
                    id="subject" 
                    placeholder=" " 
                    value={formState.subject}
                    onChange={handleInputChange}
                    required 
                  />
                  <label className="form-label-custom" htmlFor="subject">Subject</label>
                </div>
                <div className="form-floating-custom">
                  <textarea 
                    className="form-control-custom" 
                    id="message" 
                    placeholder=" " 
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label className="form-label-custom" htmlFor="message">Message Details</label>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-premium-primary w-100 justify-content-center py-3"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...
                    </>
                  ) : sentSuccess ? (
                    <>
                      <i className="bi bi-check-circle-fill me-2"></i> Sent!
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2"></i> Send
                    </>
                  )}
                </button>

                {sentSuccess && (
                  <div className="alert alert-success mt-3" role="alert">
                    <strong>Success!</strong> Hi {submittedName}, your message has been delivered. I will get back to you shortly!
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    <strong>Error!</strong> {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
