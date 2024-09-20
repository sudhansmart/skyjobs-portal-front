import React, { useState } from 'react';

function PdfViewer() {
  const [pdfId, setPdfId] = useState('65eebf61db2efcd2ba2e939f');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

 

  return (
    <div className='d-flex justify-content-center'>
      {pdfId && (
        <iframe
          src={`https://www.skylarkjobs.com/nodejs/file/pdfs/${pdfId}`}
          width= '300'
           height='400'
          title="PDF"
        ></iframe>
      )}
     
    
    </div>
  );
}

export default PdfViewer;
