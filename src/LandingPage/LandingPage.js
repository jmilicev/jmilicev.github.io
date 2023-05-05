import React from 'react';
import redbike from './red-bike.svg';
import greenbike from './green-bike.svg';
import bluebike from './blue-bike.svg';
import resume from './resume.png';
//import plane from './plane.svg';
import cflag from './checkflag.svg';
import './LandingPage.css';
import dp from  './favicon.png';

export default function LandingPage(props) {
  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();
  };

  return (
    <div className="LandingPage">
      <header className="LP-header">
      <div id="headerbanner">
      <a className="header" href="#projects">Projects</a>
      <a className="header" href="#experience">Experience</a>
      <a className="header" href="#education">Education</a>
      <a className="header" href="#aboutme">About Me</a>
      <a className="header" href="#foot">Contact</a>
      </div>

        <div className='landingPageText'>
        <h3 id='lp-head'>Jovan Milicev</h3>
        <p id="lp-text">Welcome to my webpage!</p>
        <img src={dp} id="dp" alt="logo" />
        </div>


        <a
          className="resume"
          href={require("../share/jovan-milicev-resume.pdf")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={resume} className="resume" alt="logo" />
        </a>
        <a
          className="red-bike"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={redbike} className="red-bike" alt="red-bike" />
        </a>

        <a
          className="green-bike"
          href="https://www.instagram.com/pg.jovan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={greenbike} className="green-bike" alt="logo" />
        </a>

        <a
          className="blue-bike"
          href="https://www.instagram.com/pg.jovan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={bluebike} className="blue-bike" alt="logo" />
        </a>

        <br></br>
        <button className="btn" id="exploreButton" onClick={handleExploreButtonClick}>
          {props.showProjectsTab ? 'Close' : 'Explore'}
        </button>
      </header>
    </div>
  );
}
