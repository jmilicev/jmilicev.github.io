import React, { useState, useRef } from 'react';
import LandingPage from './LandingPage/LandingPage';
import ExperienceTab from './ExperienceTab/ExperienceTab';
import ProjectsTab from './ProjectsTab/ProjectsTab';
import Footer from './Footer/Footer';
import EducationTab from './EducationTab/EducationTab';
import AboutMeTab from './AboutMeTab/AboutMeTab';
import ContactTab from './ContactTab/ContactTab';

function App() {
  const [showInfosTab, setShowInfosTab] = useState(false);
  const infosTabRef = useRef(null);

  const handleExploreButtonClick = () => {
    setShowInfosTab(!showInfosTab);

    if (!showInfosTab && infosTabRef.current) {
      infosTabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <LandingPage onExploreButtonClick={handleExploreButtonClick} />
      {showInfosTab && <AboutMeTab />}
      {showInfosTab && <EducationTab />}
      {showInfosTab && <ExperienceTab />}
      {showInfosTab && <ProjectsTab />}
      {showInfosTab && <ContactTab/>}
      {showInfosTab && <hr></hr>}
      <Footer />
    </>
  );
}

export default App;
