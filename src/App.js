import React, { useState } from 'react';
import LandingPage from './LandingPage/LandingPage';
import ExperienceTab from './ExperienceTab/ExperienceTab';
import ProjectsTab from './ProjectsTab/ProjectsTab';
import Footer from './Footer/Footer';

function App() {
  const [showProjectsTab, setShowProjectsTab] = useState(false);

  const handleExploreButtonClick = () => {
    setShowProjectsTab(!showProjectsTab);
  };

  return (
    <>
      <LandingPage onExploreButtonClick={handleExploreButtonClick} />
      {showProjectsTab && <ProjectsTab />}
      <Footer />
    </>
  );
}

export default App;
