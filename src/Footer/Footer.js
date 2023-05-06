import React from 'react'
import github from '../share/github.svg';
import linkedin from '../share/linkedin.svg';
import '../share/generic.css';

export default function Footer() {
  return (
    <div className="links">
      <footer id="foot">
        <p> Feel free to follow me on my links below!</p>
        <div className="links-container">
          <a
            className="App-link links"
            href="https://www.linkedin.com/in/jovan-milicev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin Icon" width="30" height="30" />
          </a>
          <a
            className="App-link links"
            href="https://github.com/jmilicev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="Github Icon" width="30" height="30" />
          </a>
        </div>
      </footer>
    </div>
  )
}
