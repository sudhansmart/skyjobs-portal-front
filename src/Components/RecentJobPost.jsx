import React, { useState, useEffect } from 'react';
import '../Style/RecentJobPost.css';
import axios from 'axios';
import { Col, Row,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faLocation, faLocationDot, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditPostedJobs from './EditPostedJobs';

const RecentJobPost = () => {
  const [data, setData] = useState([]);
  const[jobId,setJobId]= useState(" ")
  const [ModalShow,setModalShow] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.skylarkjobs.com/nodejs/job/getdata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

      const handleDeletePost = async(id)=>{
           const response = await axios.delete(`https://www.skylarkjobs.com/nodejs/job/postdelete/${id}`);
        
         console.log("response :",response);
         alert(response.data.message);
         fetchData();
      }

  const handleEditPost =(id)=>{
    setModalShow(true)
    setJobId(id)
  }
  const handleClose=()=>{
    setModalShow(false)
  }
     
  const sortedData = [...data].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

  return (
    <div className='recent-bg p-5'>
      <h4 className='recent-title'>Recent Posts</h4>
      <Row>
      {sortedData.map((job) => (
        <Col key={job._id} md={4}>
          <div className='recent-job p-4'>
           <div className='d-flex justify-content-between'>
                       <div>
                        <h5 className='job-title'>{job.jobtitle}</h5>
                        <h5 className='job-company'> <FontAwesomeIcon style={{color:"grey"}} icon={faBuilding}/> {job.companyName}</h5>
                        <h5 className='job-company'><FontAwesomeIcon  style={{color:"grey"}} icon={faLocationDot}/> {job.location}</h5>
                       </div>
                       <div>
                           <FontAwesomeIcon onClick={()=>handleEditPost(job._id)} className='text-primary me-2' icon={faPenToSquare}/> 
                            {/* <FontAwesomeIcon onClick={()=>handleDeletePost(job._id)} className='text-danger' icon={faTrash}/> */}
                       </div>
            </div>
            <hr />
            {/* {job.primarySkills && job.primarySkills.split('/').map((skill, index) => (
              <p key={index} className='job-skills'><i className="bi bi-dot"></i>{skill}</p>
            ))} */}
            <p className='job-count p-1 text-center'>Applicants: {job.applicants.length}</p>
            <Link to={`/candidates/${job._id}`} className='d-flex justify-content-center' style={{ textDecoration: 'none' }}>
              <button className='button-login no-decoration'>View Applicants</button>
            </Link>
          </div>
        </Col>
      ))}
      </Row>
      <Modal
        show={ModalShow}
        // size='lg'
        fullscreen={true}
        bg="Secondary"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <EditPostedJobs   setModalShow={setModalShow}   id={jobId}/>
        </Modal.Body>
      
      </Modal>
    </div>
  );
};

export default RecentJobPost;
