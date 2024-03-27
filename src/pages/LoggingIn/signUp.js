import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Stack,
  // Link,
  Button,
  Heading,
  // Text,
  useColorModeValue,
  // Image,
} from '@chakra-ui/react';
// import { Link as LoggingLink , NavLink} from 'react-router-dom';
import { useState } from 'react';
import { registerWithEmailAndPassword } from '../../components/firebase/firebase-config';
import { auth } from '../../components/firebase/firebase-config';
export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [surname, setSurname] = useState();
    const [pass, setPass] = useState();
    const signUp = (e)=>{e.preventDefault();registerWithEmailAndPassword(username, surname , email , pass)}
  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      style={{width:"max-content", minWidth:"30%", margin:"0 auto"}}
      >
      <form onSubmit={signUp} style={{width:"100%"}}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create a new user</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          style={{border:"1px solid rgba(0, 0, 0, 0.3)"}}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
            </FormControl>
            <FormControl id="surname">
              <FormLabel>Surname</FormLabel>
              <Input type="text" onChange={(e)=>{setSurname(e.target.value)}}/>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e)=>{setPass(e.target.value)}}/>
            </FormControl>
            <Stack spacing={10}>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create New User
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      </form>
    </Flex>
  );
}