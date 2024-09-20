import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import navlogo from "../assets/Images/skylarklogo1.png";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const Navbar = ({ token, userloggedin }) => {
  const [authId, setAuthId] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [show, setShow] = useState(false);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${id}`);
      setProfileData(response.data);
    } catch (error) {
      console.log("Error occurred while fetching profile data:", error.message);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('authId');
    setAuthId(id);
  }, [userloggedin]);

  useEffect(() => {
    if (authId) {
      fetchData(authId);
    }
  }, [authId]);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='nav-main'>
        <Link to="/" className='title ms-5'>
          <img className='navicon' src={navlogo} alt="Skylark Logo" />
        </Link>
        <Button variant="primary" onClick={handleShow} className="d-md-none me-3">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className='close d-none d-md-flex justify-content-around'>
          <NavLink className="bglink" to="/">Home</NavLink>
          <NavLink className="bglink" to="/jobs">Jobs</NavLink>
          <NavLink className="bglink" to="/contact">Contact</NavLink>
        </div>
        {token ? (
          <Dropdown className="d-none d-md-block">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser} /> Hi!, {profileData.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">Profile Details</Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleSignOut}>Sign-out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="d-none d-md-block">
            <Link to="/adminlog">
              <Button className='btns'>Employer Login</Button>
            </Link>
            <Link to="/logs">
              <Button className='btns me-5'>Candidate Login</Button>
            </Link>
          </div>
        )}
      </div>

      <Offcanvas show={show} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas'>
          <NavLink className="bglink" to="/" onClick={handleClose}>Home</NavLink>
          <NavLink className="bglink" to="/jobs" onClick={handleClose}>Jobs</NavLink>
          <NavLink className="bglink" to="/contact" onClick={handleClose}>Contact</NavLink>
          {token ? (
            <>
              <NavLink className="bglink" to="/profile" onClick={handleClose}>Profile Details</NavLink>
              <Button variant="link text-decoration-none" onClick={() => { handleSignOut(); handleClose(); }}><FontAwesomeIcon icon={faRightFromBracket} /> Sign-out</Button>
            </>
          ) : (
            <div className='mob-nav d-flex justify-content-center'>
              <Link to="/adminlog" onClick={handleClose}>
                <Button className='btns'>Employer Login</Button>
              </Link>
              <Link to="/logs" onClick={handleClose}>
                <Button className='btns me-5'>Candidate Login</Button>
              </Link>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
