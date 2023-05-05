import React, { useRef } from 'react';
import './ProjectsTab.css';
import share from './share.png';
import york from '../share/york.png';

export default function ProjectsTab() {
  const projectsTabRef = useRef(null);

  const scrollToProjectsTab = () => {
    projectsTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="projects" className="Projects">
      <button id="arrowbutton" onClick={scrollToProjectsTab}>
        ↓
      </button>

      <h2 ref={projectsTabRef}>Projects</h2>

      
      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Portfolio Website | React, JS</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/jmilicev.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="share" alt="logo" />
  </a>
</div>
      <ul>
        <li>This very website, including all HTML and CSS was created from scratch using React.js.</li>
        <li>Configured deployment on Github Pages with link to custom domain. (coming soon!)</li>
        <li>There are many hidden easter eggs on the website if you can find them all!</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Distributed Go Chat Website | Go, JS, Kubernetes</h3>
      <img src={york} className="share" alt="logo" />
</div>
      <ul>
        <li>Developed a chat-app with golang backend and javascript frontend using websockets.</li>
        <li>Capable of sending timestamped messages that are stored on server, with additional feature of sending ephemeral messages that are only broadcasted to clients and not stored on the server.</li>
        <li>Built using Docker and deployed on a Kubernetes cluster using a private goHarbour repository.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Novel Programming Language | Java, ANTLR4</h3>
      <img src={york} className="share" alt="logo" />
</div>
      <ul>
        <li>Developed a novel programming language using the ANTLR4 parser and Java.</li>
        <li>Language capable of performing variable declarations, assignment, math operations and boolean operations.</li>
        <li>Language also capable of correctly executing n-nested if statements, recursion, and function calls.</li>
        <li>Includes a simplified JUnit style test suite with branch coverage and other testing statistics.</li>
      </ul>

      <div id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Poker | Java, Swing</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/poker"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="share" alt="logo" />
  </a>
</div>
      <ul>
        <li>Developed a swing-based poker using object oriented principles.</li>
        <li>Designed efficient algorithms on back-end for hand evaluation.</li>
        <li>Implemented AI players who play uniquely based on randomly generated personality traits.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Discord Bot | Python, Discord API</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/financebot"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="share" alt="logo" />
  </a>
</div>
      <ul>
        <li>Discord bot capable of performing a multitude of finance related commands.</li>
        <li>Used asynchronous programming to serve multiple user requests simultaneously.</li>
        <li>Answers questions about stock price, stock options, company type and performs various financial calculations.</li>
      </ul>

      
      <div id ="logoed"style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Gaming Website | NodeJS, Express, Passport</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/website"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="share" alt="logo" />
  </a>
</div>
      <ul>
        <li>Express website with multiple functions and pages.</li>
        <li>Implements encryption-based login system to authenticate users and personalize accordingly.</li>
        <li>Contains simple games coded in JavaScript such as Tic Tac Toe.</li>
      </ul>
    </div>
  );
}
