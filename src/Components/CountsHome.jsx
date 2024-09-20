import React, { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import '../Style/countsHome.css';

function CountsHome() {
  const [isVisible, setIsVisible] = useState(false);
  const countSectionRef = useRef(null);

  useEffect(() => {
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
            {isVisible && <CountUp className='numcount' end={10} duration={6} suffix="+" />}
          </p>
          <p className='textcount'>Years</p>
        </div>
        <div className="count">
          <p className='numcount'>
            {isVisible && <CountUp className='numcount' end={650} duration={6} suffix="K" />}
          </p>
          <p className='textcount'>Candidates</p>
        </div>
        <div className="count">
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
        </div>
      </div>
    </div>
  );
}

export default CountsHome;
