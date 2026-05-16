import React from 'react';

const ROW1 = ['PYTHON','JAVA','JAVASCRIPT','POSTGRESQL','SQLITE','HTML','CSS','TAILWIND','REACT','FLASK','SCIKIT-LEARN','PANDAS'];
const ROW2 = ['NUMPY','DEEP LEARNING','OOP','DATA STRUCTURES','ALGORITHMS','DBMS','OPERATING SYSTEMS','COMPUTER NETWORKS','SUPERVISED LEARNING','UNSUPERVISED LEARNING'];

function MarqueeTrack({ items, isRight = false }) {
  return (
    <div className={`marquee ${isRight ? 'marquee--right' : ''}`} style={isRight ? { marginTop: '14px' } : {}}>
      <div className="marquee-track">
        {items.map((s, idx) => <span key={`a-${idx}`} className="skill-pill" data-hover>{s}</span>)}
        {items.map((s, idx) => <span key={`b-${idx}`} className="skill-pill" data-hover>{s}</span>)}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="skills-band">
        <div className="skills-head">
          <h2 className="h-display reveal-x" style = {{
            marginTop : '5rem',
          }}>SKILLS</h2>
        </div>
        <MarqueeTrack items={ROW1} />
        <MarqueeTrack items={ROW2} isRight={true} />
        <div className="skills-footer"style = {{
        marginBottom : '2rem',
      }}></div>
      </div>
        
    </section>
  );
}

export default Skills;
