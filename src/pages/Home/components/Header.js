import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Button, Menu } from "@chakra-ui/react";
import Logo from "./Logo";
import {
  HStack,
  IconButton,
  MenuButton,
  MenuList,
  MenuDivider,
  useDisclosure,
  // useColorModeValue,
  Stack,
  MenuItem ,
  Show,
  // Image,
  // useMediaQuery,
} from '@chakra-ui/react';
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../../components/firebase/firebase-config";
const MenuIteme = ({ children, isLast, to = "/" , ...rest}) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      style={{color:'black'}}
      {...rest}
      
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
 
  const Links = ['home', 'clubs', 'events'];
  const singOutUser = ()=>{
    signOut(auth);
    navigate('/')
  }
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
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Logo
          w="100px"
          color={["black", "black", "primary.500", "primary.500"]}
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
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
      </Box>

      <Box
       
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuIteme  to="/">Home</MenuIteme>
          
         
        
            <Flex alignItems={'center'}>
            
            <Menu>
            {!(props.isLogged)
        ? 
          
          <Show above="sm">
            <HStack w="100%" justify="flex-end" style={{
                width: "max-content",
               
                }}>
                <Link as={NavLink} to="/signIn" >
                  <Button colorScheme="gray" fontWeight="400" color={'#000'}>
                    Sign In
                  </Button>
                </Link>
            </HStack>
          </Show> :
        <Show above="sm">
            <HStack w="100%" justify="flex-end" style={{
                width: "max-content",
                
                marginRight:"10px",
                }}>
                  
                  <Menu>
                    <MenuButton as={Button} style={{padding:15, borderRadius:"50%", }}  onClick={onOpen}>
                      <FiUser />
                    </MenuButton>
                    <MenuList>
                      <Link as={NavLink} to="/dashboard/"><MenuItem color={"#000"}>Dashboard</MenuItem></Link>
                      <Link as={NavLink} to="/dashboard/yourProjects"><MenuItem color={"#000"}>Your Projects</MenuItem></Link>
                      <MenuItem background={"red"} color={"#fff"} borderRadius="6px" margin={"0 20px"} width="calc(100% - 40px)" justifyContent={"center"} marginTop={"10px"} _hover={{background:"red", color:"#fff"}} onClick={singOutUser}>Sign Out</MenuItem>
                    </MenuList>
                </Menu> 
            </HStack>
          </Show> }
            </Menu>
          </Flex>
          
      
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
