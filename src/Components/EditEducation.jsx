import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';


const EditEducation = ({ handleCloseModal, education_id }) => {
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [education, setEducation] = useState({
    qualification: '',
    collegeName: '',
    startyear: '',
    passedout: '',
    degree: '',
  });

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
      const existingEducation = response.data.education.find(edu => edu._id === education_id);

      setEducation(existingEducation);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/education/${authId}/${education_id}`, education);
     

      if (response.status === 200) {
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error submitting education data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId='qualification' label='Select Education' className='mb-3 mt-4'>
          <Form.Select
            className='form-select'
            aria-label='Default select example'
            onChange={handleChange}
            value={education.qualification}
            name='qualification'
            required
          >
            <option value='PG'>Master/Post-Graduation</option>
            <option value='UG'>Graduation/Diploma</option>
            <option value='school'>School</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId='collegeName' label='University/School' className='mb-3 mt-2'>
          <Form.Control
            type='text'
            placeholder='Enter University/Institute'
            onChange={handleChange}
            value={education.collegeName}
            name='collegeName'
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId='degree' label='Degree/School' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Enter Course'
            onChange={handleChange}
            value={education.degree}
            name='degree'
            required
          />
        </FloatingLabel>

        <Row>
          <Col md='6'>
            <FloatingLabel controlId='startyear' label='Start Year' className='mb-3'>
              <Form.Control
                type='number'
                className="number-input"
                placeholder='Enter Year of Starting'
                onChange={handleChange}
                value={education.startyear}
                name='startyear'
                required
              />
            </FloatingLabel>
          </Col>

          <Col md='6'>
            <FloatingLabel controlId='passedout' label='Passed Out Year' className='mb-3'>
              <Form.Control
                type='number'
                className="number-input"
                placeholder='Enter Year of Passing'
                onChange={handleChange}
                value={education.passedout}
                name='passedout'
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditEducation;
