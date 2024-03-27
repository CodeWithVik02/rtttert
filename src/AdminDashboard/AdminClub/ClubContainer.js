import React from "react";
import ListClubs from "./createClub";
import ClubForm from "./clubForm";
import { Flex } from "@chakra-ui/react";

export default function ClubContainer({userData}){
    return(
    <>
    <ListClubs userData={userData} />
    </>
    
    
    )
}