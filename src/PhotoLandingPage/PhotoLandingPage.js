import React from 'react'
import './PhotoLandingPage.css';
import img1 from './photos/image1.png'
import img2 from './photos/image2.png'
import img3 from './photos/image3.png'
import img4 from './photos/image4.png'
import img5 from './photos/image5.png'
import img6 from './photos/image6.png'
import img7 from './photos/image7.png'
import img8 from './photos/image8.png'
import img9 from './photos/image9.png'
import img10 from './photos/image10.png'
import img11 from './photos/image11.png'
import img12 from './photos/image12.png'

export default function PhotoLandingPage(props) {

  const handlePhotographyButtonClick = () => {
    props.onPhotographyButtonClick();
  };

  return (
    <div className='photo-lp-main'>
        <h2 id="photoheader">Photography</h2>
        <p id="desctext">A look into some of my favourite photos</p>
        
        <div className='gallery'>
        <img id ="indphoto"  alt = "pg.jovan" src={img1}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img2}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img3}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img4}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img5}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img6}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img7}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img8}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img9}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img10}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img11}></img>
        <img id ="indphoto"  alt = "pg.jovan" src={img12}></img>
        </div>

        <button
          className="homebutton"
          onClick={handlePhotographyButtonClick}
        >
          Return Home
        </button>
    </div>
  )
}
