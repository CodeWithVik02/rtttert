
import { Button, Center, Heading } from "@chakra-ui/react";
import { db } from "../../components/firebase/firebase-config";

import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MessagesModal from "./DesMess";

export default function PrivateTable({userData , isMobile}) {
    const [showProjects, setShowProjects] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (userData && userData.length > 0 && userData[0].id) {
            const fetchRequests = async (userId) => {
                const messagesCollection = collection(db, 'Tasks');
                const q = query(messagesCollection, where(`user`, '==', `${userId}`));

                const docSnap = await getDocs(q);
                const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(data);
            };

            fetchRequests(userData[0].id);
        }
    }, [userData]);

    

    return (
        <main>
       
 <div className="recent-orders">
                <h2 id="els">Tasks List</h2>
                 
                  
            
            <table id="tbl">
                <thead>
                    <tr>
                       {isMobile ?  <th>Details</th>: <>
                        <th>Task Name</th>
                        <th>Task id</th>
                        <th>Status</th>
                        </>} 
                       
                    </tr>
                </thead>
                <tbody>
    {showProjects ? messages.map((project) => (
        <tr key={project.id}>
          { isMobile ? <td><MessagesModal Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> : <> <td>{project.name}</td>
            <td>{project.id}</td>
            <td>{project.status}</td></>}
           
        </tr>
    )) : messages.slice(0, 5).map((project) => (
        <tr key={project.id}>
        { isMobile ? <td><MessagesModal Status={project.status}  Id={project.id} Name={project.name} Description={project.description}/></td> : <> <td>{project.name}</td>
            <td>{project.id}</td>
            
            <td>{project.status}</td></>}

        </tr>
    ))}
</tbody>

            </table>
            <a  onClick={() => setShowProjects(!showProjects)}>{showProjects ? 'Close' : 'Show All'}</a>
            
            
           
          
        </div>
     

        </main>
    );
}
