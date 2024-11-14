import React, { useRef } from 'react';
import '../share/generic.css';
import york from '../share/york.png';
import bns from './bns.png';
import metrolinx from './metrolinx.jpeg';
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


      <div id="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px", marginTop: "23px" }}>BI & Reporting Analyst</h3>
      <a href="https://www.metrolinx.com/en"><img src={metrolinx} className="share" alt="logo" /></a>
    </div>
    <h4 style={{ marginRight: "20px", marginTop: "-20px" }}>November 2024 - Present</h4>
    <ul>
      <li>Responsibilities and key contributions coming soon as I settle into my new role.</li>
    </ul>


      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Procurement Analyst - Metrolinx</h3>
      <a href="https://www.metrolinx.com/en"><img src={metrolinx} className="share" alt="logo" /></a>
      </div>
      <h4 style={{ marginRight: "20px",marginTop: "-20px" }}>January 2023 - November 2024</h4>
      <ul>
        <li>Developed and maintained Power BI dashboards to track and visualize procurement activities, including requisitions, purchase orders, and tenders, facilitating data-driven decision-making.</li>
        <li>Prepared detailed reports for government agencies, including the Ministry of Transportation (MTO) and Supply Ontario, ensuring timely and accurate submission of procurement data.</li>
        <li>Streamlined recurring procurement reporting by automating data analysis processes in Excel, improving efficiency and reducing manual errors.</li>
        <li>Helped administer the Pcard program, managing transaction data and ensuring compliance with internal procurement policies, contributing to enhanced financial control.</li>
        <li>Collaborated with cross-functional teams to analyze procurement spend, identifying cost-saving opportunities and improving supplier selection processes.</li>
        <li>Created and delivered board reports featuring key procurement metrics, providing actionable insights that informed executive decision-making.</li>
        <li>Contributed to the development and refinement of procurement policies and guidelines, aligning with organizational goals and regulatory requirements.</li>
        <li>Led variance analysis on procurement expenditures, providing recommendations to optimize budget management and supplier contract performance.</li>
        <li>Utilized advanced data analysis tools in Power BI and Excel to support strategic procurement initiatives and enhance operational efficiency.</li>
      </ul>


      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Full Stack Developer - Chatbase</h3>
      <a href="https://www.chatbase.co"><img src={chatbase} className="share" alt="logo" /></a>
      </div>
      <h4 style={{ marginRight: "20px",marginTop: "-20px" }}>May 2023 - September 2023</h4>
      <ul>
        <li>Developed a website providing comprehensive and interactive documentation for the Chatbase API, providing clear instructions and guidelines for integration and usage by external developers.</li>
        <li>Conducted thorough testing of the API using tools like Postman and CURL, ensuring its functionality, reliability, and compatibility with various platforms.</li>
        <li>Developed a Discord Bot for the platform enabling users to interact with the service through discord.</li>
        <li>Identified and reported API bugs, providing detailed feedback to the API development team for prompt resolution and improvement of the Chatbase API performance.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Teaching Assistant - YorkU</h3>
      <a href="https://www.yorku.ca"><img src={york} className="share" alt="logo" /></a>
      </div>
      <h4 style={{ marginRight: "20px",marginTop: "-20px" }}>September 2022 - January 2023</h4>
      <ul>
        <li>Teaching assistant for EECS2021 (Computer Organization). Taught basics of assembly language programming in RISC-V and fundamentals of computer architecture in iVerilog.</li>
        <li>Facilitated a lab with over 50 students which included solving complex problems, grading assignments, etc. which resulted in an overall increase in the class average.</li>
        <li>Graded assignments and exams, providing detailed feedback to students to help them improve their performance and understanding of the course material.</li>
        <li> Provided one-on-one tutoring to students who needed extra help, resulting in increased confidence and better academic performance.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Teller - Scotiabank</h3>
      <a href="https://www.scotiabank.com/ca/en/personal.html"><img src={bns} className="share" alt="logo" /></a>
      </div>
      <h4 style={{ marginRight: "20px",marginTop: "-20px" }}>April 2022 - January 2024</h4>
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
