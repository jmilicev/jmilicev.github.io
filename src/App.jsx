/* src/App.js */
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills'; // Import Skills
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
        </section>
        
        <section id="education">
          <Education />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;