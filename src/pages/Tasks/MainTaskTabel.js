import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Center, Flex, Heading } from "@chakra-ui/react";
import ProjectReqForm from "../../AdminDashboard/Project/projedctReqForm";
import TaskAdd from "../../AdminDashboard/Project/sjdns";
import MessagesModal from "./DesMess";


export default function MainTaskTabel({userData , isMobile}){

const [tasks  ,setTasks] = useState([])
const [showProjects , setShowProjects] = useState(false)
useEffect(()=>{
  const fetchTasks = async() =>{
    const tasksCollection = collection(db , 'Tasks')
    const snapshot = await getDocs(tasksCollection) ;
    const data = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()} ) )
    setTasks(data)
  }
    fetchTasks()
} , [])

return(
<>

        
   
                <h2 id="els">Tasks List</h2>
                 
                  
            
            <table id="tbl">
                <thead>
                    <tr>
                       {isMobile ?  <th>Details</th>: <><th>Task Name</th>
                        <th>Task id</th>
                        <th>User</th>
                        <th>Status</th>
                        </>} 
                       
                    </tr>
                </thead>
                <tbody>
    {showProjects ? tasks.map((project) => (
        <tr key={project.id}>
          { isMobile ? <td style={isMobile ? {padding:'10px' }: null}><MessagesModal Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> : <> <td>{project.name}</td>
            <td>{project.id}</td>
            <td>{project.usersRole}</td>
            <td>{project.status}</td></>}
           
        </tr>
    )) : tasks.slice(0, 5).map((project) => (
        <tr key={project.id}>
        { isMobile ? <td style={isMobile ? {padding:'10px' }: null}><MessagesModal Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> : <> <td>{project.name}</td>
            <td>{project.id}</td>
            <td>{project.usersRole}</td>
            <td>{project.status}</td></>}

        </tr>
    ))}
</tbody>

            </table>
            <a  onClick={() => setShowProjects(!showProjects)}>{showProjects ? 'Close' : 'Show All'}</a>
            
            
           
          
      

</>

)





}