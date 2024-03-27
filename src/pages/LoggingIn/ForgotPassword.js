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
  Text,
  useColorModeValue,
  // Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { auth , sendPasswordReset } from '../../components/firebase/firebase-config';
export default function ForgetPass() {
  const [email, setEmail] = useState('');
  function sendLoginLink(){
    sendPasswordReset(auth, email);
  }
  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Trouble logging in?</Heading>
          <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
            Enter your email and we'll send you a link to get back into your account.
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          style={{border:"1px solid rgba(0, 0, 0, 0.3)"}}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={e=>{setEmail(e.target.value)}}/>
            </FormControl>
            <Stack spacing={10} style={{flexFlow:"wrap"}}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'} style={{width:"100%"}}>
                {/* <Checkbox>Remember me</Checkbox> */}
                <Button
                bg={'rgb(0, 56, 103)'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                style={{width:"100%"}}
                onClick={sendLoginLink}>
                Send Login Link
              </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}