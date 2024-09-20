import React, { useState, useRef,useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

function ImageCropUpload({selectedFile,fetchProfilePicture,setImgCrop,setModalShow}) {
  const [authId, setAuthId] = useState(localStorage.getItem('authId'));
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const[uploadFeedBack,setUploadFeedBack] = useState(" ");
  const [crop, setCrop] = useState({
    aspect : 1,
    unit: '%',
    width: 50,
    height: 50,
      x: 50,
      y: 50 
    
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);
  


  useEffect(() => {
    setSrc(URL.createObjectURL(selectedFile));
  }, [selectedFile])
 

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(blob.url);
        blob.url = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  const uploadImage = async () => {
    if (!completedCrop || !imageRef.current) {
      alert('Please crop the image first');
      return;
    }

    const croppedImageBlob = await getCroppedImg(imageRef.current, completedCrop, 'croppedImage.jpeg');
    const formData = new FormData();
    formData.append('photo', croppedImageBlob);

    try {
      const response = await axios.post(`https://www.skylarkjobs.com/nodejs/profile/uploadphoto/${authId}`, formData, {
        // const response = await axios.post(`http://localhost:5000/profile/uploadphoto/${authId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        fetchProfilePicture();
        setModalShow(false);
        setImgCrop(false);
      } else if(response.status === 202){
        setUploadFeedBack(response.data.error)
      }else if(response.status === 204){
        setUploadFeedBack(response.data.error)
      }
      else {
        console.error('Photo upload failed');
      }
      console.log('Image uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Row className='justify-content-center'>
  
        {src && (
          <Col md={8}>
            <ReactCrop
              src={src}
              aspect={1}
              onImageLoaded={(img) => {
                setImage(img);
                imageRef.current = img;
              }}
              crop={crop}
              onChange={setCrop}
              onComplete={setCompletedCrop}
            >
              <img
                ref={imageRef}
                alt='Crop me'
                src={src}
                style={{ maxWidth: '100%' }}
              />
            </ReactCrop>
            <p className='text-danger'>{uploadFeedBack}</p>
            <button className='btn btn-success' onClick={uploadImage}>Save</button>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default ImageCropUpload;
