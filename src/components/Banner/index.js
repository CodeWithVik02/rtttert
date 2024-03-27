import React from "react";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Show,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
function Banner({isLogged}) {
  return (
    <Container
      size="md"
      pt={{ base: "0.5rem", md: "3.75rem" }}
      pr={{ xl: "0.25rem" }}
    >
      <HStack justify={{ base: "start", md: "center", xl: "space-between" }}>
        <VStack
          maxW={{ md: "28.125rem", xl: "100%" }}
          align={{ base: "start", md: "center", xl: "start" }}
          textAlign={{ base: "start", md: "center", xl: "start" }}
          spacing={{ base: "1.6rem", md: "1.65rem" }}
        >
          <Heading as="h1" size="3xl">
            Menaxhoni projektet tuaja
          </Heading>
          <Text color="muted" lineHeight="taller">
            Instituti "Harry Fultz" ka menduar per projektet jashte shkollore dhe ne bashkepunim me nxenesit dhe mesuesit e shkolles ka krijuar nje website per menaxhimin e projekteve tuaja"
          </Text>
          { !(isLogged) ? <Link as={NavLink} to="/signIn">
            <Button colorScheme="blue">Krijoni Projektin Tuaj</Button>
          </Link> : <Link as={NavLink} to="/dashboard/home">
            <Button colorScheme="blue">Krijoni Projektin Tuaj</Button>
          </Link>}
        </VStack>
        <Show above="xl">
          <Image src="assets/images/robotic_hand.png" alt="Robotic Hand" style={{width:"63%"}}/>
        </Show>
      </HStack>
    </Container>
  );
}

export default Banner;
