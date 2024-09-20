import { faChevronRight, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState}from 'react';
import {Navbar, Image } from 'react-bootstrap'
import logo from '../assets/Images/skylarklogo1.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/adminLogin.css'

const AdminLogin = ({setRole,setAdminToken,setAdminloggedin,setUserloggedin}) => {
    const [formData, setFormData] = useState({
        userId :'',
        password :''
    });
    const navigate = useNavigate();
   const handleChange = (e)=>{
    const{name , value} = e.target ;
    setFormData((prevState)=>({
        ...prevState,[name]:value
    }))
   };

   const handleSubmit = async(e)=>{
    e.preventDefault();
   try {
    const response = await axios.post("https://www.skylarkjobs.com/nodejs/admin/login",formData);
        localStorage.setItem('adauthToken', response.data.token);
        setAdminToken(response.data.token)
       

    if (response.status ==200){
      alert("Login Sucessful")
      navigate('/'); 
     
    }
    else if(response.status ==201){
      alert(response.data)
    }
    else if(response.status ==202){
      alert(response.data)
    }
   } catch (error) {
      console.log("Error found in Login :",error.message)
   }
   }
  return (
    <div className='loginPage'>
    <div className="login-container">
      <div className="screen">
        <div className="screen__content">
        <div className="social-login">
          <Navbar.Brand href="#home">
            <Image  src={logo} className='admin-logo'/></Navbar.Brand>
          </div>
          <form onSubmit={handleSubmit} className="login">
            <div className="login__field">
              <FontAwesomeIcon className='login__icon' icon={faUser}/>
              <input type="text" 
                name='userId' 
                value={formData.userId} 
               onChange={handleChange} 
               className="login__input"
                placeholder="User id"
                required />
            </div>
            <div className="login__field">
            <FontAwesomeIcon  className='login__icon' icon={faKey}/>
              <input type="password"
              name='password' 
              value={formData.password} 
              required
             onChange={handleChange} 
              className="login__input" placeholder="Password" />
            </div>
            <button type='submit' className="button login__submit">
              <span className="button__text">Log In Now</span>
              
              <FontAwesomeIcon className="button__icon" icon={faChevronRight}/>
            </button>
          </form>
          
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
