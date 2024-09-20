import React,{useState,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import TableComponent from './TableComponent';



function ApplicantForm() {
  const fileInputRef = useRef(null);
  const[fetch,setFetch] = useState(false)
  
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    phoneNumber: yup.string().required('Mobile No is required'),
    location: yup.string().required('Location is required'),
    clientName: yup.string().required('Client Name is required'),
    role : yup.string().required('Position is required'),
    currentCompany : yup.string().required('Current Company is required'),
    overAllExp : yup.string().required('Over ALL Experience is required'),
    currentCtc : yup.string().required('Current CTC is required'),
    expectedCtc : yup.string().required('Expected CTC is required'),
    noticePeriod : yup.string().required('Notice Period is required'),
    skills : yup.string().required('skills is required'), 
  });
 
  const handleSubmit = async (values, { resetForm }) => {
    try {
        console.log("triggered")
  
      const formData = new FormData();
  
      formData.append('name', values.name);
      const skillsArray = values.skills.split(',').map(skill => skill.trim());
      skillsArray.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });
      formData.append('email', values.email.toLowerCase());
      formData.append('phonenumber', values.phoneNumber);
      formData.append('location', values.location);
      formData.append('clientName', values.clientName);
      formData.append('role', values.role);
      formData.append('currentCompany', values.currentCompany);
      formData.append('overAllExp', values.overAllExp);
      formData.append('currentCtc', values.currentCtc);
      formData.append('expectedCtc', values.expectedCtc);
      formData.append('noticePeriod', values.noticePeriod);
      formData.append('remarks', values.remarks);

      formData.append('file', values.file);
  
      const response = await axios.post('https://www.skylarkjobs.com/nodejs/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      fileInputRef.current.value = '';
     
      resetForm();
      alert(response.data.message);
      setFetch(true)
    } catch (error) {
      console.error('ApplicantForm API Error:', error);
    }
  };
  
 

 

  return (
    <>
   <Container className='mt-5'>
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
      initialValues={{
        name: '',
        email : '',
        phoneNumber: '',
        location: '',
        clientName: '',
        role:'',
        currentCompany:'',
        overAllExp : '',
        currentCtc:'',
        expectedCtc:'',
        noticePeriod:'',
        remarks:'',
        skills:'',
        file: null,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors,setFieldValue  }) => (
        <Form noValidate onSubmit={handleSubmit} className="applicant-form">
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
            <Form.Group as={Col} md="3" controlId="validationFormik06">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="clientName"
                value={values.clientName}
                onChange={handleChange}
                isValid={touched.clientName && !errors.clientName}
                isInvalid={touched.clientName && !!errors.clientName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.clientName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik07">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="role"
                value={values.role}
                onChange={handleChange}
                isValid={touched.role && !errors.role}
                isInvalid={touched.role && !!errors.role}
              />
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik08">
              <Form.Label>Current Company</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="currentCompany"
                value={values.currentCompany}
                onChange={handleChange}
                isValid={touched.currentCompany && !errors.currentCompany}
                isInvalid={touched.currentCompany && !!errors.currentCompany}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentCompany}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik09">
             <Form.Label>Over All Experience</Form.Label>
             <Form.Control
               type="number"
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
          </Row>
          <Row className="mb-3">
           <Form.Group as={Col} md="2" controlId="validationFormik11">
             <Form.Label>Current CTC</Form.Label>
             <Form.Control
               type="number"
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
           <Form.Group as={Col} md="2" controlId="validationFormik12">
             <Form.Label>Expected CTC</Form.Label>
             <Form.Control
               type="number"
               placeholder=""
               name="expectedCtc"
               value={values.expectedCtc}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.expectedCtc && !errors.expectedCtc}
               isInvalid={touched.expectedCtc && !!errors.expectedCtc}
             />
             <Form.Control.Feedback type="invalid">
               {errors.expectedCtc}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik13">
             <Form.Label>Notice Period (Days)</Form.Label>
             <Form.Control
               type="number"
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
           <Form.Group controlId="formFile" as={Col} md="3" className="mb-3">
            <Form.Label>Upload CV</Form.Label>
              <Form.Control type="file" 
              onChange={(e) => setFieldValue('file', e.target.files[0])}
              accept=".pdf, .doc, .docx" 
              ref={fileInputRef}/>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik13">
             <Form.Label>Skills</Form.Label>
             <Form.Control
               type="text"
               placeholder="Seperate by comma"
               name="skills"
               value={values.skills}
              onChange={handleChange}
               isValid={touched.skills && !errors.skills}
               isInvalid={touched.skills && !!errors.skills}
             />
             <Form.Control.Feedback type="invalid">
               {errors.skills}
             </Form.Control.Feedback>
           </Form.Group>
          
         </Row>
         <Row>
        
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Remarks</Form.Label>
        <Form.Control as="textarea"
         name="remarks"
         value={values.remarks}
         onChange={handleChange} rows={3} />
      </Form.Group>
         </Row>
         <div className='d-flex' style={{justifyContent:'space-evenly'}}>
           {/* <Button variant="secondary" onClick={handleReset} >Reset</Button> */}
           <Button type="submit">Submit</Button>
          </div>
        </Form>
      )}
     
    </Formik>
    </Container> 
      <div>
          <TableComponent fetch={fetch} setFetch={setFetch}/>
      </div>
   
    </>
  );
}

export default ApplicantForm;
