import { Heading, useBreakpointValue } from "@chakra-ui/react";
import { db } from "components/firebase/firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import CreateUser from "pages/CreateUser/CreateUser";
import React  , {useEffect , useState} from "react";



export default function UserList(){
const [clubsData , setClubsData] = useState([])
const [showProjects ,  setShowProjects] = useState(false)
const [showDetails , setshowDetails] = useState(false)
const [users, setUsers] = useState([]);
const isMobileView = useBreakpointValue({ base: true, lg: false });



useEffect(()=>{
  const fetchClubs = async ()=>{
    const clubsCollection = collection(db , 'Clubs') ;
    const snapshot = await getDocs(clubsCollection) ;
    const clubData = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()} ) ); 
    setClubsData(clubData)
   } 
  const fetchUsers = async () => {
    try {
      const userCollection = collection(db, 'Users');
      const snapshot = await getDocs(userCollection);
      const UserData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(UserData);

    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
};
fetchClubs()
      fetchUsers()

} , [])
const handleClubChange = async (event ,  userId) =>{
  const selectedClub = event.target.value
  const usersCollection = collection(db, 'Users');
        const specificDocument = doc(usersCollection, userId);
        await updateDoc(specificDocument, { club: selectedClub });

}
const handleStatusChange = async (event, userId) => {
  const selectedStatus = event.target.value;
  const usersCollection = collection(db, 'Users');
  const specificDocument = doc(usersCollection, userId);
  await updateDoc(specificDocument, { status: selectedStatus });
};


 console.log(users)
  return(
 
 
 <>
 <main>
      <Heading  size="lg"  textAlign="center" >
              User Manager
              </Heading>
      <div className="recent-orders">
              
      <h2 id="els">Users List</h2>
          <table id="tbl">
 
         <thead>
           <tr>
              <th>Users Id</th>
              <th>Users Name</th>
              <th>Users Club</th>
            </tr>
          </thead>
          <tbody>
          {  showProjects ?
          (users.map((user) =>(
             <tr key={user.uid}>
               <td>{user.uid}</td>
               <td>{user.name }</td>
               <td>
                {clubsData.find((club) => club.id === user.club)?.name || 'N/A'}
            </td>
             </tr>
           ))
           ) : (users.slice(0 , 5).map((user) =>(
             <tr key={user.uid}>
               <td>{user.uid}</td>
               <td>{user.name }</td>
               <td>
                {clubsData.find((club) => club.id === user.club)?.name || 'N/A'}
            </td>
             </tr>
           ))
           )  }
          </tbody>
        </table>
        <a onClick={() => {setShowProjects(!showProjects)}}>{showProjects ? 'Close' : 'Show All'}</a>
      <h2 id="els">Users Manage</h2>
         <table id="tbl">
 
         <thead>
           <tr>
             {isMobileView ? null : <th>Users Id</th>}
              <th>Users Name</th>
              <th>Users Club</th>
              <th>Users Status</th>
            </tr>
          </thead>
          <tbody>
          {  showDetails ? 
          (users.map((user) =>(
             <tr key={user.uid}>
             {isMobileView ? null : <td>{user.uid}</td>}  
               <td>{user.name }</td>
               <td>   
                            <select onChange={event =>handleClubChange(event, user.id)} value={user.club}>
    {clubsData.map((club) => (
        <option key={club.id} value={club.id}>{club.name}</option>
    ))}
</select>   
                               </td>
                               <td>
                    <select onChange={event => handleStatusChange(event, user.id)} value={user.status}>
                      <option value="approved">Approved</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </td>
             </tr>
           ))
           ) : (users.slice(0 , 5).map((user) =>(
             <tr key={user.uid}>
             {isMobileView ? null : <td>{user.uid}</td>}  
               <td>{user.name }</td>
               <td>   
                            <select onChange={event =>handleClubChange(event, user.id)} value={user.club}>
    {clubsData.map((club) => (
        <option key={club.id} value={club.id}>{club.name}</option>
    ))}
</select>   
                               </td>
                               <td>
                    <select onChange={event => handleStatusChange(event, user.id)} value={user.status}>
                      <option value="approved">Approved</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </td>
             </tr>
           ))
           ) }
          </tbody>
        </table>
        <a onClick={() => {setshowDetails(!showDetails)}}>{showDetails ? 'Close' : 'Show All'}</a>
      </div>
 </main>
 
 </>
 
)
    

}