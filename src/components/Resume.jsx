import React from 'react';

const EDUCATION = [
  { title: 'B.E. Electronics and Telecommunication', sub: 'RV College of Engineering • Aug 2023 - Present', desc: 'Bengaluru, India. CGPA: 8.59' },
  { title: 'Class XII (PUC)', sub: 'Government PU College • July 2022', desc: 'Sagar, India. Score: 89%' },
  { title: 'Class X', sub: "St. Joseph's High School • Aug 2020", desc: 'Sagar, India. Grade: 96.8%' },
];

const CERTS = [
  { title: 'Organizer | Rotaract Club of RVCE', sub: 'Leadership Experience', desc: 'Coordinated events Uptown Junk and Fast Trek, overseeing logistics, marketing, and team coordination to ensure successful execution.', link: '' },
  { title: 'Unsupervised Learning, Recommenders, Reinforcement Learning', sub: 'DeepLearning.AI • Mar 2026', desc: 'Specialization certification in advanced AI techniques.', link: 'https://drive.google.com/file/d/1JJL-q3qxDZ0Kj0FfeuCPzIp1r9--gEX8/view' },
  { title: 'Advanced Learning Algorithms', sub: 'DeepLearning.AI • Jan 2026', desc: 'Specialization certification in neural networks and tree ensembles.', link: 'https://drive.google.com/file/d/1JJL-q3qxDZ0Kj0FfeuCPzIp1r9--gEX8/view' },
  { title: 'Supervised Machine Learning: Regression & Classification', sub: 'DeepLearning.AI • Dec 2025', desc: 'Foundational certification in machine learning algorithms.', link: 'https://drive.google.com/file/d/1hR2Ugniw5JXmCBHIHxauIGqjQskIwBWh/view' },
];

function Resume() {
  return (
    <section id="resume" className="sec sec--yellow">
      <h2 className="h-display reveal-x">RESUME</h2>
      
      <div className="resume-wrap">
        <div>
          <div className="resume-col-title">Education</div>
          <div id="edu-list">
            {EDUCATION.map((e, i) => (
              <div key={i} className="resume-item reveal">
                <div className="resume-item-title">{e.title}</div>
                <div className="resume-item-sub">{e.sub}</div>
                <div className="resume-item-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="resume-col-title">Leadership &amp; Certifications</div>
          <div id="cert-list">
            {CERTS.map((c, i) => {
              const inner = (
                <>
                  <div className="resume-item-title">{c.title} {c.link && '↗'}</div>
                  <div className="resume-item-sub">{c.sub}</div>
                  <div className="resume-item-desc">{c.desc}</div>
                </>
              );
              
              return c.link ? (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="resume-item reveal" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }} data-hover>
                  {inner}
                </a>
              ) : (
                <div key={i} className="resume-item reveal">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="resume-download">
        <a href="https://drive.google.com/file/d/1bFBEmp-i5_N7ZSWrEHq2DstY5sBGTz5a/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-download">
          ↓ Download Full Resume
        </a>
      </div>
    </section>
  );
}

export default Resume;
