
import { Center, useBreakpointValue } from "@chakra-ui/react";
import { db } from "components/firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import ProjectFormAdd from "./UserMain/UserDashboard";
import UserMessages from "./UserMain/usersMessages";


export default function UsersProjectD({userData}){

const [user , setUser]= useState([])
const [showProjects , setShowProjects] = useState(false)
const isMobileView = useBreakpointValue({ base: true, lg: false });
useEffect(()=>{

   const fetchProjects = async(userId) =>{
       const projectsCollection = collection(db , 'projects');
       const q = await query(projectsCollection , where(`userId`,  '==' , `${userId}`))
       const docSnap = await getDocs(q);
       const data = docSnap.docs.map((doc) =>({id:doc.id , ...doc.data()})) 
      setUser(data)
   }

   fetchProjects(userData[0].id)
}   ,[])
console.log(user)
return(

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
                       <th>Status</th> 
                      {isMobileView ? null : <th></th>} 
                    </tr>
                </thead>
                <tbody>
    {showProjects ? user.map((project) => (
        <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.id}</td>
           <td>{project.status}</td>
             {isMobileView ? null :  <td className="primary">Details</td>} 
        </tr>
    )) : user.slice(0, 5).map((project) => (
      <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.id}</td>
           <td>{project.status}</td>
             {isMobileView ? null :  <td className="primary">Details</td>} 
        </tr>
    ))}
</tbody>

            </table>
            <a  onClick={() => setShowProjects(!showProjects)}>{showProjects ? 'Close' : 'Show All'}</a>
</div>
 <UserMessages userData={userData} />
    
   
</main>




)





}