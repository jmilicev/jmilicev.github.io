import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import dp from  './lp-src/favicon.png';
//import dp from  './lp-src/x.jpeg';
import github from '../share/github.svg';
import linkedin from '../share/linkedin.svg';


export default function LandingPage(props) {

  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      var thresh;
      //darken banner on mobile EARLY
      if(window.innerWidth < window.innerHeight){
        thresh = 100;
      }else{
        thresh = 800;
      }

      const scrollThreshold = thresh; // Number of pixels to scroll before changing the background color
      const isScrolled = window.scrollY > scrollThreshold;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    setTimeout(function(){

      const ratio = viewportHeight/viewportWidth;

      var arrow = document.getElementById("arrowbutton");
      if(arrow != null){
        arrow.classList.add('shake');
        if(ratio>1){
          // likely mobile device
          // pan screen down slightly to present arrow
          window.scrollBy(0, 100);
        }else{
          //for now just have the same behaviour
          window.scrollBy(0, 100);
        }
      }
    }, 250); 

  };

  const handlePhotographyButtonClick = () => {
    props.onPhotographyButtonClick();
  };

  const scrollToTop= () => {
    window.scrollBy(0, -100000);
  };

  const handleBannerClick = (id) => {
    console.log("ID is :"+id);
    var element = document.getElementById(id);
    if(element == null){
      handleExploreButtonClick();
    }

    setTimeout(function(){
      element = document.getElementById(id);
      if(element!=null){
        element.scrollIntoView({ behavior: 'smooth' });
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
      <button id="bannerbutton" className='header' onClick={() => handleBannerClick("projects")}>Projects</button>
      <button id="bannerbutton" className='header' onClick={() => handleBannerClick("contact")}>Contact</button>
      </div>
      </div>


        <div className='centerpiece'>
        <div id ="home" className='landingPageText'>
    
        <img src={dp} id="dp" alt="logo" />
        <br></br>
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


        <br></br>
        
        <button
          id = 'photobutton'
          onClick={handlePhotographyButtonClick}
        >
          Photography
        </button>
        </div>

        </div>
      </header>
    </div>
  );
}
