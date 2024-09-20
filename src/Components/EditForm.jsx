import React,{useState,useEffect}from 'react'
import { Button,Col,Form,Row } from 'react-bootstrap'
import axios from 'axios';
function EditForm({ candidateId,handleClose,fetch }) {
    const [formDatas, setFormDatas] = useState({
        name: '',
        email: '',
        phonenumber: '',
        location: '',
        clientName: '',
        role: '',
        currentCompany: '',
        experience: '',
        currentctc: '',
        expectedctc: '',
        noticeperiod: '',
        remarks: '',
      });
      
    

      const fetchData = async () => {
        try {
          const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${candidateId}`);
          setFormDatas(response.data);
          // console.log("res :",response.data);
         
    
        } catch (error) {
          console.error('Error fetching candidate data:', error.message);
        }
      };
    
    
      useEffect(() => {
        fetchData();
      }, [fetch]);

    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      const handleEditSave = async (e)=>{
        e.preventDefault();
      
        try {
           
           const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/update/${candidateId}`
          // const response = await axios.put(`http://localhost:5000/profile/update/${candidateId}`
           , formDatas );
           if(response.status == 200){
               alert('Candidate data updated successfully!'); 
               handleClose()  
           }
                      
        } catch (error) {
            console.error('EDIT API Error:', error);
        }
      }

  return (
    <div>
        <Form onSubmit={handleEditSave}>
        <Row className="mb-3">
<Form.Group as={Col} md="3" controlId="validationFormik01">
  <Form.Label>Name</Form.Label>
  <Form.Control
    type="text"
    name="name"
    value={formDatas.name}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik02">
  <Form.Label>Email</Form.Label>
  <Form.Control
    type="email"
    name="email"
    value={formDatas.email}
    onChange={handleChange}

  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik03">
  <Form.Label>Mobile No</Form.Label>
  <Form.Control
    type="number"
    name="phonenumber"
    value={formDatas.phonenumber}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik04">
  <Form.Label>Location</Form.Label>
  <Form.Control
    type="text"
    placeholder="City"
    name="location"
    value={formDatas.location}
    onChange={handleChange}
  />
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group as={Col} md="3" controlId="validationFormik06">
  <Form.Label>Client Name</Form.Label>
  <Form.Control
    type="text"
    placeholder=""
    name="clientName"
    value={formDatas.clientName}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik07">
  <Form.Label>Position</Form.Label>
  <Form.Control
    type="text"
    placeholder=""
    name="role"
    value={formDatas.role}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik08">
  <Form.Label>Current Company</Form.Label>
  <Form.Control
    type="text"
    placeholder=""
    name="currentCompany"
    value={formDatas.currentCompany}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group as={Col} md="3" controlId="validationFormik09">
 <Form.Label>Over All Experience</Form.Label>
 <Form.Control
   type="number"
   placeholder=""
   name="experience"
   value={formDatas.experience}
   onChange={handleChange}
  
 /> 
</Form.Group>
</Row>
<Row className="mb-3">

<Form.Group as={Col} md="2" controlId="validationFormik11">
 <Form.Label>Current CTC</Form.Label>
 <Form.Control
   type="number"
   placeholder=""
   name="currentctc"
   value={formDatas.currentctc}
   onChange={handleChange}
  
 />
</Form.Group>
<Form.Group as={Col} md="2" controlId="validationFormik12">
 <Form.Label>Expected CTC</Form.Label>
 <Form.Control
   type="number"
   placeholder=""
   name="expectedctc"
   value={formDatas.expectedctc}
   onChange={handleChange}
   
 />

</Form.Group>
<Form.Group as={Col} md="2" controlId="validationFormik13">
 <Form.Label>Notice Period</Form.Label>
 <Form.Control
   type="number"
   placeholder=""
   name="noticeperiod"
   value={formDatas.noticeperiod}
  onChange={handleChange}
 />
</Form.Group>

</Row>
<Row>

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Label>Remarks</Form.Label>
<Form.Control as="textarea"
name="remarks"
value={formDatas.remarks}
onChange={handleChange} rows={2} />
</Form.Group>
</Row>
<div className='d-flex' style={{justifyContent:'space-evenly'}}>
           <Button variant="secondary"  onClick={()=>handleClose()}  >Close</Button>
           <Button type="submit">Save Changes</Button>
          </div>

        </Form>

    </div>
  )
}

export default EditForm;