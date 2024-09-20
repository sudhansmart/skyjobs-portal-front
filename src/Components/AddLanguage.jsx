import axios from 'axios';
import React, { useState } from 'react';
import { FloatingLabel, Form,Col, Row,Button } from 'react-bootstrap';

const AddLanguage = ({handleCloseModal,setPage,page,handleClose}) => {
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [data, setData] = useState({
    language: '',
    proficiency: 'Beginner',
    readChecked: false,
    writeChecked: false,
    speakChecked: false
  });

  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddLanguage = async () => {
    if (data.language.trim() === '') return;
    const newLanguage = {
      language: data.language,
      proficiency: data.proficiency,
      read: data.readChecked,
      write: data.writeChecked,
      speak: data.speakChecked
    };

    const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/language/${authId}`, newLanguage);
    console.log("response :",response.data);
    setData({
      language: '',
      proficiency: 'Beginner',
      readChecked: false,
      writeChecked: false,
      speakChecked: false
    });
    handleCloseModal();
    handleClose();
    setPage(page+1)
  };

  return (
    <div>
      <div>
        <FloatingLabel controlId="floatingInput" label="Language" className="mb-3">
          <Form.Control type="text" className=' mt-3' onChange={handleOnChange} name='language' value={data.language} required />
        </FloatingLabel>
      </div>
      <Row>
      <div>
      <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>Proficiency: </Form.Label>
      <Form.Select aria-label="Default select example"
      
            name='proficiency' value={data.proficiency} onChange={handleOnChange}
            >
             <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
    </Form.Select>
    </Form.Group>
      </div>
      <div className='mt-3'>
        <label >
          Read:
          <input
          className='ms-2'
            name='readChecked'
            type="checkbox"
            checked={data.readChecked}
            onChange={handleOnChange}
          />
        </label>
        <label className='ms-5'>
          Write:
          <input   className='ms-2'
            name='writeChecked'
            type="checkbox"
            checked={data.writeChecked}
            onChange={handleOnChange}
          />
        </label>
        <label className='ms-5'>
          Speak:
          <input  className='ms-2'
            name='speakChecked'
            type="checkbox"
            checked={data.speakChecked}
            onChange={handleOnChange}
          />
        </label>
      </div>
      </Row>
      <Button className='mt-3' onClick={handleAddLanguage}>Add Language</Button>
    </div>
  );
};

export default AddLanguage;
