import { Center, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

export default function ProjectCard({ project, isMobile }) {
  const SliderData = project.photo.map((photo) => {
    return { photo: photo };
  });
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }
  const isMobileView = useBreakpointValue({ base: true, lg: false });

  const words = project.description.split(/\s+/);
  const wordCount = words.length;
  const truncatedDescription = words.slice(177).join(' ');
  const description = words.slice(0 , 177).join(' ');
  return (
    <>
      <Flex
        w={isMobileView ? "" : "100vw"}
        h={isMobileView ? "" : "200vh"}
        bg="gray.100"
        overflow="hidden"
        boxShadow="md"
        padding={isMobileView ? "" : "100px"}
        gap={isMobileView ? "" : "50px"}
        position="relative"
        direction={isMobileView ? "column" : "row"}
      >
        <Center
          w="100%"
          h="100%"
          position="absolute"
          top={isMobileView ? "50px" : ""}
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Heading fontWeight="bold" fontSize={50} textAlign="center">
            {project.name}
          </Heading>
        </Center>

        <Flex
          w={isMobileView ? "" : "800px"}
          top={100}
          h={isMobileView ? "350" : "450px"}
          padding={isMobileView ? "30px" : ""}
          overflow="hidden"
          className='slider'
          paddingLeft={isMobileView ? "" : "60px"}
          position="relative"
        >
          {SliderData.map((photo, index) => (
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
            >
              {index === current && (
                <Image
                  src={photo.photo}
                  id='image'
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  borderRadius={30}
                />
              )}
            </div>
          ))}
          <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} style={{ position: 'absolute', color: 'white', fontSize: '34px', top: '50%', transform: 'translateY(-50%)' }} />
          <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} style={{ position: 'absolute', color: 'white', fontSize: '34px', top: '50%', right: isMobileView ? "30px" : "1px", transform: 'translateY(-50%)' }} />
        </Flex>
        <Flex direction="column" w={isMobileView ? "" : "50%"} alignItems="flex-end" paddingRight={isMobileView ? '' : '50px'} >
          <Text w={'100'} top={100} position="relative" padding={isMobileView ? '30px' : '10px'} textAlign={isMobileView ? "center" : ""} style={{ fontSize: '20px'}}>
          {isMobileView ?project.description  :description }
          </Text>
         
        </Flex>
        <Center
          w="100%"
          h="100%"
          position="absolute"
          top={isMobileView ? "50px" : "680px"}
          left="50%"
          transform="translate(-50%, -50%)"
        >
        <Flex direction="column" w={isMobileView ? "" : "90%"} alignItems="center" paddingRight={isMobileView ? '' : '50px'} >
          <Text w={'100'} top={100} position="relative" padding={isMobileView ? '30px' : '100px'} textAlign={isMobileView ? "center" : ""} style={{ fontSize: '20px'}}>
            {isMobileView ?  null  : truncatedDescription}
          </Text>
        </Flex>
        </Center>
      </Flex> 
      
    </>
  );
}
