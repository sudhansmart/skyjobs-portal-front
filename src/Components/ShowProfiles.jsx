import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row,FloatingLabel, Offcanvas } from 'react-bootstrap';
import '../Style/candidate.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faFilter} from '@fortawesome/free-solid-svg-icons';
import FilterCandidate from './FilterCandidate';
import NewProfile from './NewProfile'

 
function ShowProfiles() {
  const[show,setShow] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
 
    const { jobid } = useParams();
    const [data, setData] = useState([]);
//  Search logic here
useEffect(() => {
  fetchData();

}, []);

const fetchData = async () => {
  try {

    const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/allprofiles`);
    setData(response.data)
    setJobData(response.data);
    setOriginalData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

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


const filterJobData = () => {
    
  let filteredJobs = [...jobData];
 


  // Apply Jobtitle term filter
  if (filter.jobtitle) {
    filteredJobs = filteredJobs.filter(user =>
      user.role && user.role.toLowerCase().includes(filter.jobtitle.toLowerCase())
          // console.log("key:", user.role,filter.jobtitle)
   
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
    const minExperience = min || 0;
      const maxExperience = max || Infinity;
      return +job.noticeperiod >= minExperience && +job.noticeperiod <= maxExperience && job.noticeperiod <= "immediate";
    });
  }


  // Apply Name filter
  if (filter.name) {
    filteredJobs = filteredJobs.filter(job =>
      job.name && job.name.toLowerCase().includes(filter.name.toLowerCase())
     
    );
  }

  // Apply Email filter
  if (filter.mail) {
    filteredJobs = filteredJobs.filter(job =>
      job.email && job.email.toLowerCase().includes(filter.mail.toLowerCase())
    )
  }

  // Apply Phone Number filter
  if (filter.phonenumber) {
    filteredJobs = filteredJobs.filter(job =>
      job.phonenumber && job.phonenumber === parseInt(filter.phonenumber)
    );
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
          const response = await axios.get(`https://www.skylarkjobs.com/nodejs/file/download/${candidateId}`, {
            responseType: 'blob',
          });
           console.log("download res : ",response)
          if (response.status === 201) {
            alert("Candidate CV not available. Please upload.");
          } else {
            const blob = new Blob([response.data]);
            const link = document.createElement('a');
      
            // Find the candidate by candidateId
            const findcandidate = data.find(candidate => candidate._id === candidateId);
      
            if (!findcandidate) {
              console.error('Candidate not found');
              return;
            }
              
            const fileNameParts = findcandidate.cvname.split('.');
            console.log("fileNameParts :", fileNameParts);
            const fileType = fileNameParts[fileNameParts.length - 1]; // Get the last part as the file type
            const nameWithoutExtension = fileNameParts.slice(0, -1).join('.'); // Join all parts except the last one
            
            // Generate the formatted file name
            const formattedName = nameWithoutExtension.replace(/\s+/g, '_');
            const fileName = `${formattedName}_CV.${fileType}`;  
          
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
      
      
      const handleClose=()=>{
        setShow(false);
      }

    const handleApplicant = async (index, value,candidateId) => {
        const newData = [...data];
        newData[index].status = value;
        setData(newData);

        try {
            const response = await axios.put(`https://www.skylarkjobs.com/nodejs/post/update/${jobid}`, {
                status: value,
                candidateId : candidateId
            });
            if (response.status === 200) {
                console.log("Updated", response.data);
            } else {
                console.error('Update failed:', response.data);
            }
        } catch (error) {
            console.error('An error occurred while updating:', error);
        }
    };
   

    return (
      <>
       <div className='top-section'>
        <span className="filterbtn d-md-none " onClick={()=>setShow(true)}><FontAwesomeIcon className='filter-icon' icon={faFilter} /></span>
             <Form className='searchbarset'>
             <Form.Group controlId="formFile">
            <FloatingLabel controlId="floatingInput" label="Search Role">
              <Form.Control
                type="text"
                placeholder="Java Developer"
                name='jobtitle'
                value={filter.jobtitle}
                onChange={handleOnChange}
                className='searchinput'
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formFile">
            <FloatingLabel controlId="floatingInput" label="Location">
              <Form.Control
                type="text"
                placeholder="city"
                name='location'
                value={filter.location}
                onChange={handleOnChange}
                 className='searchinput'
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group onClick={handleApplyFilters} controlId="formFile" className='search-icon'>
          <FontAwesomeIcon className='glass-icon'  icon={faMagnifyingGlass} />
          </Form.Group>
             </Form>

           </div>
        <div className='d-flex'>
         <div className="hidefilter">

        
          <FilterCandidate  
               filter={filter} 
               handleResetFilters={handleResetFilters}  
               handleOnChange={handleOnChange} handleApplyFilters={handleApplyFilters}/>
                </div>
              {data.length == 0?
                 <p className='no-result text-center w-100  '>No Results Found</p>

               :
                  <NewProfile data={data} handleApplicant={handleApplicant} handleDownload={handleDownload}/>
      }
        </div>
        <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas'>
                <FilterCandidate  
               filter={filter} 
               handleResetFilters={handleResetFilters}  
               handleOnChange={handleOnChange} handleApplyFilters={handleApplyFilters}/>
        </Offcanvas.Body>
      </Offcanvas>
        </>
    );
}

export default ShowProfiles;
