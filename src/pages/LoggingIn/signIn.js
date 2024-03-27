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
  Image,
  // Alert,
  // AlertIcon
} from '@chakra-ui/react';


import { Link as LoggingLink, NavLink} from 'react-router-dom';
import { useState , useEffect } from 'react';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider }  from "firebase/auth";
import { auth , googleProvider } from '../../components/firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function SignIn({setLogged, isLogged, setLoading}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    if(isLogged === true){
      navigate("/");
    }
  },[isLogged])
    // const signInWithGoogle = async () => {
  //   try{
  //     const res = await signInWithGoogle(auth, googleProvider);
  //     const user = res.user;
  //     const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //     const docs = await getDocs(q);
  //     if(docs.docs.length === 0){
  //       await addDoc(collection(db, "users"), {
  //         uid:user.uid,
  //         name:user.displayName,
  //         authProvider: "google",
  //         email:user.email,
  //       })
  //       setLogged(!!auth.currentUser)
  //     }
  //   }catch(err){
  //     console.log(err);
  //     setLogged(!!auth.currentUser)
  //   }
  // }
  const logInWithEmailAndPassword = async () => {
    // if(!(email.includes("harryfultz"))){
    //   console.log(false)
    // }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      setLoading(false);
      setLogged(!!auth.currentUser)
    }
  };
  function signIn(e){
    e.preventDefault();
    logInWithEmailAndPassword();
  }
  const appleProvider = new OAuthProvider('apple.com');
  const signInWithApple = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, appleProvider);
    } catch (err) {
      setLoading(false);
      setLogged(!!auth.currentUser);
      // Handle any errors here
    }
  };
  function sigInNewMethod(){
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    }).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  
  
  return (
    <>
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          style={{border:"1px solid rgba(0, 0, 0, 0.3)"}}>
          <Stack spacing={4}>
          <form onSubmit={signIn}>
          <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={e=>{setEmail(e.target.value)}}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={e=>{setPass(e.target.value)}}/>
            </FormControl>
            <Stack spacing={10} style={{flexFlow:"wrap", marginTop:"20px"}}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'} style={{width:"100%"}}>
                {/* <Checkbox>Remember me</Checkbox> */}
                <Text fontSize={'lg'} color={'gray.600'} style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                <Button bg={'transparent'} _hover={{bg: 'transparent',}}  _active={{ bg: 'transparent',}}  _focus={{border:"none"}} w={'20px'} padding={0}><Image src={require("../../assets/images/google.png")} style={{width:"20px", height:"auto"}} onClick={sigInNewMethod}></Image> </Button>
                </Text>
                <LoggingLink as={NavLink} color={'blue.400'} to="/forgetPass">Forgot password?</LoggingLink>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                style={{width:"calc(100%)", marginRight:"20px"}} type="submit">
                Sign in
              </Button>
            </Stack>
          </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    {/* <Stack spacing={3} maxW={'lg'} position={'fixed'} bottom={0} right={'0'} maxWidth={'100%'}>
        <Alert status='error' variant='solid'>
          <AlertIcon />
          Couldn' Login In
        </Alert>
      </Stack> */}
    </>
  );
}