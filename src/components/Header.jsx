import React from 'react';
import { Button,HStack,Text} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const Navigate=useNavigate();
  return (
    <HStack p="1rem 3%" gap="1rem" shadow="base" backgroundColor={"blackAlpha.900"}>
        <Text onClick={()=>Navigate('/')} color="red" as="b" fontSize="3xl"
         sx={{"&:hover":{color:"red.400",cursor:"pointer"}}}>CRY</Text>
        <Button variant="unstyled" color={"white"}>
            <Link to="/">Home</Link>
        </Button>
        <Button variant="unstyled" color={"white"}>
            <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button variant="unstyled" color={"white"}>
            <Link to="/coins">Coins</Link>
        </Button>
      
      
      
    </HStack>
  )
}

export default Header
