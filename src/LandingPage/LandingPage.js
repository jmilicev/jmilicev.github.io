import React from 'react';
import redbike from './lp-src/red-bike.svg';
import greenbike from './lp-src/green-bike.svg';
import bluebike from './lp-src/blue-bike.svg';
import resume from './lp-src/resume.png';
import './LandingPage.css';
import dp from  './lp-src/favicon.png';


/*

    when pg page is finished.
    <button
          className="resume"
        >
          <img src={resume} className="resume" alt="logo" />
        </button>
*/

export default function LandingPage(props) {
  const handleExploreButtonClick = () => {
    props.onExploreButtonClick();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;


    setTimeout(function(){

      const ratio = viewportHeight/viewportWidth;

      if(ratio>1){
        // likely mobile device
        // pan screen down slightly to present arrow
        window.scrollBy(0, 65);
      }else{
        //for now just have the same behaviour
        window.scrollBy(0, 65);
      }

      var arrow = document.getElementById("arrowbutton");
      if(arrow != null){
        arrow.classList.add('shake');
      }
    }, 250); 

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

      <div id="headerbanner">
      <button className='header' onClick={() => handleBannerClick("projects")}>Projects</button>
      <button className='header' onClick={() => handleBannerClick("experience")}>Experience</button>
      <button className='header' onClick={() => handleBannerClick("education")}>Education</button>
      <button className='header' onClick={() => handleBannerClick("aboutme")}>About me</button>
      <button className='header' onClick={() => handleBannerClick("contact")}>Contact</button>
      <a  href={require("../share/jovan-milicev-resume.pdf")}
          target="_blank"
          rel="noopener noreferrer" 
          id = "resumeheader"
          className='header'>Resume</a>
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
          <img src={redbike} id='bike' className="red-bike" alt="red-bike" />
        </a>

        <a
          className="green-bike"
          href="https://www.instagram.com/pg.jovan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={greenbike} id='bike' className="green-bike" alt="logo" />
        </a>

        <a
          className="blue-bike"
          href="https://www.instagram.com/pg.jovan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={bluebike} id='bike' className="blue-bike" alt="logo" />
        </a>


        <br></br>
        <button className="btn" id="exploreButton" onClick={handleExploreButtonClick}>
          {props.showProjectsTab ? 'Close' : 'Explore'}
        </button>
      </header>
    </div>
  );
}
