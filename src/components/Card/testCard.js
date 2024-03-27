import { Box, Center, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

export default function TestCard({ project }) {
  const SliderData = project.photo.map((photo) => {
    return { photo: photo };
  });
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const length = SliderData.length;
  const [screenWidth, setScreenWidth] = useState(width < 1500);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setScreenWidth(window.innerWidth < 1500);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  console.log(screenWidth)
  return (
    <div id="by">
      <Center paddingTop={100}>
        <Heading fontWeight="bold" fontSize={50} textAlign="center">
          {project.name}
        </Heading>
      </Center>
      <Flex direction={isMobileView || screenWidth ? 'column' : 'row'} alignItems="center" overflow="hidden" paddingTop={50} >
        <Box flex="1" position="relative"  paddingLeft={isMobileView || screenWidth ? "" : "100px"} padding={isMobileView || screenWidth ? "30px" : ""}>
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
                  w={isMobileView  ? "" : "800px"}
                  h={isMobileView  ? "300px" : "450px"}
                  borderRadius={30}
                />
              )}
            </div>
          ))}
          <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} style={{ position: 'absolute', color: 'white', fontSize: '34px', top: '50%', transform: 'translateY(-50%)' }} />
          <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} style={{ position: 'absolute', color: 'white', fontSize: '34px', top: '50%', right: isMobileView || screenWidth ? "30px" : "1px", transform: 'translateY(-50%)' }} />
        </Box>
        <Box flex="1" ml={isMobileView || screenWidth ? 0 : 4} w={isMobileView || screenWidth ? "" : "50%"} alignItems="flex-end" paddingRight={isMobileView || screenWidth ? '' : '100px'} >
          <Text style={{ fontSize: '20px'}} position="relative" padding={isMobileView || screenWidth ? '30px' : ''} textAlign={isMobileView || screenWidth ? "center" : ""}>
            {isMobileView || screenWidth ? project.description : description}
          </Text>
        </Box>
        
      </Flex>
    { isMobileView || screenWidth ?  null : <Box  w={isMobileView ? "" : "100%"} alignItems="center" paddingLeft={100} >
          <Text position="relative"  padding={isMobileView ? '30px' : '30px'} textAlign={isMobileView ? "center" : "left"} style={{ fontSize: '20px'}}>
            {isMobileView ?  null  : truncatedDescription}
          </Text>
        </Box>}
    </div>
  );
}
