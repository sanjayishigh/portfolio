import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (id) => {
    return location.pathname === '/' ? `#${id}` : `/#${id}`;
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href={getHref('hero')} className="nav-logo">SANJAY<span>_</span></a>
      <div className="nav-links">
        <a href={getHref('about')} className="nav-link">About</a>
        <a href={getHref('projects')} className="nav-link">Work</a>
        {/* <a href={getHref('experience')} className="nav-link">Experience</a> */}
        <a href={getHref('resume')} className="nav-link">Resume</a>
        <a href={getHref('skills')} className="nav-link">Skills</a>
        <a href={getHref('contact')} className="nav-link">Contact</a>
      </div>
      <a href={getHref('contact')} className="nav-hire">Hire Me →</a>
    </nav>
  );
}

export default Navbar;
