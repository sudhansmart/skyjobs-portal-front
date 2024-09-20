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



function PostJob({setModalShow}) {
  const navigate = useNavigate();
  
  
  const schema = yup.object().shape({
    jobtitle: yup.string().required('Job Title is required'),
    companyName: yup.string().required('Company Name is required'),
    jobtype : yup.string().required('Job Type is required'),
    category : yup.string().required('Category is required'),
    gender : yup.string().required('Gender is required'),
    companyprofile : yup.string().required('Company Profile  is required'),
    jobdescription : yup.string().required('Job Description is required'),
    experience : yup.string().required(' Experience is required'),
    salary : yup.string().required('Salary is required'),
    location: yup.string().required('Location is required'),
    qualification : yup.string().required('Qualification is required'),
    workmode : yup.string().required('Work mode is required'),
    noticePeriod : yup.string().required('Notice Period is required'),
    recruiterName : yup.string().required('Recruiter Name  is required'),
    phoneNumber: yup.string().required('Mobile No is required'),
    recruiterEmail: yup.string().required('Email is required'),
    primarySkills: yup.string().required('Skills is required'),  
  });


 
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Form Data:", values); // Output form data as an object
  
      const formData = values;
      const response = await axios.post('https://www.skylarkjobs.com/nodejs/job/upload', formData);
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        resetForm(); // Reset the form without any arguments
        alert("Your Data is Saved Successfully!!");
        navigate('/');
      } else {
        alert(" server is busy. Please try again later.");
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
        jobtitle: '',
        companyName : '',
        jobtype:'',
        category:'',
        gender:'',
        companyprofile:'',
        jobdescription:'',
        experience : '',
        salary:'',
        location: '',
        qualification:'',
        workmode:'',
        noticePeriod:'',
        recruiterName:'',
        phoneNumber: '',
        recruiterEmail:'',
        primarySkills:'',

 
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors  }) => (
        <Form noValidate onSubmit={handleSubmit} className="applicant-form p-5">
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik01">
              <Form.Label>Job Title  </Form.Label>
              <Form.Control
                type="text"
                name="jobtitle"
                value={values.jobtitle}
                onChange={handleChange}
                isValid={touched.jobtitle && !errors.jobtitle}
                isInvalid={touched.jobtitle && !!errors.jobtitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobtitle}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                isValid={touched.companyName && !errors.companyName}
                isInvalid={touched.companyName && !!errors.companyName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.companyName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationFormik03">
                <Form.Label>Job Type</Form.Label>
                  <Form.Select
                     value={values.jobtype || 'Please Select'} // Use the 'value' prop for default value
                         name='jobtype'
                    onChange={handleChange}
                  isValid={touched.jobtype && !errors.jobtype}
                   isInvalid={touched.jobtype && !!errors.jobtype}
                   aria-label="select Here"
            >
                <option value="" >Please Select</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                 <option value="Remote">Remote</option>
                  </Form.Select>
          <Form.Control.Feedback type="invalid">
                  {errors.jobtype}
             </Form.Control.Feedback>
         </Form.Group>
         <Form.Group as={Col} md="2" controlId="validationFormik04">
                <Form.Label>Category</Form.Label>
                  <Form.Select
                     value={values.category || 'Please Select'} // Use the 'value' prop for default value
                         name='category'
                    onChange={handleChange}
                  isValid={touched.category && !errors.category}
                   isInvalid={touched.category && !!errors.category}
                   aria-label="select Here"
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
          <Form.Control.Feedback type="invalid">
                  {errors.category}
             </Form.Control.Feedback>
         </Form.Group>
         <Form.Group as={Col} md="2" controlId="validationFormik05">
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
                    <option value="Both">Both</option>
                    <option value="Male Only">Male Only</option>
                    <option value="Female Only">Female Only</option>
               </Form.Select>
              <Form.Control.Feedback type="invalid">
              {errors.gender}
              </Form.Control.Feedback>
         </Form.Group>     
          </Row>
          <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} md="6"  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Company Profile</Form.Label>
        <Form.Control as="textarea"
         name="companyprofile"
         value={values.companyprofile}
         onChange={handleChange} rows={5}
         isValid={touched.companyprofile && !errors.companyprofile}
         isInvalid={touched.companyprofile && !!errors.companyprofile} />
            <Form.Control.Feedback type="invalid">
               {errors.companyprofile}
             </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" as={Col} md="6"  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Job Description</Form.Label>
        <Form.Control as="textarea"
         name="jobdescription"
         value={values.jobdescription}
         onChange={handleChange} rows={5}
         isValid={touched.jobdescription && !errors.jobdescription}
               isInvalid={touched.jobdescription && !!errors.jobdescription} />
                <Form.Control.Feedback type="invalid">
               {errors.jobdescription}
             </Form.Control.Feedback>
      </Form.Group>
          
          
          </Row>
          <Row className="mb-3"> 
           <Form.Group as={Col} md="2" controlId="validationFormik06">
             <Form.Label> Experience</Form.Label>
             <Form.Control
               type="number"
               placeholder=""
               name="experience"
               value={values.experience}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.experience && !errors.experience}
               isInvalid={touched.experience && !!errors.experience}
             /> 
             <Form.Control.Feedback type="invalid">
               {errors.experience}
             </Form.Control.Feedback>
           </Form.Group>
          
           <Form.Group as={Col} md="2" controlId="validationFormik07">
             <Form.Label>Salary</Form.Label>
             <Form.Control
               type="number"
               placeholder="LPA"
               name="salary"
               value={values.salary}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.salary && !errors.salary}
               isInvalid={touched.salary && !!errors.salary}
             />
             <Form.Control.Feedback type="invalid">
               {errors.salary}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik08">
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
           <Form.Group as={Col} md="2" controlId="validationFormik09">
             <Form.Label>Qualification</Form.Label>
             <Form.Control
               type="text"
               placeholder=""
               name="qualification"
               value={values.qualification}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.qualification && !errors.qualification}
               isInvalid={touched.qualification && !!errors.qualification}
             />
             <Form.Control.Feedback type="invalid">
               {errors.qualification}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik03">
                <Form.Label>Work Mode</Form.Label>
                  <Form.Select
                     value={values.workmode || 'Please Select'} // Use the 'value' prop for default value
                         name='workmode'
                    onChange={handleChange}
                  isValid={touched.workmode && !errors.workmode}
                   isInvalid={touched.workmode && !!errors.workmode}
                   aria-label="select Here"
            >
                <option value="" >Please Select</option>
                <option value="Work From Office">WFO</option>
                <option value="Work From Home">WFH</option>
                 <option value="Hybrid">Hybrid</option>
                  </Form.Select>
          <Form.Control.Feedback type="invalid">
                  {errors.workmode}
             </Form.Control.Feedback>
         </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik10">
             <Form.Label>Notice Period</Form.Label>
               <Form.Select
                    value={values.noticePeriod || 'Please Select'} // Use the 'value' prop for default value
                        name='noticePeriod'
                      onChange={handleChange}
                      isValid={touched.noticePeriod && !errors.noticePeriod}
                      isInvalid={touched.noticePeriod && !!errors.noticePeriod}
                  aria-label="select Here"
                  >
                    <option value="" >Please Select</option>
                    <option value="Immediate Joiner">Immediate Joiner</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="45 Days">45 Days</option>
               </Form.Select>
              <Form.Control.Feedback type="invalid">
              {errors.noticePeriod}
              </Form.Control.Feedback>
         </Form.Group>
         </Row>
         <Row className='mb-3'>
         <Form.Group as={Col} md="2" controlId="validationFormik11">
             <Form.Label> Recruiter Name</Form.Label>
             <Form.Control
               type="text"
               placeholder=""
               name="recruiterName"
               value={values.recruiterName}
               onChange={handleChange}
               onBlur={(e) => {
                const { name, value } = e.target;
                handleChange({ target: { name, value: value.toUpperCase() } });
              }}
               isValid={touched.recruiterName && !errors.recruiterName}
               isInvalid={touched.recruiterName && !!errors.recruiterName}
             /> 
             <Form.Control.Feedback type="invalid">
               {errors.recruiterName}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group as={Col} md="2" controlId="validationFormik12">
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
            <Form.Group as={Col} md="3" controlId="validationFormik13">
              <Form.Label>Recruiter Email</Form.Label>
              <Form.Control
                type="email"
                name="recruiterEmail"
                value={values.recruiterEmail}
                onChange={handleChange}
                isValid={touched.recruiterEmail && !errors.recruiterEmail}
                isInvalid={touched.recruiterEmail && !!errors.recruiterEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.recruiterEmail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} md="5"  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Primary Skills</Form.Label>
        <Form.Control as="textarea"
         name="primarySkills"
         value={values.primarySkills}
         onChange={handleChange} rows={1}
         isValid={touched.primarySkills && !errors.primarySkills}
         isInvalid={touched.primarySkills && !!errors.primarySkills} />
         <Form.Control.Feedback type="invalid">
                {errors.primarySkills}
              </Form.Control.Feedback>
      </Form.Group>
          
         </Row>
         <div className='d-flex' style={{justifyContent:'space-evenly'}}>
           <Button variant="secondary" onClick={()=>setModalShow(false)} ><FontAwesomeIcon icon={faLeftLong} /> Back</Button>
           <Button type="submit">Submit</Button>
          </div>
        </Form>
      )}
     
    </Formik>
   
    </>
  );
}

export default PostJob;
