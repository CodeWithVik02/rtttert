import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { db } from "../../components/firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";



export default function ProjectReqForm({ isMobile }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const toast = useToast();
    const [projectData, setProjectData] = useState({
      name: '',
      description: '',
    });
  

  
    const handleInputChange = (e) => {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const messagesCollection = collection(db, 'Messages');
      await addDoc(messagesCollection, {
        name: projectData.name,
        description: projectData.description,
      });
  
      toast({
        title: 'Project Send.',
        description: 'Project has successfully been send',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    };
  
    return (
      <>
        <Button color={"green"} backgroundColor={"white"} onClick={onOpen}>Send Message</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send Message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Message title</FormLabel>
                <Input type="text" name="name" value={projectData.name} onChange={handleInputChange} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Message description</FormLabel>
                <Input name="description" value={projectData.description} onChange={handleInputChange} required />
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
    );
  }

  


