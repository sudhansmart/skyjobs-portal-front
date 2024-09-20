import React from 'react'
import '../Style/Reviewslider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
function Reviewslider() {
  const reviews = [
    {
      id:1,
      name:"david amos",
      content : "One of the best consultancy center to have well skilled HR's and recruiter. Recently I got the opportunity to get an amazing job, however I didn't join due to my personal issues. But I would say Shalini is one of the best recruiter you will ever meet, she follows up everyday and gives appropriate updates. She just not want to fill up candidates based on the client's requirements but also understands our requirements and needs. Thank you Shalini for the hardwork you did!!! A special thanks to Khalid for his extended support. Thanks team Skylark!!! Keep doing the same."
    },
    {
      id:2,
      name:"Nachiyappan Subramanian",
      content : "My experience applying to Infosys in Bangalore was excellent. For this, HR. Aarthi from Skylark is my HR. She has been really helpful from the beginning until Infosys places me. She has been in constant communication and updated every aspect of this time. I suggest Skylark and HR Aarthi to everyone."
    },
    {
      id:3,
      name:"Charan Narayan",
      content : "Im so glad and meet this people I'm so happy for that. HR Farzeena helped me alot in getting me a job and they helped me every aspect in process of screening to getting the job. I'm so happy for meeting this wonderful people. #Thankyou Skylark#thankyou HR Farzeena."
    }
  ]
   
  return (
    <div className='p-4'>
    <h5 className='testtitle text-center'>Testimonials</h5>
    <div className='testmain mb-5'>  
      <div className="scroll-container">
      {reviews.map((data) => (
        <div key={data.id} className="contents col-sm-4">
          <div className="test-body">
            <div className="item">
            
              <div className='imagedata mb-3'>
                <p className='reviewername m-0'>
                  {data.name.charAt(0).replace(/\b\w/g, c => c.toLocaleUpperCase())}
                </p>
              </div>
              <p>⭐⭐⭐⭐⭐</p>
              <div className="reviewname m-0">
                {data.name.replace(/\b\w/g, c => c.toLocaleUpperCase())}
              </div>
              <p className="reviewcontent">{data.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
     </div>
        </div>
  )
}

export default Reviewslider
