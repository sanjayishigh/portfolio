import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { id: 'beamforming', t: 'BEAMFORMING OPTIMIZATION', d: 'CNN-based system predicting optimal beam index from CSI data with 95%+ accuracy.', y: '2023', c: 'ai', tech: ['PYTHON', 'CNN', 'DEEPMIMO'], github: '#', live: '#' },
  { id: 'grid-anomaly', t: 'POWER GRID ANOMALY DETECT', d: 'Physical and cyber attack detection using Random Forest and LSTMs with Flask dashboard.', y: '2023', c: 'ai', tech: ['PYTHON', 'LSTM', 'FLASK'], github: '#', live: '#' },
  { id: 'delivery-cart', t: 'AUTOMATED DELIVERY CART', d: 'Robotic food delivery cart leveraging Raspberry Pi, ROS, and Gazebo for autonomous navigation.', y: '2023', c: 'robotics', tech: ['ROS', 'RASPBERRY PI', 'PYTHON'], github: '', live: '' },
  { id: 'os-scheduler', t: 'OS SCHEDULING VISUALIZER', d: 'OS scheduling simulator with ML priority prediction and interactive Gantt charts.', y: '2023', c: 'systems', tech: ['PYTHON', 'FLASK', 'JS'], github: '#', live: '#' },
];

function ProjectCard({ p, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { rx: 0, ry: 0, trx: 0, try_: 0, active: false };

    const onMouseMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      state.try_ = x * 15;
      state.trx = -y * 15;
      state.active = true;
    };

    const onMouseLeave = () => {
      state.trx = 0;
      state.try_ = 0;
      state.active = false;
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId;
    const tick = () => {
      if (state.active) {
        state.rx += (state.trx - state.rx) * 0.12;
        state.ry += (state.try_ - state.ry) * 0.12;
        card.style.transform = `perspective(800px) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
      } else {
        state.rx += (0 - state.rx) * 0.12;
        state.ry += (0 - state.ry) * 0.12;
        card.style.transform = `perspective(800px) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    if (!reduceMotion) {
      tick();
    }

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <article ref={cardRef} className="project-card reveal" style={{ '--i': index % 6 }} data-hover>
      <span className="tag-pill">{p.c.toUpperCase()}</span>
      <h3 className="p-title">{p.t}</h3>
      <p className="p-desc">{p.d}</p>
      <div className="p-year">{p.y}</div>
      <div className="tech-row">
        {p.tech.map(t => <span key={t} className="tech">{t}</span>)}
      </div>
      <div className="p-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-link" data-hover style={{ color: 'var(--yellow)', textDecoration: 'none', borderBottom: '1px solid var(--yellow)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>GITHUB</a>}
        {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="p-link" data-hover style={{ color: 'var(--yellow)', textDecoration: 'none', borderBottom: '1px solid var(--yellow)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>LIVE SITE</a>}
      </div>
      <Link to={`/projects/${p.id}`} className="p-arrow" aria-label="Open project" data-hover>↗</Link>
    </article>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'ai', 'robotics', 'systems'];
  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.c === filter);

  return (
    <section id="projects" className="sec sec--yellow">
      <h2 className="h-display reveal-x">PROJECTS</h2>
      <div className="filter-bar reveal" style={{ '--i': 1 }}>
        {filters.map(f => (
          <button 
            key={f}
            className={`pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            data-hover
          >
            {f === 'ai' ? 'AI/ML' : f.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="proj-grid">
        {filteredProjects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
