import React from 'react'
import '../Style/contentPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faChartLine, faHandshake, faHeadset, faListCheck, faWandMagic } from '@fortawesome/free-solid-svg-icons'
function ContentPage() {
    
  return (
    <div className="maincont">
        <div className='contentrow'>
        <div className='cover ' >
        <div className="topimage"><FontAwesomeIcon className='bellicon' icon={faBell} /></div>
        <div className="textcontentsec">
            <h3 className='contenttitle'>Exclusive Listings</h3>
            <p className='contenttext'>Skylarkjobs.com offers a curated selection of job openings you won't find elsewhere. Our vast network of employers and recruiters ensures our users have access to the best job opportunities available.</p>
        </div>
    </div>
    <div className='cover1 ' >
        <div className="topimage1"><FontAwesomeIcon className='handshakeicon' icon={faHandshake} /></div>
        <div className="textcontentsec1">
            <h3 className='contenttitle1'>Dedicated Platform</h3>
            <p className='contenttext1'>Designed specifically for mid and senior-level professionals, our platform provides a tailored experience that meets your unique needs and expectations.</p>
        </div>
    </div>
   <div className='cover2 ' >
    <div className="topimage2"><FontAwesomeIcon className='headseticon' icon={faHeadset} /></div>
        <div className="textcontentsec2">
            <h3 className='contenttitle2'>Professional Support </h3>
            <p className='contenttext2'>We understand the importance of professional guidance. Our dedicated team is committed to helping you navigate the job market and achieve your career goals.</p>
        </div>
    </div>
    <div className='cover3 '>
    <div className="topimage3"><FontAwesomeIcon className='chartlineicon' icon={faChartLine} /></div>
        <div className="textcontentsec3">
            <h3 className='contenttitle3'>Enhanced Career Opportunities</h3>
            <p className='contenttext3'>Skylarkjobs.com provides access to a wide range of job openings that can help professionals advance their careers.</p>
        </div>
    </div>
    <div className='cover4 ' >
    <div className="topimage4"><FontAwesomeIcon className='listcheckicon' icon={faListCheck} /></div>
        <div className="textcontentsec4">
            <h3 className='contenttitle4'>Personalized Job Matching</h3>
            <p className='contenttext4'>Our advanced algorithm ensures you are presented with job openings that best match your skills, experience, and preferences.</p>
        </div>
    </div>
    <div className='cover5 ' >
    <div className="topimage5"><FontAwesomeIcon className='wandmagicicon' icon={faWandMagic} /></div>
        <div className="textcontentsec5">
            <h3 className='contenttitle5'>Hassle-Free Experience</h3>
            <p className='contenttext5'>Skylarkjobs.com offers a user-friendly interface, advanced search functionality, and real-time communication, making it easy to find the right opportunities.</p>
        </div>
    </div>
        </div>
    
    </div>
  )
}                                           

export default ContentPage