import React from 'react'
import "../Style/Hiringnow.css"

 function TopHiring() {
    const Data = [
        { id: 1, domain:"IT DOMAIN",position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'UPTO 35LPA',exp:"10+ Experience Banking Domain", },
        { id: 2, domain: 'Bpo',position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'upto 35LPA',exp:"10+ Experience Banking Domain",},
        { id: 3, domain: 'Sale & Marketing' , position:"BDM",exp:"10+ Experience Banking Domain",Ctc:'upto 10LPA',Location:"CHENNAI"},
        { id: 4, domain: 'Customer service',position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'upto 35LPA',exp:"10+ Experience Banking Domain",},
        { id: 5, domain: 'Account',Location:"CHENNAI",position:"Key Account Manager",exp:"10+ Experience Banking Domain",Ctc:'upto 10LPA'},
        { id: 6, domain: 'Digital Marketing',position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'upto 35LPA',exp:"10+ Experience Banking Domain",},
        { id: 7, domain: 'Health care',position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'upto 35LPA',exp:"10+ Experience Banking Domain",},
        { id: 8, domain: 'Manifacturing',position:"SOLUTION ARCHITECT",Location:"CHENNAI",Ctc:'upto 35LPA',exp:"10+ Experience Banking Domain",},
      
      ];
  return (
    
    <div >
        <h2 id='hiring'>HIRING NOW </h2>
        <div className='container mt-5 text-center' >
        <div className='row mb-4 ' >
        {Data.map((data) => (
            <div className='col-md-3' key={data.id}  id='bgg'>
             
              <div className='card mb-4'  id='bg-size'>
             
                <div className='card-body' id='bg-color'>
                <h5 className='it-domain'>{data.domain}</h5><hr/>
                <div className='back-color p-1'>

                <p  className='card-title' >{data.position}</p>
                  <p  className='card-title'>{data.exp}</p>
                </div>
                 
                  <h5  className='card-title mt-1' id='job-loc'><i className="bi bi-geo-alt"></i>{data.Location}</h5>
                  <div className='job-ctc text-center p-1'> 
                  <h5  className='card-ctc m-0' >{data.Ctc}</h5>
                  </div>
                  
                  <button id='btn-apply' className='btn btn-primary mt-2'>APPLY NOW</button>
                </div>
              </div>
            </div>
               ))}
        </div>
      </div>
        </div>
  )
}

export default TopHiring;