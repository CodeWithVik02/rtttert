import React, { useEffect, useState } from 'react';
import { db } from 'components/firebase/firebase-config';
import { collection , addDoc, getDocs, doc, deleteDoc  } from 'firebase/firestore';
import { uploadPhotoAndStoreUrl } from 'components/firebase/firebase-config';
import { Center, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { AlertDialogExample } from '../Alert/Alert';
import ClubForm from './clubForm';

const ListClubs = ({userData}) => {
  const [clubData , setClubData] = useState([]);
  const [showClub , setShowClub] = useState(false)
  const isMobileView = useBreakpointValue({ base: true, lg: false });
   useEffect(() =>{
     const fetchClubs = async () => {
       const clubsCollection = collection(db , 'Clubs')
       const snapshot = await getDocs(clubsCollection) ;
       const clubData = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()}) )
       setClubData(clubData) ;
       
   }
   fetchClubs()
   } , [] )



   const handleDelete = async (clubId) => {
    try {
      await deleteDoc(doc(db, 'Clubs', clubId));
    } catch (error) {
      console.error('Error deleting club: ', error);
    }}


  return (
  
    
    <main>
    <Heading  size="lg"  textAlign="center" >
              Clubs Maneger
              </Heading>
    <div className="recent-orders">
       <h2 id="els">Clubs List</h2>
        <table id='tbl'>
        <thead>
         <th>Clubs ID</th>
         <th>Clubs Name</th>
       <th>Clubs department</th>
    {   isMobileView ? null :   <th>Delete</th>}
        </thead>
        <tbody>
          { showClub ? (clubData.map((club) => (
             <tr key={club.id}>
               <td>{club.id}</td>
               <td>{club.name}</td>
               <td>{club.department}</td>
               { isMobileView ? null  : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(club.id)}/></td> }
             </tr>
          )) ): (clubData.slice(0,5).map((club) => (
             <tr key={club.id}>
               <td>{club.id}</td>
               <td>{club.name}</td>
               <td>{club.department}</td>
             { isMobileView ? null  : <td style={{padding:'10px'}}><AlertDialogExample ButtonClick={() => handleDelete(club.id)}/></td> }
             </tr>
          )) )
          }
         
         
        </tbody>
        </table>
        <a onClick={() => setShowClub(!showClub)}>{showClub ? 'Close' : 'Show All'}</a>
        <Center padding={10}>
         <ClubForm userData={userData}/></Center>
    </div>
    </main>
    
  );
}

export default ListClubs;
