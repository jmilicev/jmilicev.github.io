import React, { useState, useRef } from 'react';
import LandingPage from './LandingPage/LandingPage';
import ExperienceTab from './ExperienceTab/ExperienceTab';
import ProjectsTab from './ProjectsTab/ProjectsTab';
import Footer from './Footer/Footer';
import EducationTab from './EducationTab/EducationTab';

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
      {showInfosTab && <EducationTab />}
      {showInfosTab && <ExperienceTab />}
      {showInfosTab && <ProjectsTab />}
      <Footer />
    </>
  );
}

export default App;
