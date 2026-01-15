/* src/components/Hero/Hero.js */
import React from 'react';
import './Hero.css';
import github from '../../share/github.svg'; 
import linkedin from '../../share/linkedin.svg';
import profilePic from '../../share/profile.jpeg'; 

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="container hero-container">
        
        <div className="hero-text">
          <h3 className="greeting">Hello, I'm Jovan</h3>
          
          <h1 className="main-title">
            Senior Reporting Specialist, <br />
            <span className="highlight">Data Strategy Expert.</span>
          </h1>
          
          <p className="subtitle">
            I transform complex datasets into actionable executive insights using 
            Power BI, SQL, and Azure. Specializing in procurement analytics and 
            automated reporting architectures.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
              View Experience
            </button>
            
            <div className="social-links">
              <a href="https://linkedin.com/in/jovan-milicev/" target="_blank" rel="noreferrer">
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <a href="https://github.com/jmilicev" target="_blank" rel="noreferrer">
                <img src={github} alt="GitHub" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          <img 
            src={profilePic} 
            alt="Jovan Milicev" 
            className="profile-pic"
          />
        </div>

      </div>
    </div>
  );
}