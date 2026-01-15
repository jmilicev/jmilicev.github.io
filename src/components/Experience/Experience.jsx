import React from 'react';
import './Experience.css';

import metrolinxLogo from '../../share/metrolinx.jpeg';
import chatbaseLogo from '../../share/chatbase.png';
import yorkLogo from '../../share/york.png';
import bnsLogo from '../../share/bns.png';

const experienceData = [
  {
    role: "Senior Reporting Specialist",
    company: "Metrolinx",
    companyUrl: "https://www.metrolinx.com/en",
    logo: metrolinxLogo,
    period: "June 2025 – Present",
    description: [
      "Lead the development and oversight of executive-facing Power BI dashboards and data pipelines, ensuring accuracy, performance, and alignment with evolving business priorities.",
      "Supervise a small team of analysts by assigning tasks, reviewing deliverables, and mentoring junior staff in reporting best practices, stakeholder communication, and technical execution.",
      "Act as a key liaison between procurement, finance, and IT leadership to define high-level reporting requirements, influence strategic planning, and prioritize analytics initiatives.",
      "Oversee recurring and ad hoc performance reporting cycles, providing quality assurance, deadline coordination, and contextual interpretation of key procurement and financial KPIs.",
      "Manage the evolution of the reporting architecture, including integration with Azure Databricks, SharePoint, and enterprise systems, to improve scalability and data integrity.",
      "Enhance data governance efforts by formalizing documentation, ownership, and change management protocols across multiple reporting domains.",
      "Represent the reporting function in executive meetings and working groups, translating data insights into actionable business recommendations.",
      "Lead workshops and internal training sessions to build organizational capacity in self-serve reporting and data-informed decision making."
    ]
  },
  {
    role: "Business Intelligence & Reporting Analyst",
    company: "Metrolinx",
    companyUrl: "https://www.metrolinx.com/en",
    logo: metrolinxLogo,
    period: "Nov 2024 – June 2025",
    description: [
      "Designed and maintained executive-facing Power BI dashboards integrated with Azure Databricks, enabling leadership to monitor procurement and financial KPIs in real time.",
      "Facilitated cross-functional collaboration between procurement, finance, and IT teams to align reporting and data needs with business objectives.",
      "Established data governance standards and worked with stakeholders to improve data quality across reporting functions.",
      "Implemented role-based access protocols for reporting tools to ensure appropriate data visibility and compliance with organizational policies.",
      "Provided decision support through recurring performance reports and ad hoc analysis, enhancing leadership’s ability to act on procurement and financial trends.",
      "Delivered training workshops for internal teams to support adoption of data-informed decision-making practices.",
      "Mentored junior staff in reporting best practices, stakeholder engagement, and business communication."
    ]
  },
  {
    role: "Procurement Analyst",
    company: "Metrolinx",
    companyUrl: "https://www.metrolinx.com/en",
    logo: metrolinxLogo,
    period: "Jan 2023 – Nov 2024",
    description: [
      "Developed and maintained Power BI dashboards to track and visualize procurement activities, including requisitions, purchase orders, and tenders, facilitating data-driven decision-making.",
      "Prepared detailed reports for government agencies, including the Ministry of Transportation (MTO) and Supply Ontario, ensuring timely and accurate submission of procurement data.",
      "Streamlined recurring procurement reporting by automating data analysis processes in Excel, improving efficiency and reducing manual errors.",
      "Helped administer the Pcard program, managing transaction data and ensuring compliance with internal procurement policies, contributing to enhanced financial control.",
      "Collaborated with cross-functional teams to analyze procurement spend, identifying cost-saving opportunities and improving supplier selection processes.",
      "Created and delivered board reports featuring key procurement metrics, providing actionable insights that informed executive decision-making.",
      "Contributed to the development and refinement of procurement policies and guidelines, aligning with organizational goals and regulatory requirements.",
      "Led variance analysis on procurement expenditures, providing recommendations to optimize budget management and supplier contract performance.",
      "Utilized advanced data analysis tools in Power BI and Excel to support strategic procurement initiatives and enhance operational efficiency."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "Chatbase",
    companyUrl: "https://www.chatbase.co",
    logo: chatbaseLogo,
    period: "May 2023 – Sept 2023",
    description: [
      "Developed a comprehensive and interactive website for the Chatbase API, providing clear instructions and guidelines for integration and usage by external developers.",
      "Conducted thorough testing of the API using tools like Postman and CURL, ensuring its functionality, reliability, and compatibility with various platforms.",
      "Developed a Discord Bot for the platform, enabling users to interact with the service through Discord.",
      "Enhanced the API documentation site by incorporating interactive code samples and live demos, increasing developer engagement and usability.",
      "Identified and reported API bugs, providing detailed feedback to the API development team for prompt resolution and improvement of the Chatbase API performance."
    ]
  },
  {
    role: "Undergraduate Teaching Assistant",
    company: "York University",
    companyUrl: "https://www.yorku.ca",
    logo: yorkLogo,
    period: "Sept 2022 – Jan 2023",
    description: [
      "Taught basics of assembly language programming in RISC-V and fundamentals of computer architecture in iVerilog.",
      "Facilitated a lab with over 50 students, which included solving complex problems and grading assignments, resulting in an overall increase in the class average.",
      "Graded assignments and exams, providing detailed feedback to students to help them improve their performance and understanding of the course material.",
      "Developed and delivered supplementary course materials, including sample problems and quizzes, to reinforce student understanding of complex concepts in computer architecture.",
      "Acted as a liaison between students and professors, providing feedback on course delivery and identifying areas for improved teaching effectiveness.",
      "Provided one-on-one tutoring to students who needed extra help, resulting in increased confidence and better academic performance."
    ]
  },
  {
    role: "Customer Experience Associate",
    company: "Scotiabank",
    companyUrl: "https://www.scotiabank.com/ca/en/personal.html",
    logo: bnsLogo,
    period: "April 2022 – Jan 2024",
    description: [
      "Maximized customer satisfaction by assisting clients with banking transactions, including bank drafts, mortgage payouts, and loan payments, with a high level of accuracy and attention to detail.",
      "Identified and escalated customer concerns to management, ensuring compliance with bank policies and improving the overall client experience.",
      "Analyzed incoming cheques, drafts, and wire payments to authenticate transactions and prevent fraudulent activity, safeguarding both customers and the bank.",
      "Coordinated and scheduled client appointments for a team of 10+ professionals, ensuring efficient time management and alignment with business needs.",
      "Led training sessions for new associates, sharing best practices in transaction accuracy and fraud prevention to uphold branch standards."
    ]
  }
];

export default function Experience() {
  return (
    <div className="experience-container">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              
              {/* Updated Header Structure */}
              <div className="timeline-header">
                <div className="header-text">
                  <h3>{item.role}</h3>
                  <span className="company">{item.company}</span>
                  <span className="period">{item.period}</span>
                </div>
                {/* Logo Link */}
                <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="company-logo-link">
                  <img src={item.logo} alt={`${item.company} logo`} className="company-logo-img" />
                </a>
              </div>

              <ul className="timeline-list">
                {item.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}