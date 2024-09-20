import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row,FloatingLabel,Offcanvas } from 'react-bootstrap';
import '../Style/candidate.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faBuilding, faEnvelope,faMagnifyingGlass, faPhone,faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterAdmin from './FilterAdmin';
import NewProfile from './NewProfile'


function Candidates() {
  const[show,setShow] = useState(false);
    const [jobData, setJobData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const { jobid } = useParams();
    const [data, setData] = useState([]);
    
   
    useEffect(() => {  
      fetchData();  
    }, []);
    
    const fetchUserProfiles = async (applicants) => {
      try {
        const userProfilePromises = applicants.map(profile =>
          axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${profile.candidateId}`)
        );
        const userProfilesData = await Promise.all(userProfilePromises);
        const userProfiles = userProfilesData.map(response => response.data);
       
        return userProfiles;
      } catch (error) {
        console.error('Error fetching user profiles:', error);
        return []; // Return empty array in case of error
      }
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.skylarkjobs.com/nodejs/job/specificjob/${jobid}`);
    
      
        setOriginalData(response.data);
        const userProfiles = await fetchUserProfiles(response.data.applicants);
        setData(userProfiles);
        setJobData(userProfiles);
        setOriginalData(userProfiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    // Filter Logic
    
const [filter, setFilter] = useState({
  jobtitle:'',
  skills: '',
  minyear: '',
  maxyear: '',
  category: '',
  currentCompany: '',
  location: '',
  gender: '',
  noticeperiod: '',
  name: '',
  mail: '',
  phonenumber: ''
});

const handleOnChange = (e) => {
  // fetchData();
  const { name, value } = e.target;
  setFilter(prevFilter => ({
    ...prevFilter,
    [name]: value,
  }));
};  
   
const handleClose=()=>{
  setShow(false);
}


const filterJobData = () => {
    
  let filteredJobs = [...jobData];
  // Apply Jobtitle term filter
  if (filter.jobtitle) {
    filteredJobs = filteredJobs.filter(user =>
      user.role && user.role.toLowerCase().includes(filter.jobtitle.toLowerCase())
         
   
    ); 
  }

  // Apply search term filter
  if (filter.skills) {
    const searchTerm = filter.skills.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.keySkills && job.keySkills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }
  

  // Apply experience filter
  if (filter.minyear || filter.maxyear) {
    filteredJobs = filteredJobs.filter(job => {
      const minExperience = parseInt(filter.minyear) || 0;
      const maxExperience = parseInt(filter.maxyear) || Infinity;
      return job.experience >= minExperience && job.experience <= maxExperience;
    });
  }
  
  // Apply category filter
  if (filter.category) {
    filteredJobs = filteredJobs.filter(job =>
      job.industry && job.industry.toLowerCase().includes(filter.category.toLowerCase())
    );
  }
   // Apply Name filter
   if (filter.currentCompany) {
    filteredJobs = filteredJobs.filter(job =>
      job.currentCompany && job.currentCompany.toLowerCase().includes(filter.currentCompany.toLowerCase())
    );
  }
  // Apply Location filter
  if (filter.location) {
    filteredJobs = filteredJobs.filter(job =>
      job.location && job.location.toLowerCase().includes(filter.location.toLowerCase())
     
    );
  }

  // Apply Gender filter
  if (filter.gender) {
    filteredJobs = filteredJobs.filter(job =>
      job.gender && job.gender.toLowerCase() === filter.gender.toLowerCase()
    );
  }

  // Apply Notice Period filter
  if (filter.noticeperiod) {
    const [min, max] = filter.noticeperiod.split('-').map(val => parseInt(val)); 
    filteredJobs = filteredJobs.filter(job => {
    const minExperience = +min || 0;
      const maxExperience = +max || Infinity;
      return +job.noticeperiod >= minExperience && +job.noticeperiod <= maxExperience && job.noticeperiod <= "immediate";
    });
  }

  return filteredJobs;
};

const handleResetFilters = () => {
  setFilter({
    jobtitle:'',
      skills: '',
    minyear: '',
    maxyear: '',
    category: '',
    currentCompany: '',
    location: '',
    gender: '',
    noticeperiod: '',
    name: '',
    mail: '',
    phonenumber: ''
  });
  setData(originalData);
};
 
const handleApplyFilters = () => {
    
  const filteredData = filterJobData();
  setData(filteredData);
  handleClose();
};


    const handleDownload = async (candidateId) => {
     
        try {
         
            const response = await axios.get(`https://www.skylarkjobs.com/nodejs/file/download/${candidateId}/${jobid}`, {
            responseType: 'blob',
          });
          
          if (response.status === 201) {
            alert("Candidate CV not available. Please upload.");
          } if (response.status === 202) {
            alert("Candidate  not available. Please check.");
          }
          if (response.status === 204) {
            alert("Candidate  not Applied this job.");
          }
          else {
            const blob = new Blob([response.data]);
            const link = document.createElement('a');
      
            // Find the candidate by candidateId
            const findcandidate = data.find(candidate => candidate._id === candidateId);
            if (!findcandidate) {
              console.error('Candidate not found');
              return;
            }
      
            const fileName = `${findcandidate.name.replace(/\s+/g, '_')}_CV.pdf`; // Replace whitespace with underscores
      
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error('Error downloading CV:', error);
        }
      };
      
      
      

 
   

    return (
        <div className='d-flex p-3'>
            <span className="filterbtn d-md-none " onClick={()=>setShow(true)}><FontAwesomeIcon className='filter-icon' icon={faFilter} /></span>
            <div className="hidefilter">
          <FilterAdmin 
           filter={filter} 
           handleResetFilters={handleResetFilters}  
           handleOnChange={handleOnChange} handleApplyFilters={handleApplyFilters}/></div>
          {data.length == 0? <p className='text-center w-100 ' style={{fontSize:'30px',fontWeight:"600"}}>No Results Found.</p>
               :
               <NewProfile data={data}  handleDownload={handleDownload}/>
      //          <div  style={{height:"100%",width:"80%"}} >
      //       {data.map((candidate, index) => (
      //       <div key={index} className='candidate-main'>
      //           <div className=' d-flex p-3 justify-content-around align-items-center ' key={index}>
      //                <div className='ellipse-9' />
      //               <div>
      //                   <h5 className='candidate-name'>{candidate.name.replace(/\b\w/g,c=>c.toUpperCase())}</h5>
      //                   <h5 className='candidate-job '>{candidate.role}</h5>
      //                   <h5 className='candidate-loc mb-2'>{candidate.currentCompany}</h5>qq
      //                   <h5 className='candidate-loc mb-2'>{candidate.location}</h5>
      //               </div>
      //               <div>
      //               <p className='experience'>Experience : <span className='years ps-1'> {candidate.experience} years </span> </p>
      //               <p className='experience'>CTC : <span className='years ps-1'> {candidate.currentctc} LPA </span> </p>
      //               <p className='experience'>Notice Period : <span className='years ps-1'> {candidate.noticeperiod} Days </span> </p>
      //               </div>
                    
      //           </div>
      //               <div className='d-flex justify-content-evenly p-3'>
                         
      //               <div  className='datae p-5 '>
      //                     <p ><FontAwesomeIcon icon={faEnvelope}/> Email : {candidate.email}</p>
      //                     <p><FontAwesomeIcon icon={faBuilding}/> Industry : {candidate.industry}</p>
      //                     <p><FontAwesomeIcon icon={faPhone}/> Phone Number : {candidate.phonenumber}</p>
      //               </div>
      //               <div  className='skill1 p-3'>
      //                   <h5>Skills : </h5>
      //                   <div className='m-3 '>
      //                  {candidate.keySkills.map((skill, index) => (
      //                       <div className="skill-items" key={index}>
      //                         <span className="skills-text" onClick={() => handleSkillEdit(index)}>{skill.replace(/\b\w/g,c=>c.toUpperCase())}</span>
                             
      //                      </div>
      //   ))}
      // </div>
      //              </div>
      //               </div>
      //               <div className='d-flex justify-content-center '> 
      //               <button className='button-frame mb-3' onClick={() => handleDownload(candidate._id)}>
      //                    <FontAwesomeIcon className='down-arrow' icon={faArrowAltCircleDown}/>
      //                  <span className='download-resume'>Download Resume</span>
      //               </button>

      //               </div>
      //           </div> 
      //  ))}
      // </div>
            }
             <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas'>
        <FilterAdmin 
           filter={filter} 
           handleResetFilters={handleResetFilters}  
           handleOnChange={handleOnChange} handleApplyFilters={handleApplyFilters}/>
        </Offcanvas.Body>
      </Offcanvas>
           
        </div>
    );
}

export default Candidates;
