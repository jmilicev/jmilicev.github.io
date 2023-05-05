import React, { useRef } from 'react';
import './ExperienceTab.css';
import york from '../share/york.png';
import bns from './bns.png';


export default function ExperienceTab() {

  const experienceTabRef = useRef(null);

  const scrollToExperienceTab = () => {
    experienceTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="experience" className="Experience">


    <button id="arrowbutton" onClick={scrollToExperienceTab}>
            ↓
          </button>

      <h2 ref={experienceTabRef}>Experience</h2>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Undergraduate Teaching Assistant | York University</h3>
      <img src={york} className="share" alt="logo" />
</div>
      <ul>
        <li>Teaching assistant for EECS2021 (Computer Organization). Taught basics of assembly language programming in RISC-V and fundamentals of computer architecture in iVerilog.</li>
        <li>Facilitated a lab with over 50 students which included solving complex problems, grading assignments, etc. which resulted in an overall increase in the class average.</li>
        <li>Graded assignments and exams, providing detailed feedback to students to help them improve their performance and understanding of the course material.</li>
        <li> Provided one-on-one tutoring to students who needed extra help, resulting in increased confidence and better academic performance.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Teller | Scotiabank</h3>
      <img src={bns} className="share" alt="logo" />
      </div>
      <ul>
      <li>Maximized customer satisfaction by helping clients with their banking transactions with a high attention to detail; daily functions included creating bank drafts, mortgage payouts, loan payments, etc.</li>
      <li>Identified customer concerns and prioritize customer complaints to the management team to ensure compliance with bank’s policy and improve the overall client experience.</li>
      <li>Analyzed incoming cheques, drafts, and wire payments to confirm authenticity and prevent any fraudulent activity within the branch to protect customers and the company.</li>
      <li>Scheduled client appointments for a team of 10+ professionals to accommodate the needs of the business and the clients.</li>
      </ul>



    </div>
  )
}
