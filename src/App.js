import React, { useState, useRef } from 'react';
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
  //const photoPageRef = useRef(null);

  const handlePhotographyButtonClick = () => {
    setShowPhotoPage(!showPhotoPage);
  };

  const handleExploreButtonClick = () => {
    setShowInfosTab(!showInfosTab);

    if (!showInfosTab && infosTabRef.current) {
      infosTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {showInfosTab && !showPhotoPage && <ProjectsTab />}
      {showInfosTab && !showPhotoPage && <ContactTab/>}
      <Footer />
    </>
  );
}

export default App;
