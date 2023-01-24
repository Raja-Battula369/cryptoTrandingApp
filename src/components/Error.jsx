import React from 'react';
import { Alert,AlertIcon, Button, GridItem } from '@chakra-ui/react';

const Error = ({message}) => {
  return (
    <Alert display={"grid"} gridTemplateAreas={'"head nav"'}  gridTemplateColumns={'3rem 1fr'}
      width="90%" status='error' position={"fixed"} top="90%" Button="0">
      <GridItem area="head"><AlertIcon /> </GridItem>
     <GridItem area="nav">{message}</GridItem>
    </Alert>
  )
}

export default Error
