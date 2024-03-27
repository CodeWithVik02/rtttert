import React from 'react'
import {
    Container,
    Spinner,
    Image,
  } from "@chakra-ui/react";
export default function Loading() {
  return (
    <Container
    size="md"
    pt={{ base: "0.5rem", md: "3.75rem" }}
    pr={{ xl: "0.25rem" }} height={"100%"}
    display={"flex"} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}
  >
    <Spinner color='#003867' size={"xl"}/>
  </Container>
  )
}
