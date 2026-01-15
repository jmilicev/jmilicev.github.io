/* src/components/Education/Education.js */
import React from 'react';
import './Education.css';
import yorkLogo from '../../share/york.png'; 

export default function Education() {
  return (
    <div className="education-container">
      <h2 className="section-title">Education</h2>
      
      <div className="edu-card">
        <div className="edu-header">
          
          {/* Text Group */}
          <div className="edu-info">
            <h3>York University</h3>
            <span className="edu-year">2018 - 2023</span>
          </div>

          {/* Logo Group */}
          <img src={yorkLogo} alt="York University" className="edu-logo" />
          
        </div>

        <h4 className="degree">Honours Bachelor of Arts: Computer Science</h4>
        <p className="honors">First Class Standing</p>
        
        <div className="coursework">
          <span className="course-tag">Algorithms</span>
          <span className="course-tag">Machine Learning</span>
          <span className="course-tag">Software Design</span>
          <span className="course-tag">Database Systems</span>
          <span className="course-tag">Finance & Economics</span>
        </div>
      </div>
    </div>
  );
}