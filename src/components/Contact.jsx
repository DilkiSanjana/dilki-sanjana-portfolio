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
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => { setSentSuccess(false); }, 5000);
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
    <section id="contact" className="contact-section">
      <div className="container">

        {/* Section Label */}
        <div className="contact-label" data-aos="fade-up">
          <span className="contact-label-text">05 / CONTACT</span>
        </div>

        {/* Heading */}
        <div className="contact-heading" data-aos="fade-up" data-aos-delay="50">
          <h2 className="contact-main-title">Let's Build Together</h2>
          <p className="contact-sub-text">
            Have a project in mind? I'd love to hear from you. Let's create something extraordinary.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="contact-grid">

          {/* Left: Get in Touch */}
          <div className="contact-info-card" data-aos="fade-right" data-aos-delay="100">
            <h3 className="contact-info-title">Get in Touch</h3>

            <div className="contact-info-rows">
              {/* Email */}
              <div
                className="contact-info-row"
                onClick={handleCopyEmail}
                style={{ cursor: 'pointer' }}
                title="Click to copy email"
              >
                <div className="contact-row-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="contact-row-details">
                  <span className="contact-row-label">EMAIL</span>
                  <span className="contact-row-value">
                    {copied ? (
                      <><i className="bi bi-check-circle-fill" style={{ color: '#64ffda' }}></i> Copied!</>
                    ) : emailAddress}
                  </span>
                </div>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dilkisanjana/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-row contact-info-row-link"
              >
                <div className="contact-row-icon contact-row-icon-linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="contact-row-details">
                  <span className="contact-row-label">LINKEDIN</span>
                  <span className="contact-row-value">dilkisanjana</span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/DilkiSanjana"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-row contact-info-row-link"
              >
                <div className="contact-row-icon contact-row-icon-github">
                  <i className="fab fa-github"></i>
                </div>
                <div className="contact-row-details">
                  <span className="contact-row-label">GITHUB</span>
                  <span className="contact-row-value">DilkiSanjana</span>
                </div>
              </a>

              {/* Location */}
              <div className="contact-info-row">
                <div className="contact-row-icon contact-row-icon-location">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className="contact-row-details">
                  <span className="contact-row-label">LOCATION</span>
                  <span className="contact-row-value">Sri Lanka <span className="contact-country-flag">🇱🇰</span></span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="contact-social-row">
              <a href="https://github.com/DilkiSanjana" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/dilkisanjana/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={`mailto:${emailAddress}`} className="contact-social-btn" title="Email">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-card" data-aos="fade-left" data-aos-delay="200">
            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    className="contact-field-input"
                    id="name"
                    placeholder="Full Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="contact-field-input"
                    id="email"
                    placeholder="name@gmail.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="contact-field-input"
                  id="subject"
                  placeholder="Project Inquiry"
                  value={formState.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label" htmlFor="message">Message</label>
                <textarea
                  className="contact-field-input contact-field-textarea"
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-send-btn"
                disabled={isSending}
              >
                {isSending ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...</>
                ) : sentSuccess ? (
                  <><i className="bi bi-check-circle-fill me-2"></i> Sent!</>
                ) : (
                  <>Send Message &nbsp;→</>
                )}
              </button>

              {sentSuccess && (
                <div className="contact-alert contact-alert-success" role="alert">
                  <strong>Success!</strong> Hi {submittedName}, your message has been delivered. I will get back to you shortly!
                </div>
              )}
              {errorMessage && (
                <div className="contact-alert contact-alert-danger" role="alert">
                  <strong>Error!</strong> {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
