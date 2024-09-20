import React, { useState, useEffect ,useRef} from 'react';
import '../Style/CandidateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBriefcase, faBuilding, faCalendarDay, faDownload, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Modal,Form,Col ,Button,Toast,Row} from 'react-bootstrap';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import ProfileSummary from './ProfileSummary';
import SkillInput from './SkillInput';
import Education from './Education';
import EditEducation from './EditEducation';
import Personaldata from './Personaldata';
import AddLanguage from './AddLanguage';
import Employment from './Employment';
import EditEmployment from './EditEmployment';
import propic from '../assets/Images/dummypropic.png'
import probrief from   '../assets/Images/pro-brief.png'
import procall from   '../assets/Images/pro-call.png'
import promail from   '../assets/Images/pro-mail.png'
import proLocation from   '../assets/Images/pro-location.png'
import procalender from   '../assets/Images/pro-calender.png'
import prorupee from   '../assets/Images/pro-rupee.png'
import resumepic from '../assets/Images/cv.png'
import ImageCropUpload from './ImageCropUpload';

const CandidateProfile = () => {
  const fileInputRef = useRef(null);
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [modalShow, setModalShow] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [showProfile,setShowProfile] = useState (false);
  const [showUpload,setShowUpload] = useState(false);
  const [showSummary,setShowSummary] = useState(false);
  const [showSkills,setShowSkills] = useState(false);
   const[showEducation,setShowEducation] =useState(false);
   const[showWorkExperience,setWorkExperience] =useState(false);
   const[showEditEmployment,setShowEditEmployment] =useState(false);
   const[employment_id,setEmployment_id] = useState(' ');
   const[showEditEducation,setShowEditEducation] =useState(false);
   const[showAddlanguages,setShowAddlanguages] =useState(false);
   const[education_id,setEducation_id] = useState(' ');
   const[showpersonal,setShowPersonal] =useState(false);
  const [showToast, setShowToast] = useState(false);
  const [languages, setLanguages] = useState([ ]);
  const[page,setPage]=useState(0);
  const[selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const[uploadFeedBack,setUploadFeedBack] = useState(" ");
  const [imgCrop,setImgCrop] = useState(false);
 
 
  const fetchData = async () => {
    try {
     if (authId){
   
        const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/specificprofile/${authId}`);
        setProfileData([response.data]);
        setLanguages(response.data.languages);
    
    
        
     
      
      }
    } catch (error) {
      console.log("Error occurred while fetching profile data:", error.message);
    }
  };

  const fetchProfilePicture = async () => {
    try {
     const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/profilepic/${authId}`, {
        responseType: 'blob' // Important for handling binary data
      });
    
        if(response.status===200){
      
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);}
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      // Handle errors gracefully (e.g., display a placeholder image)
      setImageUrl('/path/to/placeholder.jpg'); // Use a placeholder image path
    }
  };

  useEffect(() => {
    fetchData();
    fetchProfilePicture();
  }, [authId]);

  const handleEditProfile = () => {
    setModalShow(true);
    setShowProfile(true);
  };



// upload Cv section
  const handleUpload = ()=>{
    setModalShow(true);
    setShowUpload(true); 
  }  

   const uploadSubmit = async (e)=>{
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/uploadcv/${authId}`, formData, {
        // const response = await axios.post(`http://localhost:5000/profile/uploadcv/${authId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(response.status == 201){
        handleCloseModal()
      }
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
   }
   const handleClose =()=>{
   }

  const handleCloseModal = () => {
    setModalShow(false);
    setShowProfile(false);
    setShowUpload(false); 
    setShowSummary(false);
    setShowSkills(false);
    setShowEducation(false);
    setShowEditEducation(false);
    setShowPersonal(false);
    setShowAddlanguages(false);
    setWorkExperience(false);
    setShowEditEmployment(false);
    fetchData();
  };

  const getCVName = (fileName) => {
    const parts = fileName.split('_');
    const name = parts.slice(2).join('_').replace(' ', ''); 
    return name;
  };
  
  const getUploadDate = (fileName) => {   
  const parts = fileName.split('_'); 
    const datePart = parts[1];
    const year = datePart.slice(0, 4);
    const month = datePart.slice(5, 7);
    const day = datePart.slice(8, 10);
   
    const formattedDate = `${year}-${month}-${day}`;
    return `Uploaded on ${formattedDate}`;
};

// handle delete and download cv 
const handleDownload = async (name) => {
  try {
    const response = await axios.get(`https://www.skylarkjobs.com/nodejs/profile/download/${authId}`, {
      // const response = await axios.get(`http://localhost:5000/profile/download/${authId}`, {
      responseType: 'blob',
    });
    
    if (response.status === 201) {
      alert("Candidate CV not available. Please upload.");
    } else {
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
       
     

      const fileName = `${name}_CV.pdf`; // Replace whitespace with underscores

      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error downloading CV:', error);
  }
};
   const [delFeedBack,setDelFeedBack] = useState(false);

const handleDelete = async (id) => {
  try {
   
   const response =  await axios.delete(`https://www.skylarkjobs.com/nodejs/profile/delete/${id}`);
  // const response =  await axios.delete(`http://localhost:5000/profile/delete/${id}`);
     
      if(response.status == 204){
        setShowToast(true); 
        setDelFeedBack(true);
        fetchData();
      }else if(response.status == 205){
        alert("There is some issue with your uploaded cv.Please re-upload.")
      }
      else if(response.status == 206){
        alert("Candidate CV not available.")
      }
  
  } catch (error) {
    console.error('Error deleting file:', error);
   
  }
};
  //  handle profile summary 
  const handlesummary = ()=>{
    setModalShow(true);
    setShowSummary(true)
  } 
  // handle keyskills
  const handleSkills = ()=>{
    setModalShow(true);
    setShowSkills(true)
  }
  // handle Education 
  const handleeducation =()=>{
    setModalShow(true);
    setShowEducation(true);
  }
  const handleEmployment = ()=>{
       setModalShow(true);
       setWorkExperience(true);
  }

  const handleEditEducation  =(file_id)=>{
    setModalShow(true);
    setShowEditEducation(true);
    setEducation_id(file_id)
  }
  const handleEducationDelete = async(id)=>{
    const response =  await axios.delete(`https://www.skylarkjobs.com/nodejs/profile/deleteeducation/${authId}/${id}`);
     if(response.status == 200){
      fetchData()
     }

    
  }
  const handleAddLanguage =()=>{
    setModalShow(true);
    setShowAddlanguages(true)
  }

  const handlelanguagedel = async (id)=>{
    const response =  await axios.delete(`https://www.skylarkjobs.com/nodejs/profile/deletelanguage/${authId}/${id}`);
   
    fetchData()
  }
 
    const handleToastClose = ()=>{
      setShowToast(false);
      setDelFeedBack(false);
      // setSummaryFeedBack(false)
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${month} ${year}`;
    };

    const calculateDuration = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = endDate === 'Present' ? new Date() : new Date(endDate);
      
      const diffYear = end.getFullYear() - start.getFullYear();
      const diffMonth = end.getMonth() - start.getMonth();
    
      let years = diffYear;
      let months = diffMonth;
    
      if (months < 0) {
        years -= 1;
        months += 12;
      }
    
      return `${years} years ${months} months`;
    };

    const handleEditEmployment  =(id)=>{
      setModalShow(true);
      setEmployment_id(id)
      setShowEditEmployment(true);
      
     
    }
    const handleEmploymentDelete = async(id)=>{
      const response =  await axios.delete(`https://www.skylarkjobs.com/nodejs/profile/deleteemployment/${authId}/${id}`);
      fetchData()
    }
   
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // handlePhotoUpload(file);
      setModalShow(true);
      setImgCrop(true)
    }
  };

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/uploadphoto/${authId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
        setUploadFeedBack(response.data.error)
      if (response.status === 201) {
        fetchProfilePicture();
      } else {
        console.error('Photo upload failed');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

   
  return (
    <>
   
<Modal
            show={modalShow}
            size='lg'
            bg="Secondary"
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {showProfile? <ProfileDetails handleCloseModal={handleCloseModal}/>:" "}
            {imgCrop && <ImageCropUpload selectedFile={selectedFile} fetchProfilePicture={fetchProfilePicture} 
                         setModalShow={setModalShow}  setImgCrop={setImgCrop} />}
            {showUpload?  <Form  onSubmit={uploadSubmit}>
                              <Form.Group controlId="formFile" as={Col} md="5" className="mb-3">
                               <Form.Label>Upload CV</Form.Label>
                              <Form.Control type="file" 
                              // onChange={(e) => setFieldValue('file', e.target.files[0])}
                                accept=".pdf, .doc, .docx" 
                                ref={fileInputRef} className='mt-3'
                              />
                            </Form.Group>
                            <div className='d-flex' style={{justifyContent:'space-evenly'}}>
                               <Button type="submit">Submit</Button>
                           </div>
                          </Form>: ''}
              {showSummary? 
                                 <ProfileSummary handleCloseModal={handleCloseModal}  /> : " "
              }
               {showSkills? 
                                <SkillInput handleCloseModal={handleCloseModal}/> : " "
              }
              {
                showWorkExperience? 
                                 <Employment handleCloseModal={handleCloseModal} /> : " "   
               }
               {showEditEmployment?
                           <EditEmployment  handleCloseModal={handleCloseModal} employment_id={employment_id} /> : " "}
              {showEducation? 
                            <Education handleCloseModal={handleCloseModal}/>    : " "
              }
              {showEditEducation ? 
                            <EditEducation education_id={education_id} handleCloseModal={handleCloseModal}/>
                   : " "      }
              {showpersonal?
                        <Personaldata handleCloseModal={handleCloseModal} fetchData={fetchData}/> :  " "
                        }
              {showAddlanguages?
                           <AddLanguage handleCloseModal={handleCloseModal} handleClose={handleClose} page={page} setPage={setPage} /> : " "
                           }

                 
        </Modal.Body>
          </Modal>
          <Row className="position-fixed top-0 end-0 p-3">
        <Col xs={10}>
        {delFeedBack? <Toast bg='danger' onClose={handleToastClose} show={showToast} delay={3000} autohide>
            <Toast.Header> 
             <strong className="me-auto">Deleted</strong> 
              
            </Toast.Header>
            <Toast.Body>Cv Deleted Sucessfully</Toast.Body>
          </Toast>: " "}
         
        </Col>
      </Row> 

      {profileData.length == 0?   
              <div className="containers1">
              <div className="loading-wave">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
            
            </div>      
          
                                    :
      <div  className='d-flex flex-row mb-5' >
      {profileData.map((data, index) => (
        <div className='profile' key={index}> 
              <div className='top-sec'>
                 <FontAwesomeIcon className="edit-icon" onClick={handleEditProfile} icon={faPencil}/>
              </div>
              <div className='imagecont '>
                <div className='profile-img'>
                 {imageUrl ? (
        <img className='propic1' src={imageUrl} alt="Profile" />
      ) : (
        <img className='propic' src={propic} alt='User-Profile' />
      )}
              {imageUrl == null ? (      <div className="file btn btn-lg btn-primary">
                                                                                    Add Photo
                                           <input type="file" name="file" onChange={handleFileChange}/>  
                                        </div> ):(
                                        <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                         <input type="file" name="file" onChange={handleFileChange}/>  
                                       </div>
              )}
              <p className='text-danger'>{uploadFeedBack}</p>
                            </div>
              </div>
              <div className='text-center'>
                <h5 className='pro-name'>{data.name.toUpperCase()}</h5>
              
                <p className='pro-desig'>
                        {data.role ? data.role.replace(/\b\w/g, c => c.toUpperCase()) : " "} 
               </p>

              </div>
              <div className='pro-details text-start'>
                <p  className='pro-text'><img className='pro-icons' src={probrief} alt='briefcase-icon'/> {data.experience ? data.experience : 0} Years</p>
                <p  className='pro-text'><img className='pro-icons' src={procall} alt='phone-icon'/> {data.phonenumber} </p>
                <p  className='pro-text'><img className='pro-icons' src={promail} alt='email-icon'/> {data.email}</p>
                <p  className='pro-text'><img className='pro-icons' src={proLocation} alt='location-icon'/> {data.location}</p> 
                <p  className='pro-text'><img className='pro-icons' src={procalender} alt='calender-icon'/> {data.noticeperiod?data.noticeperiod : 0} Days</p>
                <p  className='pro-text'><img className='pro-icons' src={prorupee} alt='rupee-icon'/> {data.currentctc ? data.currentctc : 0 } LPA</p>  
              </div>     
        </div>))}
          <div className='sidesec-main'>
          {profileData.map((data, index) => (
               <div className='aboutme'  key={index}>
                  <h4 className='abouttxt'>About Me <i className="bi bi-pencil-fill edit-profile" onClick={handlesummary}></i></h4>
                  <p className='profile-summary'>{data.profileSummary}</p>
               </div>
               ))}
                 {profileData.map((data, index) => (
               <div className='aboutme mt-3' key={index}> 
             
               <h4 className='abouttxt'>Resume</h4>
              
               <div className='resume'>
                <div className='resumepart-1'>
                <img className='cvpic' src={resumepic} alt='cv-icon'/>
                <div className='contcv text-center'>
                      
                           <p className='profile-pdf m-0'>{data.cvname !== ""? getCVName(data.cvname): " "}</p>
                           <p className='profile-pdfdate m-0'>{data.cvname !== ""?  getUploadDate(data.cvname): " "}</p>
                </div>
                         </div>
                        <div className='upload-profilecv  text-center'>
                       <span className='pro-cv btn btn-outline-light  ' onClick={handleUpload}>Upload CV</span>
                       <p className='format text-light mb-0'>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
                     </div>
               </div>
               {data.cvname === "" ?  " "  :<div className='mt-2'>
                <span style={{cursor:"pointer"}} className='actionbtn text-primary' onClick={()=>handleDownload(data.name)} ><FontAwesomeIcon   icon={faDownload} /></span>
                <span style={{cursor:"pointer"}} className='actionbtn text-danger' onClick={()=>handleDelete(data._id)}><i className="bi bi-trash3-fill"  > </i></span>                    
                   </div>  }
                    
               </div>))} 
               <div className='keyskill-main mt-3'> 
  <div className='keyskills'>
    <h4 className='keytitle'>Keyskills <i className="bi bi-pencil-fill edit-profile-blue" onClick={handleSkills}></i></h4>
  </div>
  {profileData.map((data, dataIndex) => (
    <div key={dataIndex} className='mainkeys d-flex p-2'>
      {data.keySkills.map((skill, skillIndex) => (
        <div key={skillIndex} className='profilekey'>
          <span className='profile-jobskill  '>{skill.replace(/\b\w/g, c => c.toUpperCase())}</span>
        </div>
      ))}
    </div>
  ))}
</div>

               <div className='keyskill-main mt-3'> 
                  <div className='keyskills d-flex justify-content-between'>
                   <h4 className='keytitle'>Work Experience</h4>
                   <p className='write-education' onClick={handleEmployment}>Add Experience</p>
                  </div>
                  {profileData.map((data, dataIndex) => {
                  const sortedEmployment = data.employment.slice().sort((a, b) => {
                    const startDateA = new Date(a.startDate);
                    const startDateB = new Date(b.startDate);
                    return startDateB - startDateA;
                  });
                   
                   return (
                     <div key={dataIndex} className='p-2'>
                       {sortedEmployment.map((work, skillIndex) => (
                         <div key={skillIndex} className= 'profile2 '>
                           <div className='degree-employment'>
                              <p className='emp-title'>{work.designation.replace(/\b\w/g,c=>c.toUpperCase())}</p>
                              
                             <div className='edit-emp' style={{fontSize:'16px'}}>  <i className="bi bi-pencil-fill edit-profile-emp" onClick={() => handleEditEmployment(work._id)}></i> 
                             <FontAwesomeIcon icon={faTrashCan} className='edit-profile-emp text-danger' style={{ cursor: "pointer" }} onClick={() => handleEmploymentDelete(work._id)} />
                             </div> </div>
                           <p className='company-name'><span style={{color:"#605c5c"}}><FontAwesomeIcon icon={faBuilding}/></span> {work.currentCompanyName}</p>
                           <p className='edc-clg'>
                             {formatDate(work.startDate)} - {work.isCurrent ? 'Present' : formatDate(work.endDate)}
                           </p>
                           <p className='edc-clg'>
                             {calculateDuration(work.startDate, work.isCurrent ? 'Present' : work.endDate)}
                           </p>
                           <p className='profile-summary'>{work.jobSummary}</p>
                         </div>
                       ))}
                     </div>
  );
})}
               </div>
               <div className='keyskill-main mt-3'> 
                  <div className='keyskills d-flex justify-content-between'>
                   <h4 className='keytitle'>Education</h4>
                   <p className='write-education' onClick={handleeducation}>Add Education</p>
                  </div>
                  {profileData.map((data, dataIndex) => {
  
  const sortedEducation = data.education.slice().sort((a, b) => b.startyear - a.startyear);
  
  return (
      <div key={dataIndex} className='p-2'>
          {sortedEducation.map((edu, skillIndex) => (
              <div key={skillIndex} className='profile2  '>
                  <p className='degree-education'>{edu.degree}  <i className="bi bi-pencil-fill edit-profile" onClick={()=>handleEditEducation(edu._id)}></i> 
                  < FontAwesomeIcon icon={faTrashCan} className='text-danger' style={{cursor:"pointer"}} onClick={()=>handleEducationDelete(edu._id)}/></p>
                  <p className='edc-clg'>{edu.collegeName}</p>
                  <p className='edc-clg'>{edu.startyear} - {edu.passedout}</p>
              </div>
          ))}
      </div>
  );
  })}
                  </div>
                  <div className='keyskill-main mt-3'> 
                  <div className='keyskills d-flex justify-content-between'>
                   <h4 className='keytitle'>Languages Known</h4>
                   <p className='write-education' onClick={handleAddLanguage}>Add Language</p>
                  </div>
                  <table className='w-100  p-5'>
      <thead   className='text-center'>
        <tr >
          <th></th>
          <th>Proficiency</th>
          <th>Read</th>
          <th>Write</th>
          <th>Speak</th>
        </tr>
      </thead>
      <tbody className='text-center'> 
        {languages.map(language => (
          <tr key={language._id}>
            <td>{language.language}</td>
            <td>{language.proficiency}</td>
            <td><input className='checkbox' type="checkbox" checked={language.read}  readOnly /></td>
            <td><input className='checkbox' type="checkbox" checked={language.write} readOnly /></td>
            <td><input className='checkbox' type="checkbox" checked={language.speak} readOnly /></td>
            <td> < FontAwesomeIcon icon={faTrashCan} className='text-danger' style={{cursor:"pointer"}} onClick={()=>handlelanguagedel(language._id)} /></td> 
          </tr>
        ))}
      </tbody>
    </table>

                  </div>   
          </div>
      </div> }
       
</>     
  )
}

export default CandidateProfile