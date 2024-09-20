import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

function ProfileSummary({ handleCloseModal }) {
  const [authId] = useState(localStorage.getItem('authId'));
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  console.log("summary :",summary);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
      setSummary(response.data.profileSummary);
    } catch (error) {
      console.log("Error occurred while fetching profile data:", error.message);
    }
  };

  const handleSummaryChange = (event) => {
    const { value } = event.target;
    if (value.length <= 400) {
      setSummary(value);
      setError('');
    } else {
      setError('Profile summary cannot exceed 400 characters.');
    }
  };

  const handleSummarySubmit = async (event) => {
    event.preventDefault();
    if (summary.length > 400) {
      setError('Profile summary cannot exceed 400 characters.');
      return;
    }

    try {
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/summary/${authId}`, { summary });
      if (response.status === 201) {
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error sending profile summary:', error);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSummarySubmit}>
        <Form.Group className="mb-3" as={Col} md="12" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Profile Summary</Form.Label>
          <Form.Control
            as="textarea"
            name="summary"
            value={summary}
            onChange={handleSummaryChange}
            rows={10}
          />
          <Form.Text muted>
            {!summary ? 0 : summary.length}/400 characters
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProfileSummary;
