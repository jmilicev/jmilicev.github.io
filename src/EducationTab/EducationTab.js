import React, { useRef } from 'react';
import './EducationTab.css';


export default function EducationTab() {

  const educationTabRef = useRef(null);

  const scrollToEducationTab = () => {
    educationTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="Education">


    <button id="arrowbutton" onClick={scrollToEducationTab}>
            ↓
          </button>

      <h2 ref={educationTabRef}>Education</h2>

      <h3 >Honours, Bachelor of Arts, Computer Science | York University</h3>
      <ul>
      <li>GPA of 7.6/9.</li>
      <li>Graduating in October 2023 with only one class to go!</li>
      <li>On track to graduate with first class standing, and as part of the Deans honour roll.</li>
      <li>Data Structures and Algorithms, Computer Architecture, Advanced Object Oriented Programming, Distributed Systems, Database Management Systems, Computer Networking.</li>
      <li>My electives include Business, Economics, Finance and Astronomy.</li>
      </ul>


    </div>
  )
}
