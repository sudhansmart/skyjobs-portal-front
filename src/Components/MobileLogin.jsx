import React, { useState } from 'react';
import '../Style/mobileLogin.css';
import OtpScreen from './OtpScreen';

const MobileLogin = ({loginFormData,signUpFormData,handleloginOnChange,handleSignUpOnChange,handleLogin,handleSignUp,
    signUpFeedback,loginFeedback,showOtp,otpError,handleOtpVerification
}) => {
  const [activeTab, setActiveTab] = useState('signup');
 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="form-wrap">
      <div className="tabs">
        <h3 className="signup-tab">
          <a
            className={activeTab === 'signup' ? 'active' : ''}
            href="#signup-tab-content"
            onClick={(e) => { e.preventDefault(); handleTabClick('signup'); }}
          >
            Sign Up
          </a>
        </h3>
        <h3 className="login-tab">
          <a
            className={activeTab === 'login' ? 'active' : ''}
            href="#login-tab-content"
            onClick={(e) => { e.preventDefault(); handleTabClick('login'); }}
          >
            Login
          </a>
        </h3>
      </div>

      <div className="tabs-content">
        <div id="signup-tab-content" className={activeTab === 'signup' ? 'active' : ''}>
          <form className="signup-form" method="post" onSubmit={handleSignUp}>
          <input
              type="text"
              className="input"
              name="name"
              placeholder="Name"
              value={signUpFormData.name}
              onChange={handleSignUpOnChange}
              required
            />
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              value={signUpFormData.email}
              onChange={handleSignUpOnChange}
              required
            />
            <input type="submit" className="button" value="Sign Up" />
          </form>
          <div className="help-text">
            <p>{signUpFeedback}</p>
            
          </div>
        </div>

        <div id="login-tab-content" className={activeTab === 'login' ? 'active' : ''}>
       {showOtp?<OtpScreen otpError={otpError} handleOtpVerification={handleOtpVerification}/> :
        <form className="login-form" method="post" onSubmit={handleLogin}>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              value={loginFormData.email}
              onChange={handleloginOnChange}
              required
            />
        
            <input type="submit" className="button" value="Get OTP" />
          </form>}
         
        </div>
      </div>
    </div>
  );
};

export default MobileLogin;
