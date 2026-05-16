import React from 'react';

function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-big">LET'S<br/>BUILD<br/><span>SOMETHING.</span></div>
        <div className="contact-sub">Available for freelance &amp; full-time roles</div>
        <a href="mailto:sanjayishigh@gmail.com" className="contact-email">sanjayishigh@gmail.com</a>
        <a href="mailto:sanjayishigh@gmail.com" className="contact-btn">Say Hello →</a>
        <svg className="contact-arrow" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 4 L30 36 M18 24 L30 36 L42 24" stroke="#FFE600" strokeWidth="3" strokeLinecap="square"/>
        </svg>
        <div className="contact-socials">
          <a href="https://github.com/sanjayishigh" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/sanjay-cm/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="https://www.kaggle.com/iamsus" target="_blank" rel="noopener noreferrer" className="social-link">Kaggle</a>
          {/* <a href="#" className="social-link">CodePen</a>
          <a href="#" className="social-link">Dribbble</a> */}
        </div>
      </div>
    </section>
  );
}

export default Contact;
