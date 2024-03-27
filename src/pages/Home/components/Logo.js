import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold" style={{color:'black'}}>
        SupliffyX |
      </Text>
      <Text style={{color:'black'}} fontSize="lg" fontWeight="bold">
         Maneger
      </Text>
    </Box>
  );
}
