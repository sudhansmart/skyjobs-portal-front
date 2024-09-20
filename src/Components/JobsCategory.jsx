import React, { useState, useEffect } from 'react';
import It from '../assets/Images/It1.png';
import Bpo from "../assets/Images/bpo1.png"
import sale from "../assets/Images/sale1.png"
import customer1 from "../assets/Images/customer1.png"
import account from "../assets/Images/accounting.png"
import digital from "../assets/Images/digital1.png"
import health from "../assets/Images/medical.png"
import manifacture from "../assets/Images/building.png"
import skin from "../assets/Images/skin1.png"
import hr1 from "../assets/Images/hr.png"
import operation from "../assets/Images/operation1.png"
import ms2 from "../assets//Images/ms3.png"
import { Link } from 'react-router-dom';
import "../Style/Jobrole.css"

function JobsCategory() {
  const Data = [
    { id: 1, name: 'IT', img: It, path: "/jobdetails",category:"IT" },
    { id: 2, name: 'BPO', img: Bpo, path: "/jobdetails",category:"BPO" },
    { id: 3, name: 'Sales & Marketing', img: sale, path: "/jobdetails",category:"Sales & Marketing" },
    { id: 4, name: 'Customer Service', img: customer1, path: "/jobdetails" ,category:"Customer Service"},
    { id: 5, name: 'Accounts', img: account, path: "/jobdetails",category:"Accounts" },
    { id: 6, name: 'Digital Marketing', img: digital, path: "/jobdetails",category:"Digital Marketing" },
    { id: 7, name: 'Health Care', img: health, path: "/jobdetails",category:"Healthcare" },
    { id: 8, name: 'Manufacturing', img: manifacture, path: "/jobdetails",category:"Manufacturing" },
    { id: 9, name: 'Skin Clinic', img: skin, path: "/jobdetails" ,category:"Skin Clinic"},
    { id: 10, name: 'Human Resources', img: hr1, path: "/jobdetails",category:"Human Resources" },
    { id: 11, name: 'Operations', img: operation, path: "/jobdetails" ,category:"Operations"},
    { id: 12, name: 'Miscellaneous', img: ms2, path: "/jobdetails",category:"Miscellaneous" },
  ];

  const [openingsData, setOpeningsData] = useState([]);

  useEffect(() => {
    
    const fetchOpeningsData = async () => {
  
      const response = await fetch('https://www.skylarkjobs.com/nodejs/job/getdata');
      const data = await response.json();
    
      setOpeningsData(data);
      window.scrollTo(0, 0);
    };

    fetchOpeningsData();
  }, []);

  return (
    <div className='overallbox'>
      <h3 className='text-start ' id='jobsfont'>
        Browse by Category
      </h3>
      <div className='container text-center'>
        <div className='row mb-4' id='icon'>
          {Data.map((data) => {
            const opening = openingsData.filter((item) => item.category === data.category);
            return (
              <div className='col-md-3 mt-3' key={data.id}>
                <div className='card mb-3' style={{ cursor: "pointer" }} >
                  <div className='card-body text-center'>
                  <img className='mt-2' style={{height:"80px",width:"80px"}} src={data.img} alt={data.name} />
                    <h5 id='jobsfont' style={{ fontSize: "17px", fontWeight:"700" }} className='card-title mt-3'>{data.name}</h5>
                    
                    <p className='openings mt-3'>No of  Openings : <span>{opening ? opening.length : 0}</span></p>
                 
                  </div>
                  <Link to={`${data.path}/${data.category}`}>
                    <button className='btn btn-outline-secondary mb-3' id='jobsfont' style={{ fontSize: "14px" }}>View jobs</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JobsCategory;
