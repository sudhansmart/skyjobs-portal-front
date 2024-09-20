import { useState, useEffect } from 'react';
import React from 'react';
import '../Style/StepFormNew.css';
import page1 from '../assets/Images/page1.png';
import page2 from '../assets/Images/page2.png';
import page3 from '../assets/Images/page3.png';
import page4 from '../assets/Images/page4.png';
import ProcessBar from './ProcessBar';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import Employment from './Employment';
import Education from './Education';
import AddLanguage from './AddLanguage';
import axios from 'axios';
import SkillInput from './SkillInput';

function StepFormNew({ handleClose }) {
  const [page, setPage] = useState(parseInt(localStorage.getItem('currentPage')) || 0);
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    phonenumber: '',
    experience: '',
    industry: '',
    currentctc: '',
    noticeperiod: ''
  });

  const getImageSource = (pageNumber) => {
    switch (pageNumber) {
      case 0:
        return page1;
      case 1:
        return page2;
      case 2:
        return page3;
      case 3:
        return page4;
      case 4:
        return page4;
      default:
        return page1;
    }
  };

  const fetchData = async () => {
    try {
      if (authId) {
        const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
        setFormData(response.data);
      }
    } catch (error) {
      console.log("Error occurred in Profile Details fetching :", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/update/${authId}`, formData);

      if (response.status === 200) {
        fetchData();
        setPage(page + 1);
      }
    } catch (error) {
      console.log("Error occurred in stepform profile:", error.message);
    }
  };

  const handleCloseModal = () => {
    setPage(page + 1);
  };

  return (
    <div className='stepnew-main'>
      <div className='lefthalf'>
        <ProcessBar page={page} />
        <img className='left-imge' src={getImageSource(page)} alt='education-icon' />
      </div>
      <div className='righthalf'>
        {page === 0 && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Job Title"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    onChange={handleOnChange}
                    name='role'
                    value={formData.role || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Location"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    onChange={handleOnChange}
                    name='location'
                    value={formData.location || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    className="number-input"
                    onChange={handleOnChange}
                    name='phonenumber'
                    value={formData.phonenumber || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Experience"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Experience"
                    className="number-input"
                    onChange={handleOnChange}
                    name='experience'
                    value={formData.experience || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Current CTC in LPA"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Current CTC"
                    className="number-input"
                    onChange={handleOnChange}
                    name='currentctc'
                    value={formData.currentctc || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Notice Period"
                  className="color-text mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Notice Period"
                    className="number-input"
                    onChange={handleOnChange}
                    name='noticeperiod'
                    value={formData.noticeperiod || ""}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="color-text">Industry</Form.Label>
                <Form.Select
                  onChange={handleOnChange}
                  name="industry"
                  value={formData.industry || ''}
                  required
                  aria-label="Select Here"
                >
                  <option value="" disabled>Please Select</option>
                  <option value="IT">IT</option>
                  <option value="BPO">BPO</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Skin Clinic">Skin Clinic</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='justify-content-start mt-3'>
              <Col md='auto'>
                <Button type='submit'>Submit</Button>
              </Col>
            </Row>
          </Form>
        )}
        {page === 1 && (
          <div className='right-form'>
            <Education handleCloseModal={handleCloseModal} setPage={setPage} page={page} />
          </div>
        )}
        {page === 2 && (
          <div className='right-form'>
            <Employment handleCloseModal={handleCloseModal} setPage={setPage} page={page} />
          </div>
        )}
        {page === 3 && (
          <div className='right-form'>
            <SkillInput handleCloseModal={handleCloseModal} />
            <p className='text-danger float-end mt-3'>
              Note: Your profile will be filtered by key skills, so please add them one by one. Add at least 3 skills.
            </p>
          </div>
        )}
        {page === 4 && (
          <div className='right-form'>
            <AddLanguage handleCloseModal={handleCloseModal} setPage={setPage} page={page} handleClose={handleClose} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StepFormNew;
