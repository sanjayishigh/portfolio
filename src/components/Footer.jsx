import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-copy">© {currentYear} <span>SANJAY_</span> — All rights reserved</div>
      <div className="footer-right">
        <div className="footer-dot"></div>
        Available for hire
      </div>
    </footer>
  );
}

export default Footer;
