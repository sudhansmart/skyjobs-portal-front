import React from 'react'
import Footerlogo from "../assets/Images/skylarklogo.png"
import '../Style/Footer.css'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faHeart, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import fb from '../assets/Images/facebook.png'
import wa from '../assets/Images/whatsapp.png'
import insta from '../assets/Images/social.png'
import linked from '../assets/Images/linkedin.png'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

export const Footer = ({setAdmin}) => {

  const navigate = useNavigate();

  const handleadmin = ()=>{
    setAdmin(true);
    navigate('/adminlog')
  }
  return (
 <div className='footer-main'>
    <div className='footer-main1 '>
      <div className='footer-logo'>
      <img className='logosky mb-3' src={Footerlogo} alt='company-logo'/>
      <p className='logo-text'>Empowering professionals and advancing careers <br/>Your portal to senior-level opportunities</p>
      </div>
      <div className='links'>
      <NavLink className="footerlink"  to="/"> Home
           </NavLink>
           <NavLink className="footerlink"  to="/jobs"> Job
           </NavLink>
           <NavLink className="footerlink"  to="/contact"> Contact
           </NavLink>
      </div>
      <div className='part-3 text-center'>
        <Link to="/logs">
         <Button className='footer-button mb-4'  style={{color:"black" }}>Register Now <FontAwesomeIcon className='rightarrow' icon={faChevronRight} /><FontAwesomeIcon  className='rightarrow' icon={faChevronRight} /></Button>
         </Link>
         <div className='follow'>
             <p className='text-light'>Follow us on</p>
             <div className='d-flex justify-content-center'>
                <a href="https://www.facebook.com/skylarkhrsolutions" target="_blank" rel="noopener noreferrer"> <img className='follow-logo' src={fb} alt='facebook-icon'/></a>
                <a href="https://wa.me/8610010780?text=Hello%20there!Its%20Skylark%20Job%20Portal%20Feel%20free%20to%20contact" target="_blank" rel="noopener noreferrer"> <img className='follow-logo' src={wa} alt='whatsapp-icon'/></a>
                <a href="https://www.instagram.com/skylark_fun_at_work/" target="_blank" rel="noopener noreferrer"> <img className='follow-logo' src={insta} alt='instagram-icon'/></a>
                <a href="https://www.linkedin.com/company/skylark-hr-solutions/" target="_blank" rel="noopener noreferrer"> <img className='follow-logo' src={linked} alt='linkedin-icon'/></a>
               
             </div>
         </div>
      </div>

    </div>
    <hr style={{color:"white"}}/>
    <div className='bottom-section'>
        <p className='text-light'>Copyright <FontAwesomeIcon icon={faCopyright}/> 2024 Skylark Hr Solutions Pvt Ltd</p>
        <div>
        <NavLink className="footerlink1"  to="/"> Privacy Policy
           </NavLink>
            <span> |</span>
           <NavLink className="footerlink1"  to="/jobs"> Terms and Conditions
           </NavLink>
           </div>
    </div>
    <p className='footer-text'>Developed by <FontAwesomeIcon style={{color:"#DA5656"}} icon={faHeart}/> Skylark Digi Solutions</p>
    </div>
 
  )
}
