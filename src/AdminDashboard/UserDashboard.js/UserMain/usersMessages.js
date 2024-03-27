import { Button, Center, Heading } from "@chakra-ui/react";
import { db } from "components/firebase/firebase-config";

import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import ProjectFormAdd from "./UserDashboard";
import MessagesModal from "./MessagesModal";


export default function UserMessages({userData}){
  const [showDetails , setShowDetails] = useState(false)
    const [messages , setMessages] =useState([])
    const [aprroved , setApproved] =useState(false)

    useEffect(() => {
        if (userData && userData.length > 0 && userData[0].id) {
          const fetchRequests = async(userId) =>{
             const messagesCollection = collection(db , 'Messages')
             const q = await query(messagesCollection , where(`user`,  '==' , `${userId}`))
           
           const docSnap = await getDocs(q);
           const data = docSnap.docs.map((doc) =>({id:doc.id , ...doc.data()})) 
           setMessages(data)
          }
        
        
         
          fetchRequests(userData[0].id)
          
        }
      }, [userData]);

      
   
const deleteMessage = async(projectId) =>{
        const collectionP = collection(db , 'Messages')
        const projectToDelete = doc(collectionP , projectId)
        await deleteDoc(projectToDelete)
        setMessages(prevMessages => prevMessages.filter(message => message.id !== projectId));
        }
  return(
  <main>
    <h2 id="els">
       Messages
    </h2>
    
    
    
    
    
         { messages.length > 0 ? 
         ( showDetails ? 
         (
    messages.map((message) =>(
    <>
    <div className="project">
               <div className="message">
               <div className="msg" >
               <p >You have got a new project</p>
               <MessagesModal Name={message.name} Description={message.description} />
               <ProjectFormAdd  name={message.name} userData={userData} deleteDocs={deleteMessage} arg={message.id}/>
             </div>
                   </div>
               </div>
    
    </>
    
    ))) : 
    (messages.slice(0 , 3).map((message) =>(
    <>
    <div className="project">
               <div className="message">
               <div className="msg" >
               <p style={{paddingBottom: '10px'}}>You have got a new project</p>
               <MessagesModal Name={message.name} Description={message.description} />
               <ProjectFormAdd  name={message.name} userData={userData} deleteDocs={deleteMessage} arg={message.id}/>
             </div>
                   </div>
               </div>
    
    </>
    
    ))) ) :
    <Center padding={20}><Heading>No Projects </Heading></Center>
    
       
    }
    <Center>
    <a style={{marginTop:'20px' , color:'var(--color-primary)'}} onClick={() =>  setShowDetails(!showDetails)}>{showDetails ? 'Close' : 'Show All'}</a>
  </Center>
  
  </main>
  
  
  )

}