import React from "react";

import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  FiBriefcase,
  FiGift,
  FiGlobe,
  FiSend,
  FiTrello,
  // FiWifiOff,
  FiUser,
} from "react-icons/fi";

import Feature from "./Feature";

const featuresData = [
  {
    icon: FiBriefcase,
    iconBg: "#1F7CFF",
    heading: "Ndani informacione",
    text: "Punoni bashke ne grup per te marre vendime",
  },
  {
    icon: FiSend,
    iconBg: "#F75C4E",
    heading: "Organizoni Projektet",
    text: "Lorem Ipsum is simply dummy text of the",
  },
  {
    icon: FiUser,
    iconBg: "#191046",
    heading: "Sistem Administrativ",
    text: "Lorem Ipsum is simply dummy text of the",
  },
  {
    icon: FiTrello,
    iconBg: "#FF1FB3",
    heading: "Prezantim Projektesh",
    text: "Lorem Ipsum is simply dummy text of the",
  },
  {
    icon: FiGift,
    iconBg: "#5C4EF7",
    heading: "Rikontrollim",
    text: "Lorem Ipsum is simply dummy text of the",
  },
  {
    icon: FiGlobe,
    iconBg: "#F7954E",
    heading: "Shumellojshmeri projektesh",
    text: "Lorem Ipsum is simply dummy text of the",
  },
];

function Features({isMobile}) {
  return (
    <Container size="md" pt={{ base: "5rem", md: "8.125rem" }}>
      <VStack spacing={{ base: "3rem", md: "4.25rem" }}>
        {/* Heading */}
        <VStack spacing="1.25rem">
          <VStack spacing="0.5rem">
            <Heading as="h2" size="lg" textAlign="center">
              Per Projektet Tuaja
            </Heading>
          </VStack>
          <Text color="muted" maxW="25rem" textAlign="center" lineHeight="2rem">
            Ketu mund te ndani projektet tuaja dhe te shikoni projektet e grupeve te tjera
          </Text>
        </VStack>
        {/* Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingY="3.75rem"
          spacingX="5.25rem"
          maxW="1105px"
        >
          {featuresData.map((featureData , index) => (
            <Feature
              key={index}
              icon={featureData.icon}
              iconBg={featureData.iconBg}
              heading={featureData.heading}
              text={featureData.text}
              isMobile={isMobile}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default Features;
