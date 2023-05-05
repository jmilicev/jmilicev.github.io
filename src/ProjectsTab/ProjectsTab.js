import React, { useRef } from 'react';
import './ProjectsTab.css';

export default function ProjectsTab() {
  const projectsTabRef = useRef(null);

  const scrollToProjectsTab = () => {
    projectsTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="Projects">
      <button id="arrowbutton" onClick={scrollToProjectsTab}>
        ↓
      </button>

      <h2 ref={projectsTabRef}>Projects</h2>

      <h3>Portfolio Website | React, JS</h3>
      <ul>
        <li>This very website, including all HTML and CSS was created from scratch using React.js.</li>
        <li>Configured deployment on Github Pages with link to custom domain. (coming soon!)</li>
        <li>There are many hidden easter eggs on the website if you can find them all!</li>
      </ul>

      <h3>Distributed Go Chat Website | Go, JS, Kubernetes</h3>
      <ul>
        <li>Developed a chat-app with golang backend and javascript frontend using websockets.</li>
        <li>Capable of sending timestamped messages that are stored on server, with additional feature of sending ephemeral messages that are only broadcasted to clients and not stored on the server.</li>
        <li>Built using Docker and deployed on a Kubernetes cluster using a private goHarbour repository.</li>
      </ul>

      <h3>Novel Programming Language | Java, ANTLR4</h3>
      <ul>
        <li>Developed a novel programming language using the ANTLR4 parser and Java.</li>
        <li>Language capable of performing variable declarations, assignment, math operations and boolean operations.</li>
        <li>Language also capable of correctly executing n-nested if statements, recursion, and function calls.</li>
        <li>Includes a simplified JUnit style test suite with branch coverage and other testing statistics.</li>
      </ul>

      <h3>Poker | Java, Swing</h3>
      <ul>
        <li>Developed a swing-based poker using object oriented principles.</li>
        <li>Designed efficient algorithms on back-end for hand evaluation.</li>
        <li>Implemented AI players who play uniquely based on randomly generated personality traits.</li>
      </ul>

      <h3>FinanceBot | Python, Discord API</h3>
      <ul>
        <li>Discord bot capable of performing a multitude of finance related commands.</li>
        <li>Used asynchronous programming to serve multiple user requests simultaneously.</li>
        <li>Answers questions about stock price, stock options, company type and performs various financial calculations.</li>
      </ul>

      <h3>Gaming Website | NodeJS, Express, Passport</h3>
      <ul>
        <li>Express website with multiple functions and pages.</li>
        <li>Implements encryption-based login system to authenticate users and personalize accordingly.</li>
        <li>Contains simple games coded in JavaScript such as Tic Tac Toe.</li>
      </ul>
    </div>
  );
}
