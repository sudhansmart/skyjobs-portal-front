import React,{useState,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



function UploadForm({setCandiShow}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    phoneNumber: yup.string().required('Mobile No is required'),
    location: yup.string().required('Location is required'),
    qualification : yup.string().required('Qualification is required'),
    dob: yup.string().required('DOB is required'),
    preferredLocation : yup.string().required('Preferred Location is required'),
    currentCompany : yup.string().required('Current Company is required'),
    overAllExp : yup.string().required('Over ALL Experience is required'),
    relevantExp : yup.string().required('Relevant Experience is required'),
    currentCtc : yup.string().required('Current CTC is required'),
    expectedCtc : yup.string().required('Expected CTC is required'),
    noticePeriod : yup.string().required('Notice Period is required'),
    gender : yup.string().required('Gender is required'),
  });
 
  const handleSubmit = async (values, { resetForm }) => {
    try {
  
      const formData = new FormData();
  
      Object.keys(values).forEach((key) => {
        if (key !== 'file') {
          formData.append(key, values[key]);
        }
      });

      formData.append('file', values.file);
  
   
  
      const response = await axios.post('https://www.skylarkjobs.com/nodejs/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
   if(response.status == 200){
     
      fileInputRef.current.value = '';
      // Reset the form without any arguments
      resetForm();
      alert("Your Data is Saved Successfully!!");
      setCandiShow(false)
    }else{
      alert("Our server is busy.Please try after sometimes ");
    }
    } catch (error) {
      console.error('App.Form API Error:', error);
    }
  };
  

 

  return (
    <>
   
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
      initialValues={{
        name: '',
        email : '',
        phoneNumber: '',
        location: '',
        qualification : '',
        dob: '',
        preferredLocation:'',
        currentCompany:'',
        overAllExp : '',
        relevantExp:'',
        currentCtc:'',
        expectedCtc:'',
        noticePeriod:'',
        gender:'',
        skills:'',
        file: null,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors,setFieldValue  }) => (
        <Form noValidate onSubmit={handleSubmit} className="applicant-form p-5">
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik03">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={touched.phoneNumber && !errors.phoneNumber}
                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="location"
                value={values.location}
                onChange={handleChange}
                isValid={touched.location && !errors.location}
                isInvalid={touched.location && !!errors.location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik07">
              <Form.Label>Preferred Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="preferredLocation"
                value={values.preferredLocation}
                onChange={handleChange}
                isValid={touched.preferredLocation && !errors.preferredLocation}
                isInvalid={touched.preferredLocation && !!errors.preferredLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferredLocation}
              </Form.Control.Feedback>
            </Form.Group>
  
          </Row>
          <Row className="mb-3">
           
           <Form.Group as={Col} md="2" controlId="validationFormik09">
             <Form.Label>Over All Experience</Form.Label>
             <Form.Control
               type="text"
               placeholder=""
               name="overAllExp"
               value={values.overAllExp}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.overAllExp && !errors.overAllExp}
               isInvalid={touched.overAllExp && !!errors.overAllExp}
             /> 
             <Form.Control.Feedback type="invalid">
               {errors.overAllExp}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik11">
             <Form.Label>Current CTC</Form.Label>
             <Form.Control
               type="text"
               placeholder=""
               name="currentCtc"
               value={values.currentCtc}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.currentCtc && !errors.currentCtc}
               isInvalid={touched.currentCtc && !!errors.currentCtc}
             />
             <Form.Control.Feedback type="invalid">
               {errors.currentCtc}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik13">
             <Form.Label>Notice Period</Form.Label>
             <Form.Control
               type="text"
               placeholder=""
               name="noticePeriod"
               value={values.noticePeriod}
              onChange={handleChange}
               isValid={touched.noticePeriod && !errors.noticePeriod}
               isInvalid={touched.noticePeriod && !!errors.noticePeriod}
             />
             <Form.Control.Feedback type="invalid">
               {errors.noticePeriod}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik13">
  <Form.Label>Gender</Form.Label>
  <Form.Select
    value={values.gender || 'Please Select'} // Use the 'value' prop for default value
    name='gender'
    onChange={handleChange}
    isValid={touched.gender && !errors.gender}
    isInvalid={touched.gender && !!errors.gender}
    aria-label="select Here"
  >
    <option value="" >Please Select</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    {errors.gender}
  </Form.Control.Feedback>
</Form.Group>
         </Row>
         <Row>
         <Form.Group controlId="formFile" as={Col} md="4" className="mb-3">
            <Form.Label>Upload CV</Form.Label>
              <Form.Control type="file" 
              onChange={(e) => setFieldValue('file', e.target.files[0])}
              accept=".pdf, .doc, .docx" 
              ref={fileInputRef} className='mt-3'/>
      </Form.Group>

         </Row>
         <div className='d-flex' style={{justifyContent:'space-evenly'}}>
           <Button variant="secondary" onClick={()=>setCandiShow(false)} ><FontAwesomeIcon icon={faLeftLong} /> Back</Button>
           <Button type="submit">Submit</Button>
          </div>
        </Form>
      )}
     
    </Formik>
   
    </>
  );
}

export default UploadForm;
