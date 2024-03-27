import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase-config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import ProjectReqForm from "../../AdminDashboard/Project/projedctReqForm";
import TaskAdd from "../../AdminDashboard/Project/sjdns";
import MessagesModal from "./DesMess";


export default function TaskTabel({userData , isMobile , dark}){

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
const deleteTask = async (taskId) => {
    const taskRef = doc(db, 'Tasks', taskId);
    await deleteDoc(taskRef);
    setTasks(tasks.filter(task => task.id !== taskId));
};
return(
<>
<main>
        
        <Heading  size="lg"  textAlign="center"  style={dark ? {color:'white'} : null }>
              Tasks Manager
              </Heading>
 <div className="recent-orders">
                <h2 id="els">Tasks List</h2>
                 
                  
            
            <table id="tbl">
                <thead>
                    <tr>
                       {isMobile ? null : <><th>Task Name</th>
                        <th>Task id</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Delete</th>
                        </>} 
                       <th>Details</th>
                    </tr>
                </thead>
                <tbody>
    {showProjects ? tasks.map((project) => (
        <tr key={project.id}>
          { isMobile ? null : <>
            <td>{project.id}</td>
            <td>{project.usersRole}</td>
            <td>{project.status}</td>
           </>}
           <td style={{padding:'10px'}}><MessagesModal Delete={deleteTask(project.id)}  Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> 
           <td><Button onClick={()=>{deleteTask(project.id)}} style={{backgroundColor:'red' , color:'white'}} >Delte</Button></td>
        </tr>
    )) : tasks.slice(0, 5).map((project) => (
        <tr key={project.id}>
        { isMobile ? null : <> <td>{project.name}</td>
            <td>{project.id}</td>
            <td>{project.usersRole}</td>
            <td>{project.status}</td></>
            }
            
            <td><Button onClick={()=>{deleteTask(project.id)}} style={{backgroundColor:'red' , color:'white'}} >Delte</Button></td><td style={{padding:'10px'}}><MessagesModal Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> 
        </tr>
    ))}
</tbody>

            </table>
            <a  onClick={() => setShowProjects(!showProjects)}>{showProjects ? 'Close' : 'Show All'}</a>
            
            
           
          
        </div>
        {isMobile ? <Flex style={{flexDirection:'column' , padding:'20px' , marginTop:'10px'}} gap={5}>{ userData[0].type === 'CEO' ?(<> <ProjectReqForm/><TaskAdd /></>) : <TaskAdd />}</Flex> :         <Center padding={10} gap={10}>{ userData[0].type === 'CEO' ?(<> <ProjectReqForm/><TaskAdd /></>) : <TaskAdd />} </Center>}

        </main>

</>

)





}