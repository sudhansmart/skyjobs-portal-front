import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../Style/filterUser.css';
import { Form, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

function FilterUser({data,setData,handleClose}) {
  const { category } = useParams();
  const [jobData, setJobData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.skylarkjobs.com/nodejs/job/getdata');
      const filteredData = response.data.filter(entry => entry.category === `${category}`);
      setData(filteredData);
      setJobData(filteredData);
      setOriginalData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [filter, setFilter] = useState({
    search: '',
    experience: '',
    location: '',
    workmode: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
 
  };

  useEffect(() => {
   
  }, [filter]);

  const filterJobData = () => {
    let filteredJobs = [...jobData];

    // Apply search term filter
    if (filter.search) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobtitle && job.jobtitle.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
     // Apply experience filter
     if (filter.experience) {
      filteredJobs = filteredJobs.filter((job) => {
        const experienceRange = filter.experience.split('-');
        const minExperience = parseInt(experienceRange[0]);
        const maxExperience = parseInt(experienceRange[1]);
        if (maxExperience === 5) {
          return job.experience >= minExperience && job.experience >= maxExperience;
        } else {
          return job.experience >= minExperience && job.experience <= maxExperience;
        }
      });
    }

     // Apply Location filter
     if (filter.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location && job.location.toLowerCase().includes(filter.location.toLowerCase())
      );
    }
     // Apply Workmode filter
     if (filter.workmode) {
      filteredJobs = filteredJobs.filter((job) =>
        job.workmode && job.workmode.toLowerCase().includes(filter.workmode.toLowerCase())
      );
    }

    return filteredJobs;
  };

  const handleApplyFilters = () => {
    const filteredData = filterJobData();
    setData(filteredData)
    handleClose();
  };

  const handleResetFilters = () => {
    setFilter({
      search: '',
      experience: '',
      location: '',
      workmode: ''
    });
    setData(originalData); 
    handleClose();
   
  };

  return (
    <div className='filteruser'>
      <Form>
        <Col xs='auto'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              type='text'
              placeholder='Search'
              className='mr-sm-2'
              name='search'
              value={filter.search}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicRange'>
            <Form.Label>Experience</Form.Label>
            <Form.Select
              value={filter.experience}
              name='experience'
              onChange={handleOnChange}
              aria-label='select Here'
            >
              <option value=''>Select</option>
              <option value='0-1'>0 - 1 Years</option>
              <option value='1-2'>1 - 2 Years</option>
              <option value='2-3'>2 - 3 Years</option>
              <option value='3-4'>3 - 4 Years</option>
              <option value='4-5'>4 - 5 Years</option>
              <option value='0-5'>5+ Years</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              className='mr-sm-2'
              name='location'
              value={filter.location}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicRange'>
            <Form.Label>Work Mode</Form.Label>
            <Form.Select
              value={filter.workmode}
              name='workmode'
              onChange={handleOnChange}
              aria-label='select Here'
            >
              <option value=''>Select</option>
              <option value='Work From Office'>WFO</option>
              <option value='Work From Home'>WFH</option>
              <option value='Hybrid'>Hybrid</option>
            </Form.Select>
          </Form.Group>
          </Col>
          <Col className='d-flex justify-content-around '>
          <Button variant="secondary" onClick={handleResetFilters}><FontAwesomeIcon icon={faRotateRight}/> Reset</Button>
          <Button variant="secondary" onClick={handleApplyFilters}>Apply Filters</Button>
         
        </Col>
      </Form>
    </div>
  );
}

export default FilterUser;
