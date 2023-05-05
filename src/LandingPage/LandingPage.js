import React from 'react';
import redbike from './red-bike.svg';
import greenbike from './green-bike.svg';
import bluebike from './blue-bike.svg';
//import plane from './plane.svg';
import cflag from './checkflag.svg';
import './LandingPage.css';

export default function LandingPage(props) {
  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();
  };

  return (
    <div className="LandingPage">
      <header className="LP-header">

      <div id="headerbanner">
      <button className="header">Projects</button>
      <button className="header">Experience</button>
      <button className="header">Education</button>
      <button className="header">About Me</button>
      <button className="header">Contact</button>
      </div>

        <h1> Welcome aboard.</h1>
        <p> You have landed on the website of Jovan Milicev.</p>

        <a
          className="checkflag"
          href="https://github.com/jmilicev/jmilicev.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={cflag} className="checkflag" alt="logo" />
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
