import {Container,Text,VStack,Image,Heading,HStack} from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import Error from './Error';



const Exchange = () => {
    const [isLoading,setIsLoading]=useState(true);
    const [exchange,setExchange]=useState([]);
    const [error,setError]=useState(false);

    useEffect(()=> {
            const fetchExchange=async()=>{
                try {
                    const {data}=await axios.get(`${server}/exchanges`);
                    setExchange(data);
                    setIsLoading(false);   

                } catch (error) {
                    setIsLoading(false);
                    setError(true);
                    
                };
            };
        fetchExchange();
    },[]);

    if (error) {
        return <Error message={"Error while Fetching the Data"}/>
    };

    return (
    <Container maxW={"container.xl"} >
        {isLoading? <Loader/>:(
            <HStack wrap={"wrap"} justifyContent="space-evenly">
                {exchange.map((data)=><ExchangeCard image={data.image} rank={data.trust_score_rank} name={data.name}
            url={data.url} key={data.id}/>)}
            </HStack>
            
        )}
        
    </Container>
  )
};

const ExchangeCard=({image,rank,name,url})=>{
    return (
        <a href={url} target="blank">
        <VStack p="1rem" m="1rem" w={"52"} shadow={"xl"} borderRadius="lg" bg="whiteAlpha.50" transform="all 0.4s"
        sx={{"&:hover":{transform:"scale(1.1)"}}}>
                <Image src={image} objectFit="contain" boxSize={"3rem"} alt={name}/>
                <Heading size="md"> {rank}</Heading>
                <Text noOfLines={1}>{name}</Text>

        </VStack>
        </a>
    )
}

export default Exchange
