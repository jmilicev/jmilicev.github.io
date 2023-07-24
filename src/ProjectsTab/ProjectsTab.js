import React, { useRef } from 'react';
import '../share/generic.css';
import share from './share.png';
import york from '../share/york.png';

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
      

      <div id="projects">
      <h2 ref={projectsTabRef}>Projects</h2>

      
      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Portfolio Website | React, JS</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/jmilicev.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="shareicon" alt="logo" />
  </a>
</div>
      <ul>
        <li>This very website, including all HTML and CSS was created from scratch using React.js.</li>
        <li>Utilized GitHub Pages to host and deploy the website, ensuring seamless access and efficient delivery to user. </li>
        <li>Continuously updated and maintained the website, adding new projects and improving functionality to enhance
        user experience and showcase new skills and experience.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Novel Programming Language | Java, ANTLR4</h3>
      <a href="https://www.yorku.ca"><img src={york} className="share" alt="logo" /></a>
</div>
      <ul>
        <li>Developed a novel programming language using the ANTLR4 parser and Java.</li>
        <li>Language capable of performing variable declarations, assignment, math operations and boolean operations.</li>
        <li>Language also capable of correctly executing n-nested if statements, recursion, and function calls.</li>
        <li>Includes a simplified JUnit style test suite with branch coverage and other testing statistics.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>OpenAI Toolkit | JS,  HTTP</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/openai-toolkit"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="shareicon" alt="logo" />
  </a>
</div>
      <ul>
        <li>Developed a published node package that handles API calls to the OpenAI API service.</li>
        <li>Simplifies using the OpenAI API, making it even easier than the OpenAI package.</li>
        <li>Option to configure max tokens, temperature, and estimates cost for the API call.</li>
        <li>This output can easily be integrated in a project without the need for parsing like other packages.</li>
        <li>Created <a id="demos" href="https://jovanmilicev.com/gpt-website/">GPT-website</a> as a demo of its capabilities using this package as the backend.</li>
        <li>Available for use with `npm install openai-toolkit`.</li>
      </ul>

      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Distributed Go Chat Website | Go, JS, Kubernetes</h3>
      <a href="https://www.yorku.ca"><img src={york} className="share" alt="logo" /></a>
</div>
      <ul>
        <li>Developed a chat-app with golang backend and javascript frontend using websockets.</li>
        <li>Capable of sending timestamped messages that are stored on server, with additional feature of sending ephemeral messages that are only broadcasted to clients and not stored on the server.</li>
        <li>Built using Docker and deployed on a Kubernetes cluster using a private goHarbour repository.</li>
      </ul>


      <div id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Poker | Java, Swing</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/poker"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="shareicon" alt="logo" />
  </a>
</div>
      <ul>
        <li>Developed a swing-based poker using object oriented principles.</li>
        <li>Designed efficient algorithms on back-end for hand evaluation.</li>
        <li>Implemented AI players who play uniquely based on randomly generated personality traits.</li>
      </ul>
   
      <div id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Internet Scraper | Axios, Cheerio</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/jscraper"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="shareicon" alt="logo" />
  </a>
</div>
      <ul>
      <li>Developed an internet web-scraper capable of extracting text from the internet pertaining to an array of keywords.</li>
      <li>Primarily developed to source data to train LLMs and other data intensive applications.</li>
      <li>Highly configurable and adaptable, allowing the user to specify the search engine, depth, quantity of webpages searched, etc.</li>
      </ul>
   
   
      <div  id ="logoed" style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginRight: "20px",marginTop: "23px" }}>Discord-GPT | NodeJS, Discord API</h3>
      <a
        className="image"
        href="https://github.com/jmilicev/discord-gpt"
        target="_blank"
        rel="noopener noreferrer"
      >
    <img src={share} className="shareicon" alt="logo" />
  </a>
</div>
      <ul>
        <li>Discord bot capable of querying OpenAI language models.</li>
        <li>Configurable using clients own API key, which is saved on a secure encrypted database.</li>
        <li>Hosted on linode for high degree of reliability, available 24/7.</li>
        <li>Invite it to your server here: <a id="demos" href="https://discord.com/api/oauth2/authorize?client_id=1120429356255281232&permissions=534723950656&scope=bot">Discord-GPT</a>.</li>
      </ul>
   
   
   
    </div>
    </div>
    
  );
}
