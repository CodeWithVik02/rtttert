import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase-config";

export default function AddTask({userData}){

  const [users  , setUsers] = useState([])
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



   return(
   <>
   </>
   )

}