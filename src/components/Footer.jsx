
import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
const imgAvatar="https://preview.redd.it/2p5mpxezahr51.gif?format=png8&s=50c718c0cf2fb0f1aca58eb97c1e0fd31190947b"
const Footer = () => {

  return (
    <Box bgColor={"blackAlpha.800"} color="whiteAlpha.700" px="16" py={["16","8"]}>
      <Stack direction={["column","row"]} h={"full"} alignItems="center">
        <VStack w="full" alignItems={["center","flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]} > 
              We are the best crypto trading app in India, we provide our guidance
              at a very cheap price
          </Text>

        </VStack>
          <Avatar boxSize={"28"} mt={["4","0"]} src={imgAvatar}  />
          <Text >Our Founder</Text>
        <VStack>

        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer
