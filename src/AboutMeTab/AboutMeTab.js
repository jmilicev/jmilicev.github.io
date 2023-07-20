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
      Welcome to my personal website. I have created this page as a central hub
      to contain all of my projects, job experience, and anything else related
      to my career and personal life that I may see fit. 
      </p>
      
      <p>
      My name is Jovan, and I am a 4th year Computer Science student studying at York University.
      I have had a passion for programming since I was little, writing my first computer program in middle school
      (A guessing game in Java!).  Aside from computing, I have a passion for the world of finance, specifically investment 
      banking and securities trading. I also love photography and motorcycles.
      </p>

      <p>
      During my time as a student at York University, I worked as a Teller in retail banking, and was
      also an Undergraduate Teaching Assistant for EECS 2021, a class focused on assembly language software
      development and iVerilog programming. As a student, I have worked on many interesting projects that I have
      listed on this website, from a discord finance bot, to coding an entirely new programming language from scratch, 
      all of which are listed on this website, as well as my LinkedIn and Github. Some project repositories may be private 
      as they are part of a school project, but many others are public, including the code for this website!
      </p><p>
      I thoroughly enjoyed my time as a student, and now as I am coming
      closer to graduation, I am seeking a full or part time position in software development. 
      </p>
      
      <p>
      Thanks for visiting, and feel free to look around.
      </p>
      
      </div>

    </div>
  )
}
