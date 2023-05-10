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

        <div className='gallery'>
        <div className='image-container'>
          <img alt="pg.jovan" src={img1} />
          <p className="captions">Settled Water, Vatican City | Shot on Canon M50</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img2} />
          <p className="captions">Wonder of the World, Niagara Falls | Shot on DJI Mini 2</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img3} />
          <p className="captions">Freedom Bridge, Niagara Falls | Shot on DJI Mini 2</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img4} />
          <p className="captions"> Rocky Penninsula, Oakville | Shot on DJI Mini 2</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img5} />
          <p className="captions">Twisty Roads, Burlington Skyway | Shot on DJI Mini 2</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img6} />
          <p className="captions">S.S. RidgeTown, Port Credit | Shot on DJI Mavic PRO</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img7} />
          <p className="captions">Lonely Boat, Oakville | Shot on DJI Mini 20</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img8} />
          <p className="captions">Vatican City, Shot on Canon M50</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img9} />
          <p className="captions">Vatican City, Shot on Canon M50</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img10} />
          <p className="captions">Vatican City, Shot on Canon M50</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img11} />
          <p className="captions">Vatican City, Shot on Canon M50</p>
        </div>
        <div className='image-container'>
          <img alt="pg.jovan" src={img12} />
          <p className="captions">Vatican City, Shot on Canon M50</p>
        </div>
        
      </div>


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
