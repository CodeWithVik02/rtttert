import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const AddTextForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />
      <Button marginLeft={'45px'} size='sm' colorScheme='teal' type="submit">Add Text</Button>
    </form>
  );
};

export default AddTextForm;
