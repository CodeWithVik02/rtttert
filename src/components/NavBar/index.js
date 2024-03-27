import React from "react";

import { NavLink } from "react-router-dom";
import { Box, Button, Container, HStack, Link, Show } from "@chakra-ui/react";

import Logo from "./assets/svg/logo.svg";

function NavBar() {
  return (
    <Container size="lg" py="2.5rem" style={
      {
        background:"#003867",
        margin: 0,
        padding: "10px calc((100% - 1280px) / 2)",
        maxWidth: "100%",
      }
    }>
      <HStack>
        <Box w="100%" position="relative">
          <Link
            as={NavLink}
            to="/"
            transform="auto"
            translateY="-0.2rem"
            _focus={{ boxShadow: "none" }}
          >
            <Logo style={{height:"30px"}}/>
          </Link>
        </Box>
        <Show above="lg">
          <HStack w="auto" spacing="3.75rem">
            <Link as={NavLink} to="/">
              Home
            </Link>
            <Link as={NavLink} to="/clubs">
              Clubs
            </Link>
            <Link as={NavLink} to="/events">
              Events
            </Link>
          </HStack>
        </Show>
        <Show above="sm">
          <HStack w="100%" justify="flex-end" style={{
              width: "max-content",
              marginLeft: "30px",
              }}>
                <Button colorScheme="gray" fontWeight="400">
                <Link as={NavLink} to="/signIn" style={{color:"#000"}}> Sign In</Link>
                </Button>
          </HStack>
        </Show>
      </HStack>
    </Container>
  );
}

export default NavBar;
