import React, { useEffect, useRef } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const ghostRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const cursor = cursorRef.current;
    const ghost = ghostRef.current;
    if (!cursor || !ghost) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: mouse.x, y: mouse.y };
    const ring = [];
    const RING_LEN = 12;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseDown = () => cursor.classList.add('cursor--click');
    const onMouseUp = () => cursor.classList.remove('cursor--click');

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        cursor.classList.add('hovering');
        ghost.classList.add('hidden');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        cursor.classList.remove('hovering');
        ghost.classList.remove('hidden');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let animationFrameId;

    const cursorLoop = () => {
      cur.x += (mouse.x - cur.x) * 0.18;
      cur.y += (mouse.y - cur.y) * 0.18;
      
      cursor.style.transform = `translate(${cur.x}px,${cur.y}px) translate(-50%,-50%)`;
      
      ring.push({ x: cur.x, y: cur.y });
      if (ring.length > RING_LEN) ring.shift();
      
      const g = ring[0] || cur;
      ghost.style.transform = `translate(${g.x}px,${g.y}px) translate(-50%,-50%)`;
      
      animationFrameId = requestAnimationFrame(cursorLoop);
    };

    animationFrameId = requestAnimationFrame(cursorLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true"></div>
      <div ref={ghostRef} className="cursor-ghost" aria-hidden="true"></div>
    </>
  );
}

export default CustomCursor;
