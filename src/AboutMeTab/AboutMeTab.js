import React, { useRef } from 'react';
import '../share/generic.css';

export default function AboutMeTab() {

  const aboutMeTabRef = useRef(null);

  const scrollToAboutMeTab = () => {
    aboutMeTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="AboutMe">

    <button id="arrowbutton" onClick={scrollToAboutMeTab}>↓</button>

    <div id="aboutme">
  <h2 ref={aboutMeTabRef}>My Story</h2>
  <p>
    Welcome to my personal platform, where I share my professional journey, projects, and personal interests.
  </p>
  
  <p>
    Im Jovan Milicev, a Business Intelligence & Reporting Analyst at Metrolinx with a strong foundation in Computer Science from York University. My path in technology began with a passion for problem-solving and innovation, which led me to develop my first Java-based game in middle school. Over time, my interests expanded into areas like data analysis, procurement, and full-stack development, shaping a diverse career grounded in technology and business intelligence.
  </p>

  <h3>Professional Journey</h3>
  <p>
    Currently, at Metrolinx, I lead initiatives that merge data analysis with procurement strategies. Ive developed and maintained Power BI dashboards to visualize procurement activities, streamlining decision-making and improving the reporting process. My work includes preparing detailed reports for government bodies such as the Ministry of Transportation and Supply Ontario, contributing to projects that have real-world impacts on public transportation.
  </p>
  <p>
    Prior to my current role, I worked in various capacities that sharpened my analytical and technical skills. As a Procurement Analyst at Metrolinx, I automated complex reporting processes and played a key role in enhancing the organizations procurement policies. My time at Scotiabank as a Customer Experience Associate allowed me to develop a client-focused approach, managing transactions with precision while identifying opportunities for process improvements.
  </p>
  <p>
    My experience as a Full Stack Developer at Chatbase honed my technical skills further. I contributed to API development, built a Discord Bot, and conducted API testing to ensure functionality across platforms. Additionally, as an Undergraduate Teaching Assistant at York University, I taught assembly language programming and computer architecture, mentoring students and contributing to their academic growth.
  </p>

  <h3>Technical Projects</h3>
  <p>
    Ive worked on a variety of projects that reflect my commitment to continuous learning and problem-solving. From building a dynamic portfolio website to creating custom data solutions for procurement analysis, my projects demonstrate an ability to apply technology creatively. I also developed an adaptable internet scraper to automate the sourcing of training data, a testament to my skills in full-stack development and data manipulation.
  </p>

  <h3>Personal Interests</h3>
  <p>
    Beyond my professional life, Im deeply interested in finance, particularly securities trading and investment banking. These areas, alongside my passion for data, drive me to explore how technology can optimize decision-making in various industries. Im also an avid motorcycle enthusiast and enjoy photography, which provide a creative outlet and a balance to my technical work.
  </p>

  <h3>Looking Forward</h3>
  <p>
    As I continue to grow in my role at Metrolinx, Im excited about the opportunities ahead. My work allows me to combine technical expertise with my desire to contribute to impactful community projects, aligning with my broader goal of making meaningful contributions to society.
  </p>

  <p>
    Thank you for visiting my site. Feel free to connect with me on LinkedIn and explore my projects on GitHub.
  </p>
</div>


  </div>
  )
}
