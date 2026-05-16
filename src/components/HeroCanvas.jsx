import React, { useEffect, useRef } from 'react';

const TAGS = [
  { label: 'REACT', cls: 'tag-y' },
  { label: 'NODE.JS', cls: 'tag-p' },
  { label: 'PYTHON', cls: 'tag-c' },
  { label: 'DOCKER', cls: 'tag-w' },
  { label: 'JAVA', cls: 'tag-y' },
  { label: 'JAVASCRIPT', cls: 'tag-p' },
  { label: 'CN', cls: 'tag-c' },
  { label: 'SQL', cls: 'tag-w' },
  { label: 'GIT', cls: 'tag-y' },
  { label: 'OS', cls: 'tag-p' },
  { label: 'LINUX', cls: 'tag-c' },
  { label: 'ML', cls: 'tag-w' },
];

function HeroCanvas() {
  const wrapRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const W = () => wrap.offsetWidth;
    const H = () => wrap.offsetHeight;

    const els = elementsRef.current;

    // One frame to measure sizes
    let animationFrameId;

    requestAnimationFrame(() => {
      const bodies = els.map(el => ({
        el,
        w: el.offsetWidth,
        h: el.offsetHeight,
        x: (Math.random() * 0.68 + 0.12) * W(),
        y: (Math.random() * 0.68 + 0.12) * H(),
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        angle: (Math.random() - 0.5) * 10,
        va: (Math.random() - 0.5) * 0.25,
      }));

      // Mouse
      const mouse = { x: -999, y: -999 };
      const onMouseMove = e => {
        const r = wrap.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };

      window.addEventListener('mousemove', onMouseMove);
      wrap.addEventListener('mouseleave', onMouseLeave);

      // Click explode
      const onClick = () => {
        bodies.forEach(b => {
          b.vx += (Math.random() - 0.5) * 22;
          b.vy += (Math.random() - 0.5) * 22;
          b.va += (Math.random() - 0.5) * 5;
        });
      };
      wrap.addEventListener('click', onClick);

      // Physics Constants
      const REPEL_R = 150, REPEL_F = 0.009;
      const MAX_V = 5.5, DAMP = 0.78;
      const ANG_DAMP = 0.93, MAX_ANG = 20;

      function step() {
        const cw = W(), ch = H();
        bodies.forEach(b => {
          b.vx += (Math.random() - 0.5) * 0.055;
          b.vy += (Math.random() - 0.5) * 0.055;

          const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
          const dx = cx - mouse.x, dy = cy - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < REPEL_R && d > 1) {
            const f = (REPEL_R - d) * REPEL_F;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
            b.va += (dx / d) * 0.07;
          }

          const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (spd > MAX_V) { b.vx *= MAX_V / spd; b.vy *= MAX_V / spd; }

          b.x += b.vx; b.y += b.vy;
          b.angle += b.va;
          b.va *= ANG_DAMP;
          if (Math.abs(b.angle) > MAX_ANG) { b.angle = Math.sign(b.angle) * MAX_ANG; b.va *= -0.5; }

          if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * DAMP; b.va *= -0.4; }
          if (b.x + b.w > cw) { b.x = cw - b.w; b.vx = -Math.abs(b.vx) * DAMP; b.va *= -0.4; }
          if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * DAMP; }
          if (b.y + b.h > ch) { b.y = ch - b.h; b.vy = -Math.abs(b.vy) * DAMP; }
        });

        // AABB push-apart & Magnetic Repulsion
        const MAG_R = 140; // Magnetic field radius
        const MAG_F = 0.015; // Magnetic force strength

        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i], b = bodies[j];
            const dx = (a.x + a.w / 2) - (b.x + b.w / 2);
            const dy = (a.y + a.h / 2) - (b.y + b.h / 2);
            const d = Math.sqrt(dx * dx + dy * dy);

            // 1. Magnetic Repulsion Field
            if (d < MAG_R && d > 1) {
              const force = (MAG_R - d) * MAG_F;
              const fx = (dx / d) * force;
              const fy = (dy / d) * force;
              a.vx += fx;
              a.vy += fy;
              b.vx -= fx;
              b.vy -= fy;
            }

            // 2. Physical AABB Collision (Hard bounds)
            const ovX = (a.w / 2 + b.w / 2) - Math.abs(dx);
            const ovY = (a.h / 2 + b.h / 2) - Math.abs(dy);
            if (ovX > 0 && ovY > 0) {
              const sx = Math.sign(dx) || 1, sy = Math.sign(dy) || 1;
              if (ovX < ovY) {
                a.x += sx * ovX * 0.35; b.x -= sx * ovX * 0.35;
                a.vx += sx * 0.05; b.vx -= sx * 0.05;
              } else {
                a.y += sy * ovY * 0.35; b.y -= sy * ovY * 0.35;
                a.vy += sy * 0.05; b.vy -= sy * 0.05;
              }
            }
          }
        }
      }

      function draw() {
        bodies.forEach(b => {
          b.el.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.angle.toFixed(2)}deg)`;
        });
      }

      function loop() {
        step();
        draw();
        animationFrameId = requestAnimationFrame(loop);
      }

      loop();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        wrap.removeEventListener('mouseleave', onMouseLeave);
        wrap.removeEventListener('click', onClick);
        cancelAnimationFrame(animationFrameId);
      };
    });
  }, []);

  return (
    <div className="hero-right" id="heroRight" ref={wrapRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-scanlines"></div>
      <div className="hero-bracket tl"></div>
      <div className="hero-bracket tr"></div>
      <div className="hero-bracket bl"></div>
      <div className="hero-bracket br"></div>
      <div className="hero-pulse"></div>
      <div className="hero-pulse"></div>
      <div className="hero-pulse"></div>
      <div className="hero-hint">[ HOVER TO REPEL · CLICK TO EXPLODE ]</div>
      <div className="hero-right-stats">
        {/* <div className="hero-right-stat">
          <div className="hrs-num">12+</div>
          <div className="hrs-label">Tech Stack</div>
        </div>
        <div className="hero-right-stat">
          <div className="hrs-num">3yr</div>
          <div className="hrs-label">Experience</div>
        </div>
        <div className="hero-right-stat">
          <div className="hrs-num">40+</div>
          <div className="hrs-label">Projects</div>
        </div> */}
      </div>
      <span className="hero-right-label"></span>
      <style dangerouslySetInnerHTML={{
        __html: `
        .ptag {
          position: absolute;
          top: 0; left: 0;
          padding: 17px 25px;
          font-family: "Courier New",monospace;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          line-height: 1; 
          border: 3px solid #000;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          will-change: transform;
          -webkit-font-smoothing: antialiased;
        }
        .tag-y { background: #FFE600; color: #000; box-shadow: 6px 6px 0 #000; }
        .tag-p { background: #FF0055; color: #fff; box-shadow: 6px 6px 0 #000; }
        .tag-c { background: #00E5FF; color: #000; box-shadow: 6px 6px 0 #000; }
        .tag-w { background: #ffffff; color: #000; box-shadow: 6px 6px 0 #000; }
      `}} />
      {TAGS.map((t, i) => (
        <div
          key={i}
          className={`ptag ${t.cls}`}
          ref={el => elementsRef.current[i] = el}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

export default HeroCanvas;
