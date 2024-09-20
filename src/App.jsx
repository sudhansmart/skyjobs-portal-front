import { useState,useEffect} from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import { HashRouter  as Router,Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Components/Home';
import Findjob from './Components/Findjob';
import Logins from './Components/Logins';
import UploadForm from './Components/UploadForm';
import AdminHome from './Components/AdminHome';
import AdminNavbar from './Components/AdminNavbar';
import AdminLogin from './Components/AdminLogin';
import DisplayJob from './Components/DisplayJob';
import Candidates from './Components/Candidates';
import CandidateProfile from './Components/CandidateProfile';
import FindCandidates from './Components/FindCandidates';
import ApplicantForm from './Components/ApplicantForm';
import Jobcarddetails from './Components/Jobcarddetails';
import Contact from './Components/Contact';









function App() {
    const [userloggedin, setUserloggedin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [authid, setAuthid] = useState(localStorage.getItem('authId'));
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adauthToken'));
    const [admin, setAdmin] = useState(false);
   


   
    
    return (
        <div>
            <Router>
            {adminToken ? <AdminNavbar adminToken={adminToken} /> : <Navbar  userloggedin={userloggedin} token={token} />}
            <Routes>
                <Route path='/' element={adminToken ? <AdminHome /> : <Home setAdmin={setAdmin} />} />
                <Route
                    path='/profile'
                         element={token ? <CandidateProfile /> : <Navigate to="/" />}
                   />
                <Route path='/jobdetails/:id/:category' element={<DisplayJob />}/>
                <Route path='/candidates/:jobid' element={<Candidates/>}/>
                <Route path='/logs' element={<Logins setUserloggedin={setUserloggedin} setToken={setToken} />} />
                <Route path='/jobs' element={<Findjob />} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/jobdetails/:category' element={<Jobcarddetails/>} />
                <Route path='/forms' element={<UploadForm />} />
                <Route path='/findcandidate' element={<FindCandidates/>}/>
                <Route path='/adminlog' element={<AdminLogin setAdminToken={setAdminToken} />} />
                <Route path='/addcandidate' element={<ApplicantForm/>}/>
                {/* <Route path='/dev' element={<ImageCropUpload/>}   /> */}
            </Routes>
            </Router>
        </div>
    );
}

export default App;
