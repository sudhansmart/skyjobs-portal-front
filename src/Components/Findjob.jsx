import React from 'react'
import { Jobs } from './Jobs'
import { Footer } from './Footer'
import navlogo from "../assets/Images/skylarklogo1.png";
import { Helmet } from 'react-helmet';
const Findjob = () => {

  
  return (
    <div>
       <Helmet>
        {/* Basic SEO meta tags */}
        <title>Skylarkjobs.com|Your Gateway to Top Jobs in MNCs & US Firms</title>
        <meta name="description" content="Skylarkjobs.com, a Job Portal for mid & senior management. Explore high paying jobs for active job seekers and those waiting a great match. Register Now." />
        <meta name="keywords" content="Job seekers
                                  Job titles,
                                  Job description,
                                  it jobs,
                                  bpo jobs,
                                  marketing jobs,
                                  digital marketing jobs,
                                  customer service jobs,
                                  operation jobs,
                                  finance jobs" />
        <meta name="author" content="Skylarkjobs" />

        {/* Open Graph meta tags for Facebook */}
        <meta property="og:title" content="Skylarkjobs" />
        <meta property="og:description" content="Skylarkjobs.com, a Job Portal for mid & senior management. Explore high paying jobs for active job seekers and those waiting a great match. Register Now." />
        <meta property="og:image" content={navlogo}/>
        <meta property="og:url" content="https://skylarkjobs.com" />
        <meta property="og:type" content="website" />

        {/* Instagram specific meta tags */}
        <meta property="og:site_name" content="Skykarkjobs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter card meta tags (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Skykarkjobs" />
        <meta name="twitter:title" content="Skykarkjobs" />
        <meta name="twitter:description" content="Skylarkjobs.com, a Job Portal for mid & senior management. Explore high paying jobs for active job seekers and those waiting a great match. Register Now." />
        <meta name="twitter:image" content={navlogo}/>
      </Helmet>
        <Jobs/>
        <Footer/>
    </div>
  )
}

export default Findjob