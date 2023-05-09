import React, { useRef } from 'react';
import '../share/generic.css';


export default function ContactTab() {

  const contactTabRef = useRef(null);

  const scrollTocontactTab = () => {
    contactTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop= () => {
    contactTabRef.current.scrollIntoView({ behavior: 'smooth' });window.scrollBy(0, 65);
    window.scrollBy(0, -100000);
  };

  return (
    <div id="contact" className="Contact">


    <button id="arrowbutton" onClick={scrollTocontactTab}>
            ↓
          </button>

    <h2 ref={contactTabRef}>Contact Me!</h2>
    <a id="email" href="mailto:contact@jovanmilicev.com"> You can reach me at any time at&nbsp;<strong>contact@jovanmilicev.com</strong></a>
    
    <button id="topButton" onClick={scrollToTop}>
            Return to Top
    </button>

    </div>


  )
}
