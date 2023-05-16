import React, { useRef } from 'react';
import '../share/generic.css';


export default function ContactTab() {

  const contactTabRef = useRef(null);

  const scrollTocontactTab = () => {
    contactTabRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="contact" className="Contact">


    <button id="arrowbutton" onClick={scrollTocontactTab}>
            ↓
          </button>

    <h2 id="contacthead" ref={contactTabRef}>Contact Me!</h2>

    <p id='contacttext'>You can reach me at any time at</p>
    <a id="email" href="mailto:contact@jovanmilicev.com"> contact@jovanmilicev.com </a>

    </div>


  )
}
