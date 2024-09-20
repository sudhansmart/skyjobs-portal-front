import React,{useEffect,useState} from 'react'
import  '../Style/aboutPage.css'
import img from '../assets/Images/about3.jpeg'
import { Link } from 'react-router-dom'
function About() {

    const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.getElementById('aboutwords1');
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 1.2) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    
  return (
    <div className='mainabout'>
        <div className="aboutimg"> 
            <img  className={`imgabout ${isVisible ? 'visible' : ''}`} src={img} alt="about-image" />
        </div>
        <div className="abouttext">
          <h6 className='aboutsub'>HIRE YOUR DREAM TEAM</h6>
            <h3 className='abouttitle'>Transform Your Hiring Experience with Skylark HR Solutions
            </h3>
            <p className='aboutwords'>
            At Skylark HR Solutions, we understand the critical role of finding the right talent for your organization. Our team of experts is dedicated to providing hiring support tailored to your unique needs. With 10 years of experience, we have developed a comprehensive recruitment approach that ensures you find the best candidates for your mid and senior-level positions. 
            </p>
            <p  id="aboutwords1" className={`aboutwords1 ${isVisible ? 'visible' : ''}`}>
            Our services include permanent hiring, lateral hiring, and confidential searches, guaranteeing you find the perfect fit. With our expertise, you can streamline your hiring process, reduce time-to-hire, and increase the chances of finding the ideal candidate. Trust us to deliver exceptional results and transform your hiring experience.
            </p>
            <Link to="/contact">
               <button className='aboutbtn'>Contact us</button>
               </Link>
            </div>
    </div>
  )
}

export default About