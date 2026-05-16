import React, { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  useEffect(() => {
    // Restore scroll position on mount
    const savedPos = sessionStorage.getItem('scrollPos');
    if (savedPos) {
      // Temporarily disable smooth scrolling to snap instantly
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, parseInt(savedPos, 10));
      document.documentElement.style.scrollBehavior = '';
    }

    // Save scroll position before reload/unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPos', window.scrollY);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Reveal observer logic
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          revObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal, .reveal-x, .reveal-left');
    elements.forEach((el) => revObs.observe(el));

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      elements.forEach((el) => revObs.unobserve(el));
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip">Skip to content</a>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      
      {/* FPS Counter (optional, could be a separate component, but putting it here for simplicity) */}
      <div className="fps" id="fps">FPS 60</div>
    </>
  );
}

export default Layout;
