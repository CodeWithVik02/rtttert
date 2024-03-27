import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { db, uploadPhotoAndStoreUrl } from "components/firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";



export default function EventForm({userData}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [photos, setPhotos] = useState([]);
    const [clubsData , setClubsData] = useState([]);
    const [sowToast , setShowToast] = useState(false);
    const toast = useToast();
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    clubId: '',
    clubName: '',
    
  });
  useEffect(() => {
    const fetchClubs = async ()=>{
     const clubsCollection = collection(db , 'Clubs') ;
     const snapshot = await getDocs(clubsCollection) ;
     const clubData = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()} ) ); 
     setClubsData(clubData)
    } 
    fetchClubs()
    
    }, [] )
 






  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const eventCollection = collection(db, 'Event');
    const photoUrls = await Promise.all(photos.map(photo => uploadPhotoAndStoreUrl(userData[0].uid, photo)));
    await addDoc(eventCollection, {
      name: eventData.name,
      description: eventData.description,
      clubId: eventData.clubId,
      clubName: eventData.clubName,
      photos: photoUrls,
    });
  
    toast({
      title: 'Project Send.',
      description: 'Project request send successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };
  
  

      
      
return(
<>
        <Button color={"green"} backgroundColor={"white"} onClick={onOpen}>Add Event</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              <FormControl>
              <FormLabel>Event tittle</FormLabel>
              <Input  type="text" name="name" value={eventData.name} onChange={handleInputChange}
       />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event description</FormLabel>
              <Input name="description" value={eventData.description} onChange={handleInputChange}
        required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Club</FormLabel>
                 <Select placeholder="Select Club" onChange={(e) => setEventData({ ...eventData, clubId: e.target.value.split(',')[0], clubName: e.target.value.split(',')[1] })}>
                   {clubsData.map((club) => (
                     <option key={club.id} value={`${club.id},${club.name}`}>{club.name}</option>
                       ))}
                 </Select>
             </FormControl>

           <FormControl mt={4}>
            <FormLabel>Photo</FormLabel>
            <input type="file" accept="image/*" onChange={handlePhotoChange} multiple />
           </FormControl>
            </ModalBody>
            
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleFormSubmit}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>


)

}


