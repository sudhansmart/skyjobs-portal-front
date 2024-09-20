import React,{useEffect,useState} from 'react'
import image from '../assets/Images/hmeintro.jpg'
import { Link } from 'react-router-dom'
import '../Style/homeIntro.css'
function HomeIntro() {

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const aboutSection = document.getElementById('introimgae');
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
    <div className='mainhomeintro'>
         <div className="righthomeintro">
          <h6 className='aboutsub'>Job Portal</h6>
            <h3 className='abouttitle'>Mid & Senior Level Management Positions
            </h3>
          
            <p   className='introtext'>
            Skylarkjobs.com is a leading job portal specializing in exclusive listings for mid-level and senior-level management positions. Our platform caters to the needs of professionals seeking challenging and rewarding career opportunities. With our extensive network of employers and recruiters, we ensure our users have access to the best jobs available.            </p>
            <Link to="/jobs">
               <button className='aboutbtn'>Explore Jobs</button>
               </Link>
          </div>
          <div  className="lefthomeintro">
                 <img id='introimgae' className={`homeintroimg ${isVisible ? 'visible' : ''}`} src={image} alt="intro-image" />
          </div>
         
        </div>
  )
}

export default HomeIntro