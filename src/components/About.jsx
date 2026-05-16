import React from 'react';

function About() {
  return (
    <section id="about" className="sec sec--white">
      <h2 className="h-display reveal-x">ABOUT</h2>
      <div className="about-grid">
        <div className="about-img-wrap reveal">
          <div className="about-img">
            <div className="about-img-corner tl"></div>
            <div className="about-img-corner tr"></div>
            <div className="about-img-corner bl"></div>
            <div className="about-img-corner br"></div>
            <div className="about-img-icon">👾</div>
            <div className="about-img-label">Your Photo Here</div>
          </div>
        </div>
        <div className="about-content reveal" style={{ transitionDelay: '0.15s' }}>
          <div className="about-bio">
            Hey — I'm a 3rd year engineering student at RV College of Engineering, majoring in Electronics and Telecommunication. I'm passionate about building systems that bridge software and hardware, with a strong focus on AI, Machine Learning, and Robotics. I love exploring new technologies, building practical projects, and developing scalable solutions.
          </div>
          <div className="about-stats">
            <div className="stat-box reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="stat-num">8.59</div>
              <div className="stat-label">CGPA</div>
            </div>
            <div className="stat-box reveal" style={{ transitionDelay: '0.28s' }}>
              <div className="stat-num">10+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-box reveal" style={{ transitionDelay: '0.36s' }}>
              <div className="stat-num">4+</div>
              <div className="stat-label">Certifications</div>
            </div>
          </div>
          <div className="about-tags">
            <span className="about-tag">AI/ML</span>
            <span className="about-tag">Robotics</span>
            <span className="about-tag">Software Engineering</span>
            <span className="about-tag">Python 🐍</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
