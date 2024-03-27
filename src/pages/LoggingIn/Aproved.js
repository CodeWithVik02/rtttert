import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';

const ApprovalMessage = () => {
  return (
    <Center h="100vh">
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text fontSize="xl">You haven't been approved by the admin</Text>
      </Box>
    </Center>
  );
};

export default ApprovalMessage;
