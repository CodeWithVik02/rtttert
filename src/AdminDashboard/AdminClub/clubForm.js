import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { db, uploadPhotoAndStoreUrl } from "components/firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";



export default function ClubForm({userData}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [photo, setPhoto] = useState(null);
    const [sowToast , setShowToast] = useState(false);
    const toast = useToast();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const clubsCollection = collection(db, 'Clubs');
    
    
          const photoUrl = await uploadPhotoAndStoreUrl(userData[0].uid  , photo);
    
          // Add club data to Firestore
          await addDoc(clubsCollection, {
            name,
            department,
            photoUrl
          });
    
    
          setName('');
          setDepartment('');
          setPhoto(null);
    
          toast({
            title: 'Club created.',
            description: "Club has successfully been created",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } catch (error) {
          console.error('Error adding club: ', error);
          alert('Error adding club, please try again.');
        }
      };
      
      
return(
<>
        <Button color={"green"} backgroundColor={"white"} onClick={onOpen}>Add Club</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Club</ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="Name" value={name} onChange={e =>setName(e.target.value)}
        required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Department</FormLabel>
              <Input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)}
        required />
            </FormControl>
           <FormControl mt={4}>
            <FormLabel>Photo</FormLabel>
            <input  type="file" placeholder="Department" onChange={e => setPhoto(e.target.files[0])}required />
           </FormControl>
            </ModalBody>
            
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>


)

}


