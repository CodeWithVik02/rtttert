import { Center, useBreakpointValue, useToast } from "@chakra-ui/react";
import { db } from "components/firebase/firebase-config";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { AlertDialogExample } from "../Alert/Alert";




import EventForm from "./AddEvent";



export default function EventList({userData}){
  const [eventData , setEventData] = useState([]) ;
  const [showEvent , setShowEvent] = useState(false)
  const toast = useToast();
  useEffect(()=>{
  
  const fetchEvents = async() =>{
     const eventsCollection = collection(db , 'Event')
     const snapshot = await getDocs(eventsCollection) 
     const events = snapshot.docs.map(doc => ({id: doc.id , ...doc.data()}))
     setEventData(events)
  }
  fetchEvents()
  const unsubscribe = onSnapshot(collection(db, 'Event'), () => {
    fetchEvents();
  });

  return unsubscribe; 
  } , [ ])
  
  
  const handleDelete = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'Event', eventId));
    } catch (error) {
      console.error('Error deleting club: ', error);
    }}
  
  
  const isMobileView = useBreakpointValue({ base: true, lg: false });
  return(
   
    <main>
    <Heading  size="lg"  textAlign="center" >
              Events Manager
              </Heading>
    <div className="recent-orders">
       <h2 id="els">Events List</h2>
        <table id='tbl'>
        <thead>
         <th>Event ID</th>
         <th>Event Name</th>
    {   isMobileView ? null :   <th>Delete</th>}
        </thead>
        <tbody>
          { showEvent ? (eventData.map((event) => (
             <tr key={event.id}>
               <td>{event.id}</td>
               <td>{event.name}</td>
               { isMobileView ? null  : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(event.id)}/></td> }
             </tr>
          )) ): (eventData.slice(0,5).map((event) => (
             <tr key={event.id}>
               <td>{event.id}</td>
               <td>{event.name}</td>
               { isMobileView ? null  : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(event.id)}/></td> }
             </tr>
          )) )
          }
         
         
        </tbody>
        </table>
        <a onClick={() => setShowEvent(!showEvent)}>{showEvent ? 'Close' : 'Show All'}</a>
        <Center padding={10}>
         <EventForm  userData={userData}/>
         </Center>
    </div>
    </main>
    
  
  )
  



}