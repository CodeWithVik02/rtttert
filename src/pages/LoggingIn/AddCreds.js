import React , { useState }from 'react'
import { auth , db } from '../../components/firebase/firebase-config';
import { addDoc , collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
// Checkbox,
  Stack,
//   Link,
  Button,
  Heading,
//   Text,
  useColorModeValue,
//   Image,
} from '@chakra-ui/react';
export default function AddCreds({user, setLoading, setLogged}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const addUser = async (e)=>{
        e.preventDefault();
        //setLoading(true);
        await addDoc(collection(db, "Users"), {
            uid: user.uid,
            name: name,
            surname:surname,
            authProvider: "harryFultzProjects",
            email: user.email,
            type: "user",
            status: 'disabled'
          })
         // setLogged(!!auth.currentUser)
          navigate("/")
         // setLoading(false)
    }

    return (
        <Flex
          minH={'100vh'}
          align={'flex-start'}
          justify={'center'}
          >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Add Your Credentials</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              style={{border:"1px solid rgba(0, 0, 0, 0.3)"}}>
              <form onSubmit={addUser}>
              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" onChange={(e)=>{setName(e.target.value)}}/>
                </FormControl>
                <FormControl id="surname">
                  <FormLabel>Surname</FormLabel>
                  <Input type="text" onChange={(e)=>{setSurname(e.target.value)}}/>
                </FormControl>
                <Stack spacing={10} style={{flexFlow:"wrap"}}>
                </Stack>
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
                type="submit">
                Add Credentials
              </Button>
              </Stack>
              </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      );
}
