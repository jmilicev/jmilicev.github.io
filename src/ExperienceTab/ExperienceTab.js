import React, { useRef } from 'react';
import '../share/generic.css';
import york from '../share/york.png';
import bns from './bns.png';
import chatbase from '../share/chatbase.png';


export default function ExperienceTab() {

  const experienceTabRef = useRef(null);

  const scrollToExperienceTab = () => {
    experienceTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="Experience">


    <button id="arrowbutton" onClick={scrollToExperienceTab}>
            ↓
          </button>

    <div id="experience">

      <h2 ref={experienceTabRef}>Experience</h2>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Full Stack Developer | Chatbase</h3>
      <a href="https://www.chatbase.co"><img src={chatbase} className="share" alt="logo" /></a>
      </div>
      <ul>
        <li>Developed a website providing comprehensive and interactive documentation for the Chatbase API, providing clear instructions and guidelines for integration and usage by external developers.</li>
        <li>Conducted thorough testing of the API using tools like Postman, ensuring its functionality, reliability, and compatibility with various platforms.</li>
        <li> Created a Discord Bot for the platform enabling users to interact with the service through discord. </li>
        <li>Tested, identified and corrected bugs in the production website to ensure a high quality user experience.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Undergraduate Teaching Assistant | York University</h3>
      <a href="https://www.yorku.ca"><img src={york} className="share" alt="logo" /></a>
      </div>
      <ul>
        <li>Teaching assistant for EECS2021 (Computer Organization). Taught basics of assembly language programming in RISC-V and fundamentals of computer architecture in iVerilog.</li>
        <li>Facilitated a lab with over 50 students which included solving complex problems, grading assignments, etc. which resulted in an overall increase in the class average.</li>
        <li>Graded assignments and exams, providing detailed feedback to students to help them improve their performance and understanding of the course material.</li>
        <li> Provided one-on-one tutoring to students who needed extra help, resulting in increased confidence and better academic performance.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Teller | Scotiabank</h3>
      <a href="https://www.scotiabank.com/ca/en/personal.html"><img src={bns} className="share" alt="logo" /></a>
      </div>
      <ul>
      <li>Maximized customer satisfaction by helping clients with their banking transactions with a high attention to detail; daily functions included creating bank drafts, mortgage payouts, loan payments, etc.</li>
      <li>Identified customer concerns and prioritize customer complaints to the management team to ensure compliance with bank’s policy and improve the overall client experience.</li>
      <li>Analyzed incoming cheques, drafts, and wire payments to confirm authenticity and prevent any fraudulent activity within the branch to protect customers and the company.</li>
      <li>Scheduled client appointments for a team of 10+ professionals to accommodate the needs of the business and the clients.</li>
      </ul>

      </div>

    </div>
  )
}
