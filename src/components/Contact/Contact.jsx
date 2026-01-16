/* src/components/Contact/Contact.js */
import React from 'react';
import './Contact.css';
import linkedin from '../../share/linkedin.svg'; 

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact-text">
        Whether you have a question about my reporting strategies, 
        want to discuss Power BI architecture, or just want to expand your network, 
        I'm always open to connecting.
      </p>
      
      <div className="contact-actions">
        {/* Email Button */}
        <a href="mailto:contact@jovanmilicev.com" className="btn email-btn">
          Send Email
        </a>

        {/* LinkedIn Button */}
        <a href="https://linkedin.com/in/jovan-milicev/" target="_blank" rel="noreferrer" className="btn linkedin-btn">
          <img src={linkedin} alt="LinkedIn" className="btn-icon" />
          Connect on LinkedIn
        </a>
      </div>

      <div className="footer-note">
        <p>Designed & Built by Jovan Milicev</p>
      </div>
    </div>
  );
}