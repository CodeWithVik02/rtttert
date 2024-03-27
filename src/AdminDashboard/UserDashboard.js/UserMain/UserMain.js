import { Heading, Image } from "@chakra-ui/react";
import { db } from "components/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export function UserMain({userData}){
const [users , setUsers] = useState([]) ;

useEffect(() =>{

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
    fetchUsers()
} , [] )
return(
<>
          <div className="user" >
            <Heading style={{ listStyle: 'none' }}>
               Welcome <span>{userData[0].name} {userData[0].surname}</span> 
            </Heading>
          </div>
       
      </>
)
}