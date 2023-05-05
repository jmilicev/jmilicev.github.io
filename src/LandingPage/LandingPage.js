import React from 'react';
import redbike from './red-bike.svg';
import greenbike from './green-bike.svg';
import bluebike from './blue-bike.svg';
import cflag from './checkflag.svg';
import './LandingPage.css';

export default function LandingPage(props) {
  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();
  };

  return (
    <div className="LandingPage">
      <header className="LP-header">
        <h1> Welcome aboard.</h1>
        <p> You have landed on the website of Jovan Milicev.</p>
        <img src={cflag} className="checkflag" alt="logo" />
        <a
          className="red-bike"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={redbike} className="red-bike" alt="red-bike" />
        </a>
        <img src={greenbike} className="green-bike" alt="logo" />
        <img src={bluebike} className="blue-bike" alt="logo" />
        <br></br>
        <button className="btn" id="exploreButton" onClick={handleExploreButtonClick}>
          {props.showProjectsTab ? 'Close' : 'Explore'}
        </button>
      </header>
    </div>
  );
}
