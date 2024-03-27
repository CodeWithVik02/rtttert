import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { db } from "../../components/firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";



export default function TaskAdd({ userData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [usersData, setUsersData] = useState([]);
    const toast = useToast();
    const [projectData, setProjectData] = useState({
      name: '',
      description: '',
      status: 'pending' ,
      userId: '',
      userRole: '',
    });
  
    useEffect(() => {
      const fetchUsers = async () => {
        const usersCollection = collection(db, 'Users');
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsersData(usersData);
      };
    
      fetchUsers();
     
    }, []);
  
    const handleInputChange = (e) => {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const messagesCollection = collection(db, 'Tasks');
      await addDoc(messagesCollection, {
        name: projectData.name,
        description: projectData.description,
        user: projectData.userId ,
        usersRole: projectData.userRole ,
        status: 'pending'
      });
  
      toast({
        title: 'Task Send.',
        description: 'Project has successfully been send',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    };
  
    return (
      <>
        <Button color={"green"} backgroundColor={"white"} onClick={onOpen}>Add Task</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Task title</FormLabel>
                <Input type="text" name="name" value={projectData.name} onChange={handleInputChange} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Task description</FormLabel>
                <Input name="description" value={projectData.description} onChange={handleInputChange} required />
              </FormControl>
              <FormControl mt={4}>
                  <FormLabel>Select User</FormLabel>
                  <Select placeholder="Select User" onChange={(e) => {
                    const [userId, userRole] = e.target.value.split(',');
                    setProjectData({ ...projectData, userId, userRole });
                  }}>
                    {usersData.map((user) => (
                      <option key={user.id} value={[user.id, user.type]}>
                        {user.name} {user.surname}
                      </option>
                    ))}
                  </Select>
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

  


