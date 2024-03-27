import React from "react";

import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  iframe
} from "@chakra-ui/react";

// import EmailInput from "./EmailInput";
// import VideoPlayButton from "assets/svg/video-play-button.svg";

function VideoBanner() {
  const iframeRatio = 0.562;
  
  return (
    <Container
      size="md"
      pt={{ base: "5rem", md: "8.125rem" }}
      pb={{ base: "2.75rem", md: "4.5rem", xl: "7.75rem" }}
    >
      <Stack
        direction={{ base: "column", xl: "row" }}
        align="center"
        justify="center"
        spacing="4.375rem"
      >
        {/* Video Preview */}
        <Box position="relative" borderRadius="2.5rem"
            maxW={'100%'}
        w={'600px'} h={'400px'} maxH={'100%'} overflow={'hidden'}>
          {/* <Image
            src="assets/images/video-preview.png"
            alt="Video preview"
            borderRadius="2.5rem"
            maxW={{ base: "522px", xl: "635px" }}
            w="100%"
          /> */}
          <iframe  style={{width:"100%", height:"100%"}}
            alt="Video preview"
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
          src="https://www.youtube-nocookie.com/embed/kxuVlj8jbSw?version=3&enablejsapi=1&html5=1&hd=1&wmode=opaque&showinfo=0&rel=0&origin=https://www.harryfultz.edu.al;&controls=0&playsinline=1"></iframe>
          <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="auto"
            translateX="-50%"
            translateY="-50%"
          >
            {/* <VideoPlayButton /> */}
          </Box>
        </Box>
        {/* Text */}
        <VStack align="stretch" maxW="429px">
          {/* Headings */}
          <VStack spacing="0.5rem" align="stretch">
            <Heading
              as="h2"
              size="lg"
              textAlign={{ base: "center", xl: "start" }}
            >
              Instituti "Harry Fultz"
            </Heading>
          </VStack>
          {/* Text */}
          <Text
            color="muted"
            maxW="25rem"
            pt="0.75rem"
            textAlign={{ base: "center", xl: "start" }}
            lineHeight="2rem"
          >
            A tradition of excellence
          </Text>
          {/* Input */}
          {/* <Box pt="2rem">
            <EmailInput />
          </Box> */}
        </VStack>
      </Stack>
    </Container>
  );
}

export default VideoBanner;
