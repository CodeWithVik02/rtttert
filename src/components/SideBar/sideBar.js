import React, { useState , useEffect } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    // FiCalendar,
    FiUser,
    // FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'

// import {NavLink} from "react-router-dom"
import { 
    // useParams, 
    useLocation,
    Outlet
} from 'react-router-dom'
import NavItem from '../NavItem/NavItem'

export default function Sidebar({isMobile, userData, isAuth, noSideBarRoutes, homeLocation = "/"}) {
    const location = useLocation();
    // const {dashBoardId} = useParams();
    const LoggedSideBarLinks = [
        {
            icon:FiHome,
            title:"Dashboard",
            link:"/dashboard/home",
            id:0,
        },
        userData.length && userData[0].type == "admin" 
        ? {
            icon:FiUser,
            title:"User",
            link:"/dashboard/createUser",
            id:1,
          } 
        : null,
        {
            icon:FiBriefcase,
            title:"Your Projects",
            link:"/dashboard/yourProjects",
            id:userData.length && userData[0].type == "admin" ? 2 : 1,
        },
        {
            icon:FiSettings,
            title:"Settings",
            link:"/dashboard/settings",
            id:userData.length && userData[0].type == "admin" ? 3 : 2,
        },
    ]
    const [activeEle, setActive] = useState([]);
    useEffect(()=>{
        LoggedSideBarLinks.map((ele)=>{
           
        })
    }, [])
    const [navSize, changeNavSize] = useState("large")
    useEffect(()=>{
        isMobile ? changeNavSize("small") : changeNavSize("large");
    }, [isMobile])
    let testLocation = false;
    noSideBarRoutes.forEach(ele=>{
        if(location.pathname.includes(ele)){
            testLocation = true
        }
    })
    if(!(isAuth) || testLocation || location.pathname === homeLocation){
        return <Outlet/>;
    }
    return (
        <Flex
            pos="sticky"
            // left="5"
            h="95vh"
            // marginTop="2.5vh"
            // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            borderRight={'1px solid #003867'}
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                {!(isMobile) ? <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    _focus={{border: 'none'}}
                    _active={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                /> : null}
                {LoggedSideBarLinks.map((ele, i)=>{
                return ele !== null ? <NavItem data={ele.id} key={i} to={ele.link} navSize={navSize} icon={ele.icon} title={ele.title} active={activeEle.length ? ele.id == activeEle[0].id : false} setActive={setActive}/> : null
                })}
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm"/>
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{userData[0].name} {userData[0].surname}</Heading>
                        <Text color="gray">{userData[0].type[0].toUpperCase() + userData[0].type.slice(1)}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}