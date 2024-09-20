import React, { useState } from 'react';
import '../Style/PopupComponent.css'; // Assuming you have the CSS in a separate file

const PopupComponent = ({isPopupOpen,setIsPopupOpen}) => {
  // const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isBoxOpen, setIsBoxOpen] = useState(true);
  const [boxContent, setBoxContent] = useState('');
  const [boxColor, setBoxColor] = useState('transparent');

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    // document.body.classList.toggle('overlay');
    // window.location.reload();
  };

  const handleBoxOpen = (color, content) => {
    setBoxColor(color);
    setBoxContent(content);
    setIsBoxOpen(true);
  };

  const handleBoxClose = () => {
    setIsBoxOpen(false);
    setBoxColor('transparent');
  };

  return (
    <div>
      <div className={`box ${isBoxOpen ? 'open' : ''}`} style={{ backgroundColor: boxColor }}>
        <span className="close" onClick={handleBoxClose}></span>
      </div>
    
      <div className={`popScroll ${isPopupOpen ? '' : 'hidden'}`}>
        <div className="popup">
          <span className="ribbon top-left ribbon-primary">
            <small>Hello!</small>
          </span>
             <div className="option">  
             <h5 className='popup-title'>Welcome to our Job Portal!</h5>
              <p className='popup-text'>Your registration was successful, and we're thrilled to have you on board.
                Explore exciting job opportunities and take the next step in your career journey with us.
                If you have any questions or need assistance, we're here to help. Happy job hunting!</p>
           
            <div className='video-wrapper'>
                 
              <a href="#" id="close" className="boxi closei text-decoration-none" onClick={handlePopupToggle}>Explore</a>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default PopupComponent;
