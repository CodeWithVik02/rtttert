import { Heading, Image } from "@chakra-ui/react";
import { db } from "../../components/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export function UserList(){
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
	{users.type != 'admin' ? (
        users.map((user) => (
          <div className="user" key={user.uid}>
            {user.Photo ? (
              <img src={user.Photo} alt="User" />
            ) : (
      <Image src={require('../../assets/images/dfsdfs.png')}/>
            )}
            <li style={{ listStyle: 'none' }}>
              {user.name} {user.surname}
            </li>
          </div>
        ))
      ) : (
       <Heading>No users</Heading>
      )}</>
)
}