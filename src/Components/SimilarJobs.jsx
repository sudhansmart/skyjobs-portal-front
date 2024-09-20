import { faBuilding, faChevronRight, faLocation, faLocationDot, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import '../Style/similarJobs.css'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

function SimilarJobs() {
    const { category } = useParams();
    const [data,setData] = useState([
       
    ])


    const fetchData = async () => {
        try {
            const response = await axios.get('https://www.skylarkjobs.com/nodejs/job/getdata'); 
            const filteredData = response.data.filter(entry => entry.category === `${category}`);
            setData(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div className='d-flex justify-content-center  p-1'>
   <div className='sim-jobs' >
         <h5 className='sim-jobs-title' >Similar jobs</h5><hr/>
         {data.map((data)=>(  <div key={data.serialId}>
         <div>
            <div className='d-flex justify-content-between' >
                <h5 className='sim-jobs-role'>{data.jobtitle}<br/><span className='comp-name'><FontAwesomeIcon icon={faBuilding}/> Skylark Hr Solutions</span></h5>
                <p  className='sim-jobs-icon'> <Link to ={`/jobdetails/${data._id}/${data.category}`}><FontAwesomeIcon icon={faChevronRight}/></Link></p>
            </div>
           
           
            <p> <FontAwesomeIcon  icon={faLocationDot}/> {data.location}</p>
            <p> <FontAwesomeIcon icon={faMoneyBill}/> Upto {data.salary} LPA</p>
              
            <div className='d-flex justify-content-start'>
                                <p className='top-tag p-1 m-1 text-white'>Work From Office</p>
                                <p className='top-tag p-1 m-1 text-white'>{data.jobtype}</p>
                                <p className='top-tag p-1 m-1 text-white'>Experience {data.experience} years</p>
                            </div>
             </div><hr/>
             </div>))}


    </div>
    </div>
  )
}

export default SimilarJobs