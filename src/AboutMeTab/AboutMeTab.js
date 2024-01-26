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
      Welcome to my personal website. This is a platform where I showcase my projects, professional experiences, 
      and other facets of my career and personal interests. 
      </p>
      
      <p>
      I am Jovan Milicev, a recent Computer Science graduate from York University. My journey in programming began 
      early, with my first foray into writing a Java-based guessing game in middle school. My interests extend beyond 
      computing into finance, particularly investment banking and securities trading. Additionally, I enjoy photography 
      and am an avid motorcycle enthusiast.
      </p>

      <p>
      My professional experience is diverse, ranging from being a Customer Experience Associate at Scotiabank, 
      where I honed my skills in client interactions and financial transactions, to a Full Stack Developer internship 
      at Chatbase, where I developed a Discord Bot and contributed to API testing and documentation. At York University, 
      I also served as an Undergraduate Teaching Assistant for EECS 2021, focusing on assembly language and iVerilog programming. 
      </p>

      <p>
      My projects are a testament to my passion for technology and problem-solving. These include developing a novel programming language, 
      creating a dynamic portfolio website, and an adaptable internet scraper for sourcing training data. While some of my project 
      repositories are private due to their academic nature, many are publicly available, including this website's code.
      </p>

      <p>
      I have recently begun an exciting new chapter in my professional journey at Metrolinx, where I am currently 
      employed as a Data Analyst. In this role, I'm applying my skills in data analysis and computer science to contribute 
      to impactful transportation projects. This position allows me to combine my technical expertise with my interest in 
      serving the community, aligning with my goal of engaging in work that not only challenges me but also has a meaningful 
      societal impact.
    </p>

      
      <p>
      Thank you for visiting. Please feel free to explore my site and connect with me on LinkedIn and GitHub.
      </p>
      
    </div>

  </div>
  )
}
