import React, { useEffect, useState } from 'react';
import AddTextForm from './AddText';
import AddPhotoForm from './AddPhoto';
import { uploadPhotoAndStoreUrl } from 'components/firebase/firebase-config';
import { FormLabel } from '@chakra-ui/react';

const DescriptionComponent = ({ description, onDescriptionChange, userData , state }) => {
  const [textArray, setTextArray] = useState(description.text || []);
  const [photoArray, setPhotoArray] = useState(description.photos || []);
  const [items, setItems] = useState([]); 

  const handleTextSubmit = (text) => {
    const newTextArray = [...textArray, text];
    setTextArray(newTextArray);
    const newItems = [...items, { type: 'text', value: text }];
    setItems(newItems);
    onDescriptionChange(newItems);
  };
  
  const handlePhotoSubmit = async (photo) => {
    const photoUrl = await uploadPhotoAndStoreUrl(userData[0].uid, photo);
    setPhotoArray([...photoArray, photoUrl]);
    const newItems = [...items, { type: 'photo', value: photoUrl }];
    setItems(newItems);
    onDescriptionChange(newItems);
  };
  

  return (
    <div>
    <FormLabel>Description</FormLabel>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.type === 'text' && <p>{item.value}</p>}
            {item.type === 'photo' && <img src={item.value} alt="Photo" />}
          </li>
        ))}
      </ul>
      <AddTextForm style={{marginLeft:'10px'}} onSubmit={handleTextSubmit} />
      <AddPhotoForm style={{marginLeft:'10px'}} onSubmit={handlePhotoSubmit} />
    </div>
  );
};

export default DescriptionComponent;
