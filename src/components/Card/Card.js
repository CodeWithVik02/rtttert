import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function CardComp({ name, linkid, images  , clubsId}) {
  

  return (
    <Center py={12}>
     {!(window.location.href.includes(`clubs/${clubsId}/`)) 
      ? <Link to={`/clubs/${clubsId}/${linkid}`} style={{minWidth:"100%"}}>
      <Box
        role={'group'}
        
        maxW={'100%'}
        w={'full'}
        
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        overflow={'hidden'} // Hide overflow to ensure the image fills the box
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'330px'}
          
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: '100%',
            h: 'full',
            pos: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: `url(${images[0]})`,
            backgroundSize: 'cover', // Fill the box with the background image
            backgroundPosition: 'center', // Center the background image
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
             color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            },
          }}
        ></Box>
        <Stack p={7} align={'center'} justifyContent={'flex-start'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={700}>
            {name}
          </Heading>
        </Stack>
      </Box></Link> : <Box
        role={'group'}
        
        maxW={'100%'}
        w={'full'}
        
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        overflow={'hidden'}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'330px'}
          
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: '100%',
            h: 'full',
            pos: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: `url(${images[0]})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
             color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            },
          }}
        ></Box>
        <Stack p={7} align={'center'} justifyContent={'flex-start'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={700}>
            {name}
          </Heading>
        </Stack>
      </Box>}
    </Center>
  ); 
}
