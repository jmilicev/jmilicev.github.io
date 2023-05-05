import React, { useRef } from 'react';
import './ContactTab.css';


export default function ContactTab() {

  const contactTabRef = useRef(null);

  const scrollTocontactTab = () => {
    contactTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="contact" className="contact">


    <button id="arrowbutton" onClick={scrollTocontactTab}>
            ↓
          </button>

    <h2 ref={contactTabRef}>Contact Me!</h2>

    <a id="email" href="mailto:contact@jovanmilicev.com"> You can reach me at any time at&nbsp;<strong>contact@jovanmilicev.com</strong></a>


    </div>


  )
}
