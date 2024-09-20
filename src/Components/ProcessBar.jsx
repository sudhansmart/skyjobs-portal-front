import React,{useState} from 'react'
import '../Style/processBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons'
function ProcessBar({page}) {
  

  return (
    <>
        {/* <div className="wrapper"> */}
<div className="main-container">
    <div className="steps-container">
        {page === 0?
              <div className="step in-progress">
            <div className="preloader"></div>
            <div className="label loading">
                 Personal Details
            </div>
        </div>
             : <div className="step completed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
            <div className="label completed">
                Personal Details
            </div>
           
        </div>}
        <div className="line completed"></div>
        {page === 1?
              <div className="step in-progress">
            <div className="preloader"></div>
            <div className="label loading">
                  Education Details
            </div>
        </div>
             :
        <div className={page >1? "step completed" : "step pending"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
            <div className="label completed">
                Education Details
            </div>
          
        </div>}
        {/* <div className="line next-step-in-progress"> 
        </div> */}
        <div className="line completed"></div>
         {page === 2?
        <div className="step in-progress">
            <div className="preloader"></div>
            <div className="label loading">
                Employment
            </div>
        </div>:
         <div className={page >2? "step completed" : "step pending"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
            <div className="label completed">
                 Employment
            </div>
          
        </div>}

        <div className="line completed"></div>
         {page === 3?
        <div className="step in-progress">
            <div className="preloader"></div>
            <div className="label loading">
                Add Skills
            </div>
        </div>:
         <div className={page >3? "step completed" : "step pending"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
            <div className="label completed">
                 Add Skills
            </div>
          
        </div>}

        {/* <div className="line prev-step-in-progress"></div> */}
        <div className="line completed"></div>
         {page === 4?
              <div className="step in-progress">
            <div className="preloader"></div>
            <div className="label loading">
                  Languages Known
            </div>
        </div>
             :
        <div className={page >4? "step completed" : "step pending"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
            <div className="label completed">
                Languages Known
            </div>
          
        </div>}
        
        
        
    </div>
</div>
{/* </div> */}
    </>
  ) 
}

export default ProcessBar
