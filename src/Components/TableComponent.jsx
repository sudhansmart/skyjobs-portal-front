import React, { useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCircleQuestion, faDownload, faFilePen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { OverlayTrigger,Tooltip,Modal } from 'react-bootstrap';
import EditForm from './EditForm';


// Tooltip Function
const TableCellWithTooltip = ({ content, maxLength }) => {
  
  const renderTooltip = (props) => (
    <Tooltip id="tooltip-top" {...props}>
      {content}
    </Tooltip>
  );

  const truncatedContent = content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;

  return (
    <OverlayTrigger
      placement="top"
      overlay={renderTooltip}
      delay={{ show: 250, hide: 400 }}
    >
      <td>{truncatedContent}</td>
    </OverlayTrigger>
  );
};


const TableComponent = ({setFetch,fetch}) => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [showModal, setShowModal] = useState(false)
  const [candidateId,setCandidateId] = useState('')
  
  const [formdata, setFormdata] = useState([]);
   
  const fetchData = async () => {
    console.log("table fetching")
    try {
      const response = await axios.get('https://www.skylarkjobs.com/nodejs/file/getdata');
      const filteredata = response.data.filter(data => data.hasOwnProperty('clientName') )
      setFormdata(filteredata);
      console.log("fetched :",filteredData)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };


  useEffect(() => {
    fetchData();
    
  }, [fetch]);
 

  const openModal = (data)=>{
    setShowModal(true);
    setCandidateId(data._id);
    setFetch(false)
  }
  const handleClose = () =>{
    setFetch(true);
     setShowModal(false);
    

  }
  const handleDownload = async (data) => {
   
    try {
      const id = data._id
      const response = await axios.get(`https://www.skylarkjobs.com/nodejs/file/download/${id}`, {
        responseType: 'blob',
      });
      console.log("response of download : ",response)
      if(response.status == 201){
        alert("Candidate CV not available. Please upload.")
       }
       else{
    
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
    
      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition && contentDisposition.match(/filename=(.+)/);
      const fileName = fileNameMatch ? fileNameMatch[1] :`${data.name}.pdf`;
  
    
      link.download = fileName;
  
     
      document.body.appendChild(link);
      link.click();
  
     
      document.body.removeChild(link);
       }

    } catch (error) {
      console.log("Error in Download:", error.message);
    }
  };

 
  const sortedData = formdata.sort((a, b) => {
    const dateA = new Date(a.joinedOn);
    const dateB = new Date(b.joinedOn);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Filtered and paginated data
  const filteredData = sortedData.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const designationMatch = item.role.toLowerCase().includes(searchText.toLowerCase());
    const clientMatch = item.clientName && item.clientName.toLowerCase().includes(searchText.toLowerCase());

  
    // Convert item.date to a comparable date string (without time)
    const dateObject = new Date(item.date);
    const formattedDate = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
  
    // Convert startDate and endDate to comparable date strings (without time)
    const startDateWithoutTime = startDate ? new Date(startDate).toISOString().split('T')[0] : null;
    const endDateWithoutTime = endDate ? new Date(endDate).toISOString().split('T')[0] : null;
  
    // Perform date comparison without considering time
      const dateMatch =
      startDateWithoutTime &&
      endDateWithoutTime &&
      formattedDate >= new Date(startDateWithoutTime) &&
      formattedDate <= new Date(endDateWithoutTime);
  
    // Combine conditions to filter the data
    return (nameMatch || designationMatch ||clientMatch) && (!startDateWithoutTime || dateMatch);
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
    <div className="container mt-4 " style={{height:'100vh'}}>
      {/* Search input and date range inputs */}
      <div className="col-md-12">
        <h4 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">Added Candidates</h4>
        <div className="input-group mb-3">
          
          <input
            type="text"
            className="form-control my-0 py-1 pl-3 purple-border"
            placeholder="Search something here..."
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            placeholder="End Date"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className='datatable'>

      <table className="table table-striped table-bordered scrollable-table">
      
        <thead className='align-text-bottom text-center'>
          <tr>
            <th>SL.No</th>
           
            <th>
              Date
              <button className="btn btn-link" onClick={toggleSortOrder}>
                {sortOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp}style={{fontSize:'15px'}}/> : <FontAwesomeIcon style={{fontSize:'15px'}} icon={faArrowDown} />}
              </button>
            </th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Location</th>
            <th>Client Name</th>
             <th>Position/Role</th>
             <th>Current Company</th>
            <th>Over All Experience</th>
            <th>Current CTC</th>
            <th>Expected CTC</th>
             <th>Notice Period</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
      
  
<tbody>
  {currentItems.map((item, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      
      <td>{new Date(item.joinedOn).toLocaleDateString('en-GB')}</td>
      <td>{item.name}</td>
      <td>{item.phonenumber}</td>
      <td>{item.email}</td>
      <td>{item.location}</td>
      <td>{item.clientName}</td>
      <td>{item.role}</td>
      <td>{item.currentCompany}</td>
      <td>{item.experience} Years</td>
      <td>{item.currentctc} LPA</td>
      <td>{item.expectedctc} LPA</td>
      <td>{item.noticeperiod} Days</td>
      <TableCellWithTooltip content={item.remarks} maxLength={10} /> 
      <td><div className="d-flex justify-content-between align-items-center" style={{padding:'10px 0'}}><FontAwesomeIcon onClick={()=>openModal(item)} icon={faFilePen} style={{color:'brown'}}/><FontAwesomeIcon onClick={() => handleDownload(item)} icon={faDownload} style={{color:'Royalblue'}}/></div></td>
    </tr>
  ))}
</tbody>

      </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <nav className="my-4 pt-2">
          <ul className="pagination pagination-circle pg-blue mb-0">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    {/* Modal For Edit  */}
    <Modal size='xl'  show={showModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <EditForm fetch={fetch} candidateId={candidateId} handleClose={handleClose}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableComponent;
