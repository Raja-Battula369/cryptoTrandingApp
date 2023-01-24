import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard=({image,name,id,currencySymbol="₹",price,symbol})=>{
  return (
      <Link to={`/coin/${id}`} >
      <VStack p="1rem" m="1rem" w={"52"} shadow={"xl"} borderRadius="lg" bg="whiteAlpha.50" transform="all 0.4s"
      sx={{"&:hover":{transform:"scale(1.1)"}}}>
              <Image src={image} objectFit="contain" boxSize={"3rem"} alt={name}/>
              <Heading size="md"> {symbol}</Heading>
              <Text noOfLines={1}>{name}</Text>
              <Text noOfLines={1}>{price?`${currencySymbol}${price}`:"NA"}</Text>


      </VStack>
      </Link>
  )
}


export default CoinCard
