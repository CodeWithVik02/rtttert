import React, { useState } from 'react';
import './stl.css'
import { GrCloudUpload } from "react-icons/gr";
import { Button } from '@chakra-ui/react';
const AddPhotoForm = ({ onSubmit }) => {
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photo) {
      onSubmit(photo);
      setPhoto(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => {
          const selectedPhoto = e.target.files[0];
          setPhoto(selectedPhoto);
        }}
        id='image-upload'
        
      />
    
    <Button marginLeft={30} size='sm' colorScheme='teal' type="submit">Add Photo</Button>
    </form>
  );
};

export default AddPhotoForm;

