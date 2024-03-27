import React from "react";
import UserList from "./UserList";
import CreateUser from "pages/CreateUser/CreateUser";
import { Flex } from "@chakra-ui/react";
import PopUp from "components/PopUp/popUp";




export default function UserMangment({addUser}){
   return(
   <Flex direction={'column'}>
   <UserList/>
   </Flex>
     
   )
}