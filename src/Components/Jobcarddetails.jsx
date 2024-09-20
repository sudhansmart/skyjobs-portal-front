import React, { useState} from 'react';
import "../Style/jobcarddetails.css";
import { Link,useNavigate} from 'react-router-dom';
import FilterUser from './FilterUser';
import { Button,Offcanvas  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faIndianRupeeSign, faLeftLong ,faFilter } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

function Jobcarddetails() {
    const [data, setData] = useState([]);
    const[show,setShow] = useState(false);

    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate(-1);
    };
    
    const handleClose=()=>{
        setShow(false);
      }

    
    return ( 
        <>
         <span className="filterbtn d-md-none " onClick={()=>setShow(true)}><FontAwesomeIcon className='filter-icon' icon={faFilter} /></span>
        <Button onClick={handleBackClick}  className='backbtn'><FontAwesomeIcon  icon={faLeftLong}/></Button>
        <div className='jobdisplay  '>
           <div className='usersfilter'>

          
            <FilterUser className='filtercomp' data={data} setData={setData} />
            </div>
            
         {data.length == 0? <h6 className='nojob text-center w-100'>No Results Found</h6> :
        
            <div className='row covercard ' >
                {data.map((job) => (
                <div className='col-md-10 p-2' key={job.serialId}>
                        <div className='cardjobs mb-3 p-2' style={{ cursor: "pointer" }} >
                            <div className='card-body p-3'>
                                <h5 id='job-role' className='card-title'>{job.jobtitle}</h5>
                                <p id='job-location' className='card-title'><i className="bi bi-geo-alt"></i> {job.location}</p>
                                <div className='card-l3'>
                                     <p className='card-textbox'><FontAwesomeIcon className='brief-icon' icon={faBriefcase} /> <span className='card-texts'>{job.experience} Yrs</span></p>
                                     <p className='card-textbox'><FontAwesomeIcon className='type-icon'icon={faClock} /> <span className='card-texts'>{job.jobtype}</span></p>
                                     <p className='card-textbox3'><FontAwesomeIcon className='inr-icon' icon={faIndianRupeeSign} /> <span className='card-texts'>Upto {job.salary} LPA</span></p>
                                </div>
                                <hr />
                                <div className='job-require mt-3'>
                                {job.primarySkills && job.primarySkills.split('/').map((skill, index) => (
                                        <p key={index}><i className="bi bi-dot"></i>{skill}</p>
                                    ))}
                                </div><hr />
                                <Link className='text-decoration-none' to ={`/jobdetails/${job._id}/${job.category}`}>
                              <div className='link_wrapper '>
                              <button className="button-17"> More info</button>
                              </div>
                              </Link>
                               
                            </div>
                        </div>
                    </div>
                ))}
           
        </div>}
        </div>
        <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas'>

            <FilterUser handleClose={handleClose} data={data} setData={setData} />
        </Offcanvas.Body>
      </Offcanvas>
        </>
    );
}

export default Jobcarddetails;

