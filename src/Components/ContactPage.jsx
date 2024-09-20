import React,{useState} from 'react'
import '../Style/ContactPage.css'
import navlogo from "../assets/Images/skylarklogo1.png";
import { Helmet } from 'react-helmet';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
const ContactPage = () => {
    const [validated, setValidated] = useState(false);

  const handlesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [contact, setContact]=useState({
    email:'',
    phoneNumber:'',
    firstname:'',
    message:'',
  });
  const [errors, setErrors]=useState({
    phoneNumber:'',
    email:'',
    server:'',
  });

  const validEmails = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const validMobileno = (phoneNumber) => {
    const mobilenoPattern = /^\d{10}$/;
    return mobilenoPattern.test(phoneNumber);
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    const emailIdvalid = validEmails(contact.email);
    const mobilelenovalid = validMobileno(contact.phoneNumber);
    console.log('number :',contact.phoneNumber)

    setErrors({
      email: emailIdvalid ? '' : 'Please enter a valid email',
      mobileno: mobilelenovalid ? '' : 'Mobileno must be at least 10 numbers',
      server: '',
    });
    if (emailIdvalid && mobilelenovalid) {
      console.log('sumbit successful:', contact);
      setContact({
        
        email:'',
        phoneNumber:'',
        firstname:'',
        message:'',
      })
    }}
    const handleSubmitOnChange = (e) => {

      const { name, value } = e.target;
      setContact((prevFromData) => ({
        ...prevFromData,
        [name]: value,
      }));
      console.log('number :',contact.phoneNumber)
      console.log('number :',contact.email)
    }
  return (
    
    <div>
       <Helmet>
        {/* Basic SEO meta tags */}
        <title>Skylarkjobs| Best HR Consultancy. Quick Hiring & Onboarding </title>
        <meta name="description" content="Skylarkjobs.com connects companies with top talent for hiring. Reach out to the best talent, hire faster, quick onboarding in no time. Connect with us Now!" />
        <meta name="keywords" content="hr solutions
                                   hr consultancy,
                                   recruitment agency,
                                   staffing solutions,
                                   hiring experts,
                                   Employer branding,
                                   Talent acquisition,
                                   employment agency,
                                   job branding,
                                   job agency" />
        <meta name="author" content="Skylarkjobs" />

        {/* Open Graph meta tags for Facebook */}
        <meta property="og:title" content="Skylarkjobs" />
        <meta property="og:description" content="Skylarkjobs.com connects companies with top talent for hiring. Reach out to the best talent, hire faster, quick onboarding in no time. Connect with us Now!" />
        <meta property="og:image" content={navlogo}/>
        <meta property="og:url" content="https://skylarkjobs.com" />
        <meta property="og:type" content="website" />

        {/* Instagram specific meta tags */}
        <meta property="og:site_name" content="Skykarkjobs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter card meta tags (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Skykarkjobs" />
        <meta name="twitter:title" content="Skykarkjobs" />
        <meta name="twitter:description" content="Skylarkjobs.com connects companies with top talent for hiring. Reach out to the best talent, hire faster, quick onboarding in no time. Connect with us Now!" />
        <meta name="twitter:image" content={navlogo}/>
      </Helmet>
        <div className='contact-welcome'>
            <p className='contact-help p-5'>Employer Help Center</p>
             <p className='contact-help-content mt-3'>How can we help today?</p>
        </div>
        <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-sm-8"> */}
            <div className="card mt-4">
            <div className="card-header">
              Contact Info
            </div>
            <div className="card-body ">
            
              
          
        
      <FloatingLabel
        controlId="floatingInput"
        label="Enter Name"
        className="mb-3"
        value={contact.firstname} name='firstname' onChange={handleSubmitOnChange}
      >
        
        <Form.Control type="text" placeholder="name@example.com" 
       />

       </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter Email"
        className="mb-3"
      >
        
        <Form.Control type="email" placeholder="name@example.com" 
         value={contact.email} name='email' onChange={handleSubmitOnChange}/>
      </FloatingLabel>

      {errors.email && <p className="error text-danger">{errors.email}</p>}

      <FloatingLabel
        controlId="floatingInput"
        label="Enter Mobile Number"
        className="mb-3"
      >    
        <Form.Control type="number"  value={contact.mobileno} name='phoneNumber' onChange={handleSubmitOnChange} placeholder="name@example.com" />
      </FloatingLabel>
      {errors.mobileno && <p className="error text-danger ">{errors.mobileno}</p>}
      <FloatingLabel
        controlId="floatingInput"
        label="Message"
        className="mb-3"
      >
        <Form.Control  as="textarea" rows={5} 
           value={contact.message} name='message' onChange={handleSubmitOnChange} />
      </FloatingLabel>
                <Link
                 to="/forms"><span> <button className='con-bu'  onClick={handleSubmit}>Send Enquiry</button> </span> </Link>
          </div>
          <div className="col-sm-4"><div className="card m-5" >
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <p className="card-text"><i className="bi bi-telephone-fill"></i>  +91 9884521114</p>
              <p className="card-text"><i className="bi bi-telephone-fill"></i>  +91 8610010780</p>
              <a className="card-text text-decoration-none" style={{cursor:"pointer"}}>    <i className="bi bi-envelope-check"></i> contact@skylarkhr.in</a>
              <h5 className="card-title">Social Network</h5>
              <a href="#" className="me-2"><i className="bi bi-whatsapp" id='whatsapps'></i></a>
              <a href="#" className="me-2"><i className="bi bi-facebook" id='facebook'></i></a>
              <a href="#" className="me-2"><i className="bi bi-instagram" id='instagram'></i></a>
              <i className="bi bi-linkedin" id='linkedin'></i>
            </div>
          
          </div></div>
        </div>
       
      </div>
     <Footer />
    </div>
  )
}

export default ContactPage