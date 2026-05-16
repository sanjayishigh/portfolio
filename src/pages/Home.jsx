import React from 'react';
import Hero from '../components/Hero';
import ProjectsSection from '../components/ProjectsSection';
import Skills from '../components/Skills';
import About from '../components/About';
import Experience from '../components/Experience';
import Resume from '../components/Resume';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      {/* <Experience /> */}
      <Resume />
      <Skills />
      <Contact />
    </>
  );
}

export default Home;
