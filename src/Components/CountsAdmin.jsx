import React, { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import '../Style/countsHome.css';
import axios from 'axios';

function CountsAdmin() {
  const [isVisible, setIsVisible] = useState(false);
  const countSectionRef = useRef(null);
  const [profiles, setProfiles] = useState([]); 
  const[jobs,setJobs] = useState([]);

  const fetchData = async () => {   
    try {
        const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/allprofiles`);
        const jobresponse = await axios.get(`https://www.skylarkjobs.com/nodejs/job/getdata`);
        setProfiles(response.data);
        setJobs(jobresponse.data);
       
    } catch (error) {
      console.error('Error Admin fetching data:', error);
    }
  };
    
   


  useEffect(() => {
    fetchData();
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect observer after becoming visible to prevent multiple triggers
        }
      },
      {
        root: null, // viewport
        threshold: 0.1, // 10% visibility
      }
    );

    if (countSectionRef.current) {
      observer.observe(countSectionRef.current);
    }

    return () => {
      if (countSectionRef.current) {
        observer.unobserve(countSectionRef.current);
      }
    };
  }, []);

  return (
    <div className='maincountshome'>
      <div
        id="covercount"
        ref={countSectionRef}
        className={`covercount ${isVisible ? 'visible' : ''}`}
      >
        <div className="count">
          <p className='numcount'>
            {isVisible && <CountUp className='numcount' end={profiles.length} duration={6}  />}
          </p>
          <p className='textcount'>Profiles</p>
        </div>
        <div className="count">
          <p className='numcount'>
            {isVisible && <CountUp className='numcount' end={jobs.length} duration={6}  />}
          </p>
          <p className='textcount'>Posted Jobs</p>
        </div>
        {/* <div className="count">
          <p className='numcount'>
            {isVisible && <CountUp className='numcount' end={150} duration={6} suffix="+" />}
          </p>
          <p className='textcount'>Top Companies</p>
        </div>
        <div className="count">
          <p className='numcount'>
            {isVisible && <CountUp className='numcount' end={100} duration={6} suffix="+" />}
          </p>
          <p className='textcount'>Positions</p>
        </div> */}
      </div>
    </div>
  );
}

export default CountsAdmin;
