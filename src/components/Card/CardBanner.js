import React from 'react';
// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  // Avatar,
  useColorModeValue,
  Image,
  Button,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";


export default function CardBanner({club, dep, img, linkId, userData}) {
  return (
    <Center py={6}>
      {!(window.location.href.includes("clubs/")) 
      ? <Link to={`/clubs/${linkId}`} style={{minWidth:"100%"}}>
      <Box
        maxW={'100%'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          overflow={'hidden'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Image
            src={img}
            layout={'fill'}
            minWidth={'100%'}
          />
        </Box>
        <Stack>
          <Heading
            
            fontSize={'2xl'}
            fontFamily={'body'}
            textAlign={'right'}>
            {club}
          </Heading>
        </Stack>
        <Text
            color={'rgb(0, 56, 103)'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
            textAlign={'right'}>
           
          </Text>
          {/* {userData.length && userData[0].type === "user" ? <Button display={'block'} marginLeft={'auto'} marginTop={'20px'} background={'#003867'} color={'#fff'} _hover={{background:"#003867", color:"#fff"}} >Join Club</Button> : null} */}
      </Box>
      </Link> 
      : 
      <Box
        maxW={'100%'}
        w={'full'}
     
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
          overflow={'hidden'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Image
            src={img}
            layout={'fill'}
            minWidth={'100%'}
          />
        </Box>
        <Stack>
          <Heading
            
            fontSize={'2xl'}
            fontFamily={'body'}
            textAlign={'right'}>
            {club}
          </Heading>
        </Stack>
        <Text
            color={'rgb(0, 56, 103)'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
            textAlign={'right'}>
          
          </Text>
          {/* {userData.length && userData[0].type === "user" ? <Button display={'block'} marginLeft={'auto'} marginTop={'20px'} background={'#003867'} color={'#fff'} _hover={{background:"#003867", color:"#fff"}} >Join Club</Button> : null} */}
      </Box>}
    </Center>
  );
}