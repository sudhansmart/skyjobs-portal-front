import React, { useState, useEffect } from 'react';
import '../Style/DisplayJob.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronCircleLeft, faLeftLong, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form, Toast, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SimilarJobs from './SimilarJobs';
import { Helmet } from 'react-helmet';

function DisplayJob() {
 
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [authid, setAuthid] = useState(localStorage.getItem('authId'));
  const [showToast, setShowToast] = useState(false);
  const [showFeedback,setShowFeedback] = useState (false)

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };
  const handleClose = () => {
    setShow(false);
    setFile(null);
    setFileError('');
    setShowFeedback(false);
  };

  const handleShow = () => {
  if(authid){
    setShow(true);
  }
 else if(!authid){
      navigate('/logs')
 }
}

  const fetchData = async () => {
    const response = await axios.get(`https://www.skylarkjobs.com/nodejs/job/specificjob/${id}`);
    setData([response.data]);
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileError('');
  };

  const handleApply = async () => {
    if (!file) {
      setFileError('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateId', authid);

    try {
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/post/apply/${id}`, formData, {
        // const response = await axios.post(`http://localhost:5000/post/apply/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
     
      if (response.status === 201) {
        handleClose();
        setShowToast(true); 
      }
      else if (response.status === 202){
        setShowFeedback(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
        <Helmet>
           {/* Canonical tag */}
        <link rel="canonical" href={window.location.href} />
        </Helmet>

<Button onClick={handleBackClick}  className='backbtn'><FontAwesomeIcon  icon={faLeftLong}/></Button>
    <div className='jobdisplay1'>
      {data.map((item, index) => (
        <div className='displayjob-main p-1' key={index}>
          <div className='displayjob-top p-4'>
            <h3 className='displayjob-title'>{item.jobtitle}</h3>
            <p className='m-0'><FontAwesomeIcon icon={faBuilding} /> Skylark HR solutions</p>
            <p><FontAwesomeIcon icon={faLocationDot} /> {item.location}</p>
            <p>Salary Upto {item.salary} LPA</p>
            <div className='d-flex'>
              <p className='top-tag p-1 m-1 text-white'>Work From Office</p>
              <p className='top-tag p-1 m-1 text-white'>{item.jobtype}</p>
              <p className='top-tag p-1 m-1 text-white'>Experience {item.experience} years</p>
            </div>
            <Button className='w-100 mt-4' onClick={handleShow}>Apply Now</Button>
          </div>
          <div className='displayjob-content p-4 mt-4'>
            <h5>Company Profile</h5>
            <p>{item.companyprofile}</p>
            <h5>Job Description</h5>
            <p>{item.jobdescription}</p><hr/>
            <p className='mt-4' style={{fontWeight:"600"}}>Posted on : {item.postedDate.split('T')[0]}</p>
          </div>
        </div>
      ))}
      <SimilarJobs />

      <Modal
        show={show}
        size='lg'
        bg="Secondary"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showFeedback? <p className='text-center p-5' style={{fontWeight:'500'}}>You have already applied. Please check your applied jobs</p> :<Form>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Upload CV</Form.Label>
              <Form.Control
                type='file'
                onChange={handleFileChange}
                accept='.pdf, .doc, .docx'
                className='mt-3'
                isInvalid={fileError !== ''}
              />
              {fileError && <Form.Control.Feedback type='invalid'>{fileError}</Form.Control.Feedback>}
              <p className='apply-text mt-3 text-center '>Upload Updated CV to Proceed</p>
            </Form.Group>
          </Form>}
        </Modal.Body>
       {showFeedback? <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
       </Modal.Footer>:
       <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply} >Apply</Button>
        </Modal.Footer>}
      </Modal>

      <Row className="position-fixed top-0 end-0 p-3">
        <Col xs={10}>
          <Toast bg='success' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Application submitted successfully</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default DisplayJob;
