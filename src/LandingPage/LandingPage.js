import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import dp from './lp-src/favicon.png';
import github from '../share/github.svg';
import linkedin from '../share/linkedin.svg';

export default function LandingPage(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerWidth < window.innerHeight ? 100 : 800;
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();

    setTimeout(() => {
      const ratio = window.innerHeight / window.innerWidth;
      const arrow = document.getElementById("arrowbutton");
      if (arrow) {
        arrow.classList.add('shake');
        window.scrollBy({
          top: ratio > 1 ? 160 : 100, // Adjust scroll distance if needed
          behavior: 'smooth',
        });
      }
    }, 250);
  };

  const handlePhotographyButtonClick = () => {
    props.onPhotographyButtonClick();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling
    });
  };

  const handleBannerClick = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      handleExploreButtonClick();
    }

    setTimeout(() => {
      const foundElement = document.getElementById(id);
      if (foundElement) {
        foundElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  return (
    <div className="LandingPage">
      <header className="LP-header">
        <div id="headerbanner" className={`element ${scrolled ? 'scrolled' : ''}`}>
          <button id="JMbutton" className='header' onClick={scrollToTop}>JM</button>
          <div className='navbuttons'>
            <button id="bannerbutton" className='header' onClick={() => handleBannerClick("aboutme")}>About</button>
            <button id="bannerbutton" className='header' onClick={() => handleBannerClick("education")}>Education</button>
            <button id="bannerbutton" className='header' onClick={() => handleBannerClick("experience")}>Experience</button>
            <button id="bannerbutton" className='header' onClick={() => handleBannerClick("contact")}>Contact</button>
          </div>
        </div>

        <div className='centerpiece'>
          <div id="home" className='landingPageText'>
            <img src={dp} id="dp" alt="logo" />
            <br />
            <h3 id='lp-head'>Jovan Milicev</h3>

            <a
              className="links"
              href="https://www.linkedin.com/in/jovan-milicev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin Icon" width="30" height="30" />
            </a>
            <a
              className="links"
              href="https://github.com/jmilicev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="Github Icon" width="30" height="30" />
            </a>
          </div>

          <div className='buttons'>
            <button id="exploreButton" onClick={handleExploreButtonClick}>
              {props.showProjectsTab ? 'Close' : 'Explore'}
            </button>
            <br />
            <button id='photobutton' onClick={handlePhotographyButtonClick}>
              Photography
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
