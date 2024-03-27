import React , { useState } from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
} from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'
// import NavHoverBox from 'components/NavHoverBox/NavHoverBox'

export default function NavItem({ icon, title, active, navSize , to, data, setActive}) {
    const [hover, isHovered] = useState(false)
    const handleMouseOver = ()=>{
        isHovered(true)
    }
    const handleMouseOut = ()=>{
        isHovered(false)
    }
    const handleSidbarLinkClick = (e)=>{
        setActive([{link:to, id:data}])
    }
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#003867"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#003867" }}
                    w={navSize == "large" && "100%"}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    as={NavLink}
                    to={to}
                    onClick={handleSidbarLinkClick}
                    data-active={data}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active || hover ? "#fff" : "#003867"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}