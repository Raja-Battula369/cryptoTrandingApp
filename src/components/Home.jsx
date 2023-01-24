import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion'
import btcImg from '../assets/btc.png';
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.800"} w={"full"} h="85vh">
        <motion.div style={{height:"80vh"}} animate={{translateY:"20px"}} 
        transition={{duration:2,repeat:Infinity,repeatType:"reverse"}}>
          <Image w="full" h="full" objectFit={"contain"} src={btcImg} filter={"grayscale(1)"} />
        </motion.div>
    <Text fontSize={"6xl"} textAlign="center" fontWeight={"thin"} color="whiteAlpha.700" my="-3rem"  > CRY </Text>
    </Box>
  )
}

export default Home
