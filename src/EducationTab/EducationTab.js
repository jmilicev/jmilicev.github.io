import React, { useRef } from 'react';
import '../share/generic.css';
import york from '../share/york.png'


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

      <div id="education">
        <h2 ref={educationTabRef}>Education</h2>

        <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ marginRight: "20px",marginTop: "23px" }}>HBA, Computer Science | York University</h3>
        <a href="https://www.yorku.ca"><img src={york} className="share" alt="logo" /></a>
        </div>
        <ul>

        <li>Graduated in August 2023 with First Class Standing and member of the Dean's honour roll. </li>
        <li>Data Structures and Algorithms, Computer Architecture, Advanced Object Oriented Programming, Distributed Systems, Database Management Systems, Computer Networking.</li>
        <li>My electives include Business, Economics, Finance and Astronomy.</li>
        </ul>

      </div>

    </div>
  )
}
