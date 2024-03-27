import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { db, uploadPhotoAndStoreUrl } from "components/firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import DescriptionComponent from "./addDescription";

const ProjectFormAdd = ({ userData  , name , description , deleteDocs , arg}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages , setMessages] =useState([])
  const [aprroved , setApproved] =useState(false)
  const [photos, setPhotos] = useState([]);
  const [change , setChange] = useState();
  const [projectData, setProjectData] = useState({
    name: name,
    description: '',
  });

  const [usersProjects, setUsersProjects] = useState([]);
  const [userDataT, setUserData] = useState(null);
  useEffect(() => {
    if (userData && userData.length > 0 && userData[0].id) {
      const fetchRequests = async(userId) =>{
         const messagesCollection = collection(db , 'Messages')
         const q = await query(messagesCollection , where(`userId`,  '==' , `${userId}`))
       
       const docSnap = await getDocs(q);
       const data = docSnap.docs.map((doc) =>({id:doc.id , ...doc.data()})) 
       setMessages(data)
      }
    
    
    
      const fetchProjects = async () => {
        const projectsCollection = collection(db, 'projects');
        const querySnapshot = await getDocs(where(projectsCollection, 'userId', '==', userData[0].id));
        const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsersProjects(projects);
      }
      fetchRequests(userData[0].id)
      fetchProjects();
    }
  }, [userData]);

  

  const handleInputChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };


  
  
  
  
  const handleDescriptionChange = (newDescription) => {
    setProjectData({
      ...projectData,
      description: newDescription,
    });
  };
console.log(projectData.description)

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const projectCollection = collection(db, 'projects');
  const photoUrls = await Promise.all(photos.map(photo => uploadPhotoAndStoreUrl(userData[0].uid, photo)));
  const newProjectRef = await addDoc(projectCollection, {
    userId: userData[0].id,
    userName: userData[0].name,
    name: projectData.name,
    description: projectData.description,
    status: 'pending',
    photos: photoUrls,
    club: userData[0].club,
  });
  alert('Project request sent for approval.');
  deleteDocs(arg)
  console.log(newProjectRef.id)
};


  useEffect(() => {
    if (userData && userData.length > 0 && userData[0].id) {
      setUserData(userData[0])
      console.log(userData[0])
    }
  }, [userData]);

  return (
    <>
      <Button color={"green"} backgroundColor={"white"} onClick={onOpen}>Add Project</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody  >
            <FormControl paddingBottom={15}>
              <FormLabel>Project name</FormLabel>
              <Input type="text" name="name" value={projectData.name} onChange={handleInputChange}
              />
            </FormControl>
             <DescriptionComponent state={change}  description={projectData.description} onDescriptionChange={handleDescriptionChange} userData={userData} />
            <FormControl mt={4}>
              <FormLabel>Photo Slider</FormLabel>
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
  );
}

export default ProjectFormAdd;
