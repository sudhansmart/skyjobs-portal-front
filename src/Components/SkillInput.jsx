import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../Style/SkillInput.css';

function SkillInput({ handleCloseModal }) {
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch skills data when the component mounts
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
      setSkills(response.data.keySkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };

  const handleSkillSubmit = (event) => {
    event.preventDefault();
    if (skill.trim() !== '') {
      const lowercaseSkill = skill.trim().toLowerCase();
      if (editIndex !== null) {
        const updatedSkills = [...skills];
        updatedSkills[editIndex] = lowercaseSkill;
        setSkills(updatedSkills);
        setEditIndex(null);
      } else {
        setSkills([...skills, lowercaseSkill]);
      }
      setSkill('');
    }
  };

  const handleSkillEdit = (index) => {
    // Set the index of the skill being edited
    setEditIndex(index);
    // Set the skill text in the input field for editing
    setSkill(skills[index]);
  };

  const handleSkillRemove = (index) => {
    // Remove the skill at the specified index
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
    setEditIndex(null); // Reset editIndex
  };

  const handleFinalSubmit = async () => {
    try {
      // Send skills data to backend
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/skills/${authId}`, { skills });
      if (response.status === 201) {
        handleCloseModal(); // Close the modal or perform any other action
      } else {
        alert('Please try again later.'); // Alert if submission fails
      }
    } catch (error) {
      console.error('Error submitting skills:', error);
      alert('Error submitting skills. Please try again.');
    }
  };

  return (
    <div className="skill-input-container">
      <div className='m-3 text-center'>
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <span className="skill-text" onClick={() => handleSkillEdit(index)}>{skill}</span>
            <FontAwesomeIcon onClick={() => handleSkillRemove(index)} icon={faTimesCircle} />
          </div>
        ))}
      </div>
      <Form onSubmit={handleSkillSubmit} className="skill-input-form">
        <Form.Group as={Col} md="12" controlId="exampleForm.ControlInput1" className="skill-input-field">
          <Form.Control
            type="text"
            placeholder="Enter Skill"
            value={skill}
            onChange={handleSkillChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="skill-add-button mt-3">
          {editIndex !== null ? 'Save' : 'Add'}
        </Button>
      </Form>
      {skills.length >= 3 && (
        <Button variant="success" onClick={handleFinalSubmit} className="mt-3 float-end">
          Submit Skills
        </Button>
      )}
    </div>
  );
}

export default SkillInput;
