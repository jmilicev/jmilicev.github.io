import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './LandingPage/LandingPage';
import ExperienceTab from './ExperienceTab/ExperienceTab';
import ProjectsTab from './ProjectsTab/ProjectsTab';
import Footer from './Footer/Footer';
import EducationTab from './EducationTab/EducationTab';
import AboutMeTab from './AboutMeTab/AboutMeTab';
import ContactTab from './ContactTab/ContactTab';
import PhotoLandingPage from './PhotoLandingPage/PhotoLandingPage';

function App() {

  const [showInfosTab, setShowInfosTab] = useState(false);
  const infosTabRef = useRef(null);

  const [showPhotoPage, setShowPhotoPage] = useState(false);
  const [showFlashPG, setShowFlashPG] = useState(false);

  const handlePhotographyButtonClick = () => {
    setShowPhotoPage(!showPhotoPage);
  };

  const handleExploreButtonClick = () => {
    setShowInfosTab(!showInfosTab);

    if (!showInfosTab && infosTabRef.current) {
      infosTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    //this mounts the photo component for a split second
    //to preload the images in preparation for clicking
    //the photography page

    setShowFlashPG(true);
    setTimeout(function(){
      setShowFlashPG(false);
    }, 1); 

  }, []);

  return (
    <>
      {/* photography */}
      {showPhotoPage &&
       <PhotoLandingPage onPhotographyButtonClick={handlePhotographyButtonClick}/>}


      {/* resume portion of the webpage */}

      {!showPhotoPage &&
      <LandingPage 
      onPhotographyButtonClick={handlePhotographyButtonClick}
      onExploreButtonClick={handleExploreButtonClick} />
      }

      
      {showInfosTab && !showPhotoPage && <AboutMeTab />}
      {showInfosTab && !showPhotoPage && <EducationTab />}
      {showInfosTab && !showPhotoPage && <ExperienceTab />}
      {showInfosTab && !showPhotoPage && <ContactTab/>}
      {showInfosTab && !showPhotoPage && <Footer />}
      
      {/*
      {!showPhotoPage && <AboutMeTab />}
      {!showPhotoPage && <EducationTab />}
      {!showPhotoPage && <ExperienceTab />}
      {!showPhotoPage && <ProjectsTab />}
      {!showPhotoPage && <ContactTab/>}
      {!showPhotoPage && <Footer />}
      */}
      
      {showFlashPG && <PhotoLandingPage />}
    </>
  );
}

export default App;
