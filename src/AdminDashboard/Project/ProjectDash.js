import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase-config";
import { collection, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { updateDoc, doc , deleteDoc } from 'firebase/firestore';
import { Center, Heading, useBreakpointValue, useToast } from "@chakra-ui/react";
import { AlertDialogExample } from "../Alert/Alert";
import { AlertDialogAccept } from "../Alert/AlertAccept";
import ProjectReqForm from "./projedctReqForm";


export default function ProjectDash({userData}) {
    const [projects, setProjects] = useState([{ club: userData[0]?.club }]);
    const [showProjects , setShowProjects] = useState(false)
    const [showDetails , setShowDetails] = useState(false)
    const [clubsData , setClubsData] = useState([])
    const toast = useToast();
    const isMobileView = useBreakpointValue({ base: true, lg: false });
    useEffect(() => {
    const fetchClubs = async ()=>{
     const clubsCollection = collection(db , 'Department') ;
     const snapshot = await getDocs(clubsCollection) ;
     const clubData = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()} ) ); 
     setClubsData(clubData)
    }
    
   
       
        const fetchProjects = async () => {
            const projectsCollection = collection(db, 'projects');
            const snapshot = await getDocs(projectsCollection);
            const projectsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
            
        };
        const projectIds = projects.map((project) => project.id);
        fetchProjects();
        fetchClubs()
      
        console.log(projectIds)
    }, []);
    
    
    const handleDelete = async (projectId) => {
        try {
            const projectsCollection = collection(db, 'projects');
            const specificDocument = doc(projectsCollection, projectId);
    
            
         
            const projectToDelete = await getDoc(specificDocument);
            if (projectToDelete.exists()) {
                const clubId = projectToDelete.data().club;
                if (clubId) {
                    const clubRef = doc(db, 'Clubs', clubId);
                    const subcollectionRef = collection(clubRef, 'projects');
                    const projectDocToDelete = doc(subcollectionRef, projectId);
                    await deleteDoc(projectDocToDelete);
                    
                }
                if(projectId){
                    await deleteDoc(specificDocument);
                }
            }
    
            const updatedProjects = projects.filter((project) => project.id !== projectId);
            setProjects(updatedProjects);
            toast({
                title: 'Project deleted.',
                description: "Project has successfully been deleted",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
        } catch (error) {
            console.error('Error deleting project:', error.message);
        }
    };
   
    
    console.log(projects)
    const handleClubChange = async (event, projectId) => {
        const selectedClub = event.target.value;  
        const projectToUpdate = projects.find((project) => project.id === projectId);
       
        if (projectToUpdate.club) {
            const previousClubRef = doc(db, 'Clubs', projectToUpdate.club);
            const previousSubcollectionRef = collection(previousClubRef, 'projects');
            const projectDocToDelete = doc(previousSubcollectionRef, projectId);
            await deleteDoc(projectDocToDelete);
        }
    
        const projectsCollection = collection(db, 'projects');
        const specificDocument = doc(projectsCollection, projectId);
        await updateDoc(specificDocument, { club: selectedClub });
    
     
        const clubRef = doc(db, 'Clubs', selectedClub);
        const subcollectionRef = collection(clubRef, 'projects');
        await setDoc(doc(subcollectionRef, projectId), {
            name: projectToUpdate.name,
            description: projectToUpdate.description ,
            photo: projectToUpdate.photos ,
            
        });
    
      
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === projectId ? { ...project, club: selectedClub } : project
            )
        );
    };
    
    
    return (
     <>   
     <main>
        
        <Heading  size="lg"  textAlign="center" >
              Project Manager
              </Heading>
 <div className="recent-orders">
                <h2 id="els">Projects List</h2>
                 
                  
            
            <table id="tbl">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project id</th>
                        <th>Project Club</th>
                        <th>User</th>
                      {isMobileView ? null : <th>Status</th>}  
                      {isMobileView ? null : <th></th>} 
                    </tr>
                </thead>
                <tbody>
    {showProjects ? projects.map((project) => (
        <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.id}</td>
            <td>
                {clubsData.find((club) => club.id === project.club)?.name || 'N/A'}
            </td>
            <td>{project.userName}</td>
            {isMobileView ? null : <td>{project.status}</td> }  
             {isMobileView ? null :  <td className="primary">Details</td>} 
        </tr>
    )) : projects.slice(0, 5).map((project) => (
        <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.id}</td>
            <td>
                {clubsData.find((club) => club.id === project.club)?.name || 'N/A'}
            </td>
            <td>{project.userName}</td>
            {isMobileView ? null : <td>{project.status}</td> }  
             {isMobileView ? null :  <td className="primary">Details</td>} 
        </tr>
    ))}
</tbody>

            </table>
            <a  onClick={() => setShowProjects(!showProjects)}>{showProjects ? 'Close' : 'Show All'}</a>
            
            
            <h2 id="els">Projects Request</h2>
            
            <table id="tbl">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project id</th>
                        <th>User</th>
                        <th>Add to Club</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {showDetails ? projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.id}</td>
                            <td>{project.userName}</td>
                            <td>   
                            <select onChange={event =>  handleClubChange(event, project.id)} value={project.club}>
    {clubsData.map((club) => (
        <option key={club.id} value={club.id}>{club.name}</option>
    ))}
</select>   
                               </td>
                 
                   {  isMobileView ? null : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(project.id)}/></td>}
                        </tr>
                    )) : projects.slice(0, 5).map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.id}</td>
                            <td>{project.userName}</td>
                            
                            <td>   
                            <select onChange={event => handleClubChange(event, project.id)} value={project.club}>
    {clubsData.map((club) => (
        <option key={club.id} value={club.id}>{club.name}</option>
      
    ))}
</select>   
                               </td>
                            
                   {  isMobileView ? null : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(project.id)}/></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <a  onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Close' : 'Show All'}</a>
          
        </div>
        <Center padding={10}>  <ProjectReqForm userData={userData} /> </Center>
        </main>
       
        </>
    );
}
