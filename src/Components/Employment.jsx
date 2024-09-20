import React, { useState } from 'react';
import "../Style/Employment.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Col, FormGroup, FormLabel, Row } from 'react-bootstrap';
import axios from 'axios';

const Employment = ({handleCloseModal,setPage,page}) => {
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
    isCurrent: false // default value for checkbox
  });

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
      
    const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/employment/${authId}`, employmentData);
    if(response.status == 201){
      setFormData({
        expYear: '',
        expMonth:'',
        currentCompanyName: '',
        designation: '',
        jobSummary: '',
        startDate: '',
        endDate: '',
        isCurrent: false // default value for checkbox
      });
      handleCloseModal();
      setPage(page+1)
    }
    }else{
    const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/employment/${authId}`, employmentData);
        if(response.status == 201){
          setFormData({
            expYear: '',
            expMonth:'',
            currentCompanyName: '',
            designation: '',
            jobSummary: '',
            startDate: '',
            endDate: '',
            isCurrent: false // default value for checkbox
          });
          handleCloseModal();
          setPage(page+1)
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
            name="flexRadioDefault"
            onChange={() => setShowPresent(true)}
          />
          <label className="form-check-label yes-employe me-5">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            onChange={() => setShowPresent(false)}
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
              className="year mb-3"
            >
              <Form.Control
                type="number"
                className="number-input"
                placeholder="Enter Experience"
                name="expYear"
                value={formData.expYear}
                onChange={handleInputChange}
              required />
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
                type="number"
                className="month"
                placeholder="Enter Experience"
                name="expMonth"
              value={formData.expMonth}
              onChange={handleInputChange}
              required />
            </FloatingLabel>
          </FormGroup>
        </Row>
        <Row>
        <FormGroup as={Col} md='6'>
          <FloatingLabel 
            controlId="floatingInput"
            label={showPresent? "Current Company Name" :"Company Name"}
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Current Company Name"
              name="currentCompanyName"
              value={formData.currentCompanyName}
              onChange={handleInputChange}
           required />
          </FloatingLabel>
        </FormGroup>
       
        <FormGroup as={Col} md='6'>
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
            required />
          </FloatingLabel>
        </FormGroup>
        </Row>
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
        <div className='row align-items-center'>
  <FormGroup as={Col} xs="12" md="4" className='mt-2'>
    <Form.Control
      type="date"
      id="startDate"
      name="startDate"
      value={formData.startDate}
      onChange={handleInputChange}
      required
    />
  </FormGroup>
  <p className='mt-3 me-3 ms-3 col-auto'>To</p>
  {showPresent ? (
    <p className='mt-3 me-3 col-auto'>Present</p>
  ) : (
    <FormGroup as={Col} xs="12" md="4" className='mt-2'>
      <Form.Control
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
  )}
</div>

       
        <Button type="submit" className="skill-add-button mt-3">Add</Button>
      </Form>
    </div>
  );
}

export default Employment;
