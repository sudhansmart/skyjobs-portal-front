import React,{useState,useEffect} from 'react'
import { Form ,FloatingLabel,Col,FormGroup, Row,Button} from 'react-bootstrap'
import axios from 'axios';

function Personaldata({handleCloseModal,fetchData}) {
    const [authId, setAuthId] = useState(localStorage.getItem('authId'));
    const [profile, setProfile] = useState({
        preferredLocation: '',
        gender: '',
        industry:' ',
        dob:''
        
      });

      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
         
          setProfile(response.data); 
        } catch (error) {
          console.log("Error occurred in Profile Details fetching :", error.message);
        }
      }
    
      
      useEffect(() => {
        fetchProfileData();
      }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Personal data",profile)
        try {
          // Update profile data on the server
          const response = await axios.put(`https://www.skylarkjobs.com/nodejs/profile/update/${authId}`, profile);
          console.log("Profile Details Updated Successfully!");
          if(response.status == 200){
          fetchData();
          handleCloseModal();
      
           } else if(response.status == 404){
               alert("Please Try after Sometimes")
           }
        } catch (error) {
          console.log("Error occurred in Profile Details update:", error.message);
        }
      };
    
  return (
    <div>
         <Form onSubmit={handleSubmit}>
      <FloatingLabel
        controlId="floatingInput"
        label="preferred Location"
        className="mb-3"
      >
        <Form.Control  type="text" className=' mt-3'
         onChange={handleOnChange} name='preferredLocation' value={profile.preferredLocation} required />
      </FloatingLabel>
      <Row>
      <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>Gender</Form.Label>
      <Form.Select aria-label="Default select example"
      
          onChange={handleOnChange} name='gender' value={profile.gender} required
            >
      <option>Please Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </Form.Select>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>Industry</Form.Label>
                  <Form.Select
                     value={profile.industry || 'Please Select'} 
                         name='industry'
                    onChange={handleOnChange}
                
                   aria-label="select Here"
            >
                <option  >Please Select</option>
                <option value="IT">IT</option>
                <option value="Bpo">BPO</option>
                 <option value="salesMarketing">sales & Marketing</option>
                 <option value="Customerservice" >Customer service</option>
                <option value="Account">Account</option>
                <option value="DigitalMarketing">Digital Marketing</option>
                 <option value="Healthcare">Health care</option>
                 <option value="Manufacturing" >Manufacturing</option>
                <option value="Skinclinic">Skin clinic</option>
                <option value="HumanResource">Human Resource</option>
                 <option value="Operation">Operation</option>
                 <option value="Miscellaneous" >Miscellaneous</option>
                
                  </Form.Select>
                  </Form.Group>
                  <FormGroup  as={Col} md="4" >
                  <Form.Label>Date of Birth </Form.Label><br/>
                  <Form.Control
                      type="date"
                      id="datePicker"
                      name = 'dob'
                       value={profile.dob ? profile.dob.split('T')[0] : ''}
                     
                      onChange={handleOnChange}
                    />
               </FormGroup> 
               </Row>
      
      
       
        <Button type="submit" className='text-center mt-3'>Save Changes</Button>
      </Form>
    </div>
  )
}

export default Personaldata