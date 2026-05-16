import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section className="sec sec--white" style={{ minHeight: 'calc(100vh - 80px)', marginTop: '56px' }}>
      <Link to="/" className="btn" data-hover style={{ marginBottom: '32px', display: 'inline-block' }}>
        ← BACK TO HOME
      </Link>
      
      <h1 className="h-display reveal visible" style={{ '--i': 1 }}>PROJECT:<br />{id.replace('-', ' ').toUpperCase()}</h1>
      
      <div className="reveal visible" style={{ '--i': 2, marginTop: '32px' }}>
        <p className="bio" style={{ fontSize: '18px' }}>
          This is a detailed view for the <strong>{id}</strong> project.
          Since this is a template, you can customize this page to load data from an API or a local JSON file based on the project ID.
        </p>
        
        <div className="photo-box" style={{ marginTop: '48px', aspectRatio: '16/9' }} data-hover>
          PROJECT SCREENSHOT
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
