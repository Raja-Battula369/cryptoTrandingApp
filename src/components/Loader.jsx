import React from 'react';
import { Box,Spinner,VStack } from '@chakra-ui/react';

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent="center">
      <Box transform={"scale(3.5)"}>
        <Spinner/>
      </Box>
    </VStack>
  )
}

export default Loader
