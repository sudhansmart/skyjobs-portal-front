import React, { useState,useEffect } from 'react';
import "../Style/Employment.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Col, FormGroup, FormLabel, Row } from 'react-bootstrap';
import axios from 'axios';

const EditEmployment = ({handleCloseModal,employment_id}) => {
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [showPresent, setShowPresent] = useState(false);
  const [formData, setFormData] = useState({
    expYear: '',
    expMonth:'',
    currentCompanyName: '',
    designation: '',
    jobSummary: '',
    startDate: '',
    endDate: '',
    isCurrent: false 
  });

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
      const existingEmployment = response.data.employment.find(emp => emp._id === employment_id);
    
      setFormData(existingEmployment);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employmentData = {
      expYear: formData.expYear,
      expMonth:formData.expMonth,
      currentCompanyName: formData.currentCompanyName,
      designation: formData.designation,
      jobSummary: formData.jobSummary,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isCurrent: formData.isCurrent
    };

    if (showPresent) {
      employmentData.isCurrent= true ;
      employmentData.endDate = new Date();
      console.log("submitted-present :",employmentData);

      const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/employment/${authId}/${employment_id}`, employmentData);
    if(response.status == 200){
      handleCloseModal();
    }
    }else{
      const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/employment/${authId}/${employment_id}`, employmentData);
        if(response.status == 200){
          handleCloseModal();
        }
  }

    
      
  
  };

  return (
    <div className='container mt-4'>
      <p className='current-employe'>Is this your current employment?</p>
      <div className='d-flex'>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="iscurrent"
      value="true"
      checked={formData.isCurrent === true}
      onChange={() => setFormData({ ...formData, isCurrent: true })}
    />
    <label className="form-check-label yes-employe me-5">
      Yes
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="iscurrent"
      value="false"
      checked={formData.isCurrent === false}
      onChange={() => setFormData({ ...formData, isCurrent: false })}
    />
    <label className="form-check-label yes-employe">
      No
    </label>
  </div>
</div>

      <Form onSubmit={handleSubmit}>
       
        <Row className='mt-3'>
          <FormGroup as={Col} md='6'>
            <FormLabel>Total experience</FormLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Year"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Experience"
                name="expYear"
                value={formData.expYear}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup as={Col} md='6'>
            <FormLabel></FormLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Months"
              className="mt-2"
              
            >
              <Form.Control
                type="text"
                placeholder="Enter Experience"
                name="expMonth"
              value={formData.expMonth}
              onChange={handleInputChange}
              />
            </FloatingLabel>
          </FormGroup>
        </Row>
        {/* Current Company Name */}
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label={formData.isCurrent? "Current Company Name" :"Company Name"}
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Current Company Name"
              name="currentCompanyName"
              value={formData.currentCompanyName}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </FormGroup>
        {/* Designation */}
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Designation"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </FormGroup>
        {/* Job Summary */}
        <FormGroup>
          <FloatingLabel controlId="floatingTextarea2" label="Job Summary">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className='mb-3'
              name="jobSummary"
              value={formData.jobSummary}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </FormGroup>
        {/* Work Period */}
        <FormLabel>Work Period</FormLabel>
        <div className='d-flex'>
          <FormGroup as={Col} md="4" className='mt-2'>
            <Form.Control
              type="date"
              id="startDate"
              name="startDate"
            
              value={formData.startDate ? formData.startDate.split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </FormGroup>
          <p className='mt-3 me-3 ms-3'>To</p>
          {showPresent ?
            <p className='mt-3 me-3'>Present</p> :
            <FormGroup as={Col} md="4" className='mt-2'>
              <Form.Control
                type="date"
                id="endDate"
                name="endDate"
               
                value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </FormGroup>}
        </div>
       
        <Button type="submit" className="skill-add-button mt-3">Add</Button>
      </Form>
    </div>
  );
}

export default EditEmployment;
