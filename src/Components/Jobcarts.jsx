import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../Style/Jobcarts.css'
import axios from 'axios';
export const Jobcarts = () => {
  const[data,setData]=useState([
    { category:' ', jobtitle:' ', experience:' ',location:' ',salary:'',jobtype:"Full Time"},
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.skylarkjobs.com/nodejs/job/getdata');
      const filteredData = response.data
       
        .sort((a, b) => b.salary - a.salary)
        .slice(0, 8);
    
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  useEffect(() => {   
     fetchData()
    }, []); 
   
  return (
    <div className='overallbox'> 
          <h2 id='hiring'>Top Hiring Companies!! </h2>
    <div className='bg-color-job '>
       
      
        <div className=' mt-4 p-2' >
        <div className= 'main1 mb-4 ' >
        {data.map((data,index) => (   
         <div className='newmaincard  col-md-3'  key={index}>
             <div className='d-flex justify-content-end'>
                   <Link to ={`/jobdetails/${data._id}/${data.category}`} className='text-decoration-none'>
                   <p className='text-center view-job p-2 '>View Job</p>
              </Link>
            </div>
            <p className='text-center it-domains m-0'>{data.category.replace(/\b\w/g,c=>c.toLocaleUpperCase())}</p>
             <hr />
             <h5 className='text-center data-position'>{data.jobtitle.replace(/\b\w/g,c=>c.toLocaleUpperCase())}</h5>
            <p className='text-center data-exp'>{data.experience} Years Experience</p>
            <div>
            <div className='d-flex justify-content-around'>
              <p className='text-center data-location-type'><i className="bi bi-geo-alt-fill" style={{color:"red"}}></i> {data.location.replace(/\b\w/g,c=>c.toLocaleUpperCase())}</p>
              <p className='text-center data-location-type'>Job : {data.jobtype.replace(/\b\w/g,c=>c.toLocaleUpperCase())}</p>
           </div>
            <p className='text-center jobs-ctc'>Upto {data.salary} LPA</p>

            </div>
         </div>
        
 ))}
               
        </div>
      </div>
        </div>
  
    </div>
  )
}
