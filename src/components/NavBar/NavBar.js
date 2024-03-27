import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  // useColorModeValue,
  Stack,
  Show,
  // Image,
  // useMediaQuery,
} from '@chakra-ui/react';
import {FiMenu, FiX, FiUser} from "react-icons/fi"
import { NavLink , useNavigate } from 'react-router-dom';

import Logo from '../../assets/svg/logo.svg'
import MobileLogo from "../../assets/favicons/icon.svg"

import { auth } from "../firebase/firebase-config"
import { signOut } from "firebase/auth";

export default function NavBar({isLogged, isMobile}) {
  const navigate = useNavigate();
  const Links = ['home', 'clubs', 'events'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoStyle = isMobile ? "0 auto" : "0 auto 0 0";
  const LoggedLinks = [
    {
      txt:"Dashboard",
      href:"/dashboard/home"
    },
    {
      txt:"Your Projects",
      href:"/dashboard/yourProjects"
    },
  ];
  const singOutUser = ()=>{
    signOut(auth);
    navigate('/')
  }
  return (
    <>
      <Box bg={"#003867"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} padding={"0 calc((100% - 1280px)/2)"}>
          <IconButton
            size={'md'}
            bg={'transparent'}
            _focus={{border:"none"}}
            _hover={{background:'transparent'}}
            _active={{background:'transparent'}}
            icon={isOpen ? <FiX color={'white'} transform={'scale(1.3)'}/> : <FiMenu color={'white'} transform={'scale(1.3)'}/>}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box margin={logoStyle}><Link
            as={NavLink}
            to="/"
            transform="auto"
            translateY="-0.2rem"
            _focus={{ boxShadow: "none" }}
          >
            {isMobile ? <MobileLogo style={{transform:"scale(0.6)", position:"relative", left:"-10px"}}/> : <Logo style={{maxHeight:"60px"}}/>}
          </Link></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
               {Links.map((link) => (
                <Link as={NavLink} marginLeft={'30px !important'} key={link} to={`/${link === "home" ? "" : link}`} >{link[0].toUpperCase() + link.slice(1)}</Link>
              ))}
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
            {!(isLogged)
        ? 
          !(isMobile) ? <Show above="sm">
            <HStack w="100%" justify="flex-end" style={{
                width: "max-content",
                marginLeft: "30px",
                }}>
                <Link as={NavLink} to="/signIn" >
                  <Button colorScheme="gray" fontWeight="400" color={'#000'}>
                    Sign In
                  </Button>
                </Link>
            </HStack>
          </Show> : null
          
        : <Show above="sm">
            <HStack w="100%" justify="flex-end" style={{
                width: "max-content",
                marginLeft: "30px",
                marginRight:"10px",
                }}>
                  {/* <Button colorScheme="gray" fontWeight="400">
                  <Link as={NavLink} to="/signIn" style={{color:"#000"}}> Sign In</Link>
                  </Button> */}
                  {!(isMobile) ? <Menu>
                    <MenuButton as={Button} style={{padding:15, borderRadius:"50%", }}>
                      <FiUser />
                    </MenuButton>
                    <MenuList>
                      <Link as={NavLink} to="/dashboard/home"><MenuItem color={"#000"}>Dashboard</MenuItem></Link>
                      <Link as={NavLink} to="/dashboard/yourProjects"><MenuItem color={"#000"}>Your Projects</MenuItem></Link>
                      <MenuItem background={"red"} color={"#fff"} borderRadius="6px" margin={"0 20px"} width="calc(100% - 40px)" justifyContent={"center"} marginTop={"10px"} _hover={{background:"red", color:"#fff"}} onClick={singOutUser}>Sign Out</MenuItem>
                    </MenuList>
                </Menu> : null}
            </HStack>
          </Show> }
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link as={NavLink} key={link} to={`/${link === "home" ? "" : link}`} >{link[0].toUpperCase() + link.slice(1)}</Link>
              ))}
              {isMobile && !(isLogged) ? <Link as={NavLink} to="/signIn">Sign In</Link> : null}
              {isMobile && isLogged ? LoggedLinks.map(({txt, href})=>(
                <Link as={NavLink} key={txt} to={href} >{txt}</Link>
                )) : null}
              {isMobile && isLogged ?  <Button onClick={()=>{signOut(auth)}} maxW={'50%'}>Sign Out</Button> : null}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}