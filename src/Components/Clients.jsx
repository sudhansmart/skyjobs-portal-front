import React from 'react'
import "../Style/Clients.css"
import infosys from "../assets/Images/infosys.png"
import Accenture from "../assets/Images/Accenture.png"
import Wipro from "../assets/Images/Wipro.png"
import datavail from "../assets/Images/datavail.png"
import Haworth from "../assets/Images/Haworth.png"
import Enphase from "../assets/Images/Enphase.png"
import opendoor from "../assets/Images/opendoor.png"
const Clients = () => {
  return (
    <div className='overallbox'>
 <div className='d-flex justify-content-between align-content-center'>


 <div className='line'></div>  
<p className='clientheading text-center'> Our Awesome Clients </p>
<div className='line'></div> 
</div>
<hr/>
<marquee > 
<div className="clients d-flex justify-content-evenly">
  <img className='clientlogo' src={infosys} alt='infosys-logo'/>
  <img className='clientlogo' src={Accenture} alt='Accenture-logo'/>
  <img className='clientlogo' src={Wipro} alt='Wipro-logo'/>
  <img className='clientlogo' src={datavail} alt='datavail-logo'/>
  <img className='clientlogo' src={Haworth} alt='Haworth-logo'/>
  <img className='clientlogo' src={Enphase} alt='Enphase-logo'/>
  <img className='clientlogo' src={opendoor} alt='opendoor-logo'/>

 </div></marquee>
    </div>
  )
}

export default Clients