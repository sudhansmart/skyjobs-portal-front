import React, { useState } from 'react';
import "../Style/Logins.css";
import axios from 'axios';
import OtpScreen from './OtpScreen';
import { useNavigate } from 'react-router-dom';
import MobileLogin from './MobileLogin';

const Logins = ({setUserloggedin,setToken}) => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showSignupmessage,setShowSignupmessage] = useState(false);
  const [showLoginmessage,setShowLoginmessage] = useState(false);
  const[showOtp,setshowOtp] = useState(false);
  const [otpError,setOtpError] = useState(false);
  const [signUpFeedback,setSignUpFeedback] = useState(" ");
  const [loginFeedback,setLoginFeedback] = useState(" ");

    const [loginFormData, setLoginFormData]=useState({
        email:'',
    });

    const [signUpFormData, setSignUpFormData]=useState({
      name:'',
      email:'',
  });
    const[errors, setErrors]=useState({
         email:'',
        server:'',
    });
     const navigate = useNavigate();


    const validEmail = (email) => {
        // Basic email validation pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };



    const handleLogin = async (e) => {
      e.preventDefault();
        const useridValid = validEmail(loginFormData.email);
        setErrors({
            email: useridValid ? '' : 'Please enter a valid email',
            server: '',
        });
        try {
          if (useridValid ) {
            const response = await axios.post('https://www.skylarkjobs.com/nodejs/login/verify',loginFormData)
              if(response.data == true){
                setshowOtp(true);
              }
              else if(response.data == false ){
                setShowLoginmessage(true);
                setLoginFeedback("User Does not Exists.please Signup");
              }
          }
          
        } catch (error) {
          console.log("Error occured in login : ",error.message)
        }

       
    };

    const handleloginOnChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
      
    };

    const handleSignUpOnChange = (e) => {
      const { name, value } = e.target;
      setSignUpFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
      }));
  };

  // signup API
    const handleSignUp = async(e) => {
    e.preventDefault();
      const useridValid = validEmail(signUpFormData.email);
      setErrors({
          email: useridValid ? '' : 'Please enter a valid email',
          server: '',
      });

      if (useridValid) {
           const response = await axios.post('https://www.skylarkjobs.com/nodejs/signup/verify',signUpFormData)
           setShowSignupmessage(true);
          if(response.data == true ){
            setSignUpFeedback("Registration Successfull.Please Login");
          }
          else if(response.data == false ){
            setSignUpFeedback("User already Exists.please login with your registered email");
          }
           


          setSignUpFormData ({
            name:'',
            email:'',
        })
      }
  };
  const handleOtpVerification = async (data)=>{
          const sendData = {email:loginFormData.email,
          otp:data.otp}
         try {
          const response = await axios.post('https://www.skylarkjobs.com/nodejs/login/verifyotp',sendData);
     
          if(response.status == 200){
            setToken(response.data.token);
            localStorage.setItem('authToken',response.data.token);
            localStorage.setItem('authId',response.data.id);
              navigate('/');
              setUserloggedin(true)
              setLoginFormData ({
                email:'',
            })
          } else if(response.data == false){
            setOtpError(true)
        }
         } catch (error) {
          console.log("Error occured in otp verification", error)
         }
  }

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <div className='d-flex justify-content-center'>
   
       <div className={`containers-login mt-4 ${isSignUpActive ? 'right-panel-active' : ''}`}>
       {isSignUpActive?  <div className="sign-up-container">
       <h2 className='logintitle text-center mt-4' >Register</h2>
          <form className='mt-4 form-login' onSubmit={handleSignUp}>
            <input type="text" placeholder="Name" className='input-login mb-3' name='name' value={signUpFormData.name} onChange={handleSignUpOnChange} required />
            <input type="email" placeholder="Email" className='input-login'  name='email' value={signUpFormData.email.toLowerCase()} onChange={handleSignUpOnChange}  />
            {errors.email && <p className="error text-danger">{errors.email}</p>}
            <button className='button-login mt-3' type='submit'>Sign Up</button>
          </form>
         {showSignupmessage?<div className='feedback text-center mt-1'>{signUpFeedback}</div>:" "}
        </div>
        :  <div className="form-container sign-in-container">
            {showOtp?<h2 className='logintitle text-center mt-3' >OTP Verfication</h2>:<h2 className='logintitle text-center mt-5' >Login</h2> }
         {showOtp? <OtpScreen otpError={otpError} handleOtpVerification={handleOtpVerification}/>:<form className='mt-3 form-login' onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className='input-login mt-3'  onChange={handleloginOnChange}
                    name ='email'
                    value={loginFormData.email} />
                     {errors.email && <p className="error text-danger" >{errors.email}</p>}
            <button className='button-login mt-3' type='submit' >Login</button>
            {errors.server && <p className="error">{errors.server}</p>}
            {showLoginmessage?<div className='feedback text-center mt-5'>{loginFeedback}</div>:" "}
          </form>}
       
        </div>}
        <div className="overlay-container">
          <div className="overlay">
            <div className={`overlay-panel overlay-left`}>
              <h1 className='p-login' >Welcome Back!</h1>
              <p  className='p-login' >To keep connected with us, please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick} >Login</button>
            </div>
            <div className={`overlay-panel overlay-right `}>
              <h1 className='p-login' >Welcome!</h1>
              <p className='p2-login'  >your gateway to senior-level careers</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='showMobile-responsive'>
              <MobileLogin 
              loginFormData={loginFormData}
              signUpFormData={signUpFormData}
              handleloginOnChange={handleloginOnChange}
              handleSignUpOnChange={handleSignUpOnChange}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              signUpFeedback={signUpFeedback}
              loginFeedback={loginFeedback}
              showOtp={showOtp}
              otpError={otpError}
              handleOtpVerification={handleOtpVerification}
              
              />
             
      </div>
    </div>
  );
};

export default Logins;
