import React from 'react';

const TL = [
  { co: 'TECHCORP INC.', role: 'Senior Engineer', period: 'JAN 2022 — PRESENT', desc: 'Built distributed microservices handling 50k req/s. Led migration from monolith to event-driven arch using Rust and Kafka.', isCurrent: true },
  { co: 'STARTUP XYZ', role: 'Full-Stack Developer', period: 'MAR 2020 — DEC 2021', desc: 'Shipped 0→1 SaaS product with 2k paying users. Built React + Node.js stack from scratch with real-time sync.', isCurrent: false },
  { co: 'AGENCY LABS', role: 'Frontend Engineer', period: 'JUN 2018 — FEB 2020', desc: 'Delivered 12+ award-winning marketing sites. Built reusable WebGL animation toolkit using GSAP and Three.js.', isCurrent: false },
];

function Experience() {
  return (
    <section id="experience" className="sec sec--yellow">
      <h2 className="h-display reveal-x">EXPERIENCE</h2>
      <div className="exp-list">
        {TL.map((e, i) => (
          <div key={e.co} className="exp-item reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
            <div>
              {e.isCurrent ? (
                <div className="exp-badge current">Current</div>
              ) : (
                <div className="exp-badge past">Past</div>
              )}
              <div className="exp-period">{e.period}</div>
            </div>
            <div>
              <h3 className="exp-company">{e.co}</h3>
              <div className="exp-role">{e.role}</div>
              <div className="exp-desc">{e.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
