import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import navlogo from "../assets/Images/skylarklogo1.png"
import { Modal,Offcanvas } from 'react-bootstrap';
import "../Style/AdminNavbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook,  faHouse, faMagnifyingGlass, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import PostJob from './PostJob';
import UploadForm from './UploadForm';

 const AdminNavbar = ({adminToken}) => {
    const[menuOpen, setMenuOpen]=useState(false)
    const [modalShow, setModalShow] = useState(false);
       
    const handleClose = () => setMenuOpen(false);
    const handlepost=()=>{
      setModalShow(true);
      setMenuOpen(false)
    
    }

    const handleSignOut =()=>{
      console.log("signout")
      localStorage.clear();
      window.location.reload();

    }
  return (
    <div className='nav-main p-2 me-3'>
         <nav className='P-2'>
    <Link to="/" className='title ms-5'><img className='navicon' src={navlogo} alt='Company-Logo'/></Link>
    <div className='menu' onClick={()=> setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    <ul className="adclose">

  
        <li>
              <NavLink to="/">  <FontAwesomeIcon icon={faHouse} className='me-1'/>Home
           </NavLink>
            </li>
        <li>
        <NavLink to="/contact"><FontAwesomeIcon icon={faAddressBook} className='me-1' />Contact</NavLink>
        </li>
        <li>
        <NavLink to="/findcandidate"><FontAwesomeIcon icon={faMagnifyingGlass} className='me-1' />Find Candidates</NavLink>
        </li>
        <li>
        <NavLink  to="/addcandidate" className="btn btn-outline-primary"  style={{borderRadius:'20px',fontSize:'12px'}} >Add Candidate</NavLink>
        </li>
        <li>
        <NavLink  className="btn btn-outline-primary" onClick={()=>setModalShow(true)} style={{borderRadius:'20px',fontSize:'12px'}} >Post a job</NavLink>
        </li>
        <li>
        {adminToken?
                  <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser}/> Profile
                  </Dropdown.Toggle>
            
                  <Dropdown.Menu>
                   
                    <Dropdown.Item href="/" onClick={handleSignOut}>Sign-out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
        
        
        :<NavLink to="/logs">
         
          <FontAwesomeIcon icon={faRightToBracket} className='me-1' />        
             Signup/Signin</NavLink>}
        </li>
           
    </ul>
   </nav>
      
   <Offcanvas show={menuOpen} onHide={handleClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvas'>
        <NavLink className="bglink" to="/" onClick={handleClose}> <FontAwesomeIcon icon={faHouse} className='me-1'/> Home</NavLink>
          <NavLink className="bglink" to="/contact" onClick={handleClose}><FontAwesomeIcon icon={faAddressBook} className='me-1' />Contact</NavLink>
          <NavLink className="bglink" to="/findcandidate" onClick={handleClose}><FontAwesomeIcon icon={faMagnifyingGlass} className='me-1' />Find Candidates</NavLink>
          <NavLink className="bglink" to="/addcandidate" onClick={handleClose}>Add Candidate</NavLink>
          <NavLink className="btn btn-outline-primary"  onClick={handlepost} style={{borderRadius:'20px',fontSize:'12px'}}>Post a job</NavLink>

          {adminToken?
           <NavLink className="bglink" to="/"  onClick={handleSignOut}>Sign-out</NavLink>
         
              :<NavLink to="/logs">
 
                <FontAwesomeIcon icon={faRightToBracket} className='me-1' />        
                                 Signup/Signin</NavLink>}

                   
        </Offcanvas.Body>
      </Offcanvas>
    
   <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Post Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add Job Details</h4>
         <PostJob  setModalShow={setModalShow}/>
      </Modal.Body>
      <Modal.Footer>
      
      </Modal.Footer>
    </Modal>
          
  
    </div>
  )
}

export default  AdminNavbar