import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { server } from '..';
import Charts from './Charts';
import Error from './Error';
import Loader from './Loader'

const CoinDetails = () => {
    const params=useParams();
    const [coin,setCoin]=useState([]);
    const [loading,SetLoading]=useState(true);
    const [error,setError]=useState(false);
    const [currency,setCurreny]=useState('inr');
    const [chartArray,setChartArray]=useState([]);
    const [days,setDays]=useState("24h");



    const currencySymbol =currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  
    const btns=["24h","7d","14d","30d","60d","200d","365d","max"];


    const switchChartDays=(key)=>{
      if (days!==key) {
        SetLoading(true);
      }
      switch (key) {
        
        case "24h":
          setDays("24h");
          break;
        case "7d":
          setDays("7d");
          
          break;
          case "14d":
          setDays("14d");
          break;
          case "30d":
          setDays("30d");
          break;
          case "60d":
          setDays("60d");
          break;
          case "200d":
          setDays("200d");
          break;
          case "365d":
          setDays("365d");
          break;
          case "max":
          setDays("max");
          break;
          
        default:
          setDays("24h");
          break;
      }
    }


  useEffect(()=>{
    const fetchCoins=async()=> {
    
      try {
                const {data}=await axios.get(`${server}/coins/${params.id}`);
                const {data:chartData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                // console.log(chartData)

                setCoin(data);
                setChartArray(chartData.prices);
                SetLoading(false);
      }catch {

        SetLoading(false);
        setError(true);
      }
    }
    fetchCoins();
  },[params.id,currency,days]);

      if (error) return <Error message={"Error While Fetching Coins"} />;
  
  
  return (
    <Container maxW={"container.xl"} >
      {
        loading? <Loader/>: (
            <>
            <Box w="full" borderWidth={"1rem"}>
                <Charts arr={chartArray} currency={currencySymbol}  days={days} />
            </Box>
              
            <HStack p={"3rem"} overflowX={"auto"} sx={{"&::-webkit-scrollbar":{
              display:"none",
            }}}>
              
              {btns.map((i)=><Button key={i} isActive={i===days} colorScheme="blue" onClick={()=> {switchChartDays(i)}  }>{i}</Button>)}
            </HStack>

            <RadioGroup value={currency} onChange={setCurreny}  p="2rem" >
                <HStack gap="0.5rem">
                  <Radio value="inr">INR</Radio>
                  <Radio value="eur">EUR</Radio>
                  <Radio value="usd">USD</Radio>
                </HStack>
            </RadioGroup>
            <VStack gap="2rem" alignItems={"flex-start"}>
                <Text fontSize={"small"} opacity={"0.6"} alignSelf="center" >
                    Last Update On {" "}
                    {Date(coin.market_data.last_updated).split("G")[0]}
                </Text>
                <Image src={coin.image.large} boxSize={"4rem"} objectFit={"contain"}/>
                <Stat >

                    <StatLabel>{coin.name}</StatLabel>
                    <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText>
                        <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ?"increase":"decrease"}/>
                        {coin.market_data.price_change_percentage_24h }%
                    </StatHelpText>
                
                </Stat>
                
                <Badge fontSize={"2xl"} backgroundColor={"blackAlpha.800"} color="white">
                    {`#${coin.market_cap_rank}`}
                </Badge>
                
                <CustomBar  high= {`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low= {`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                h={coin.market_data.high_24h[currency]} 
                p={coin.market_data.current_price[currency]}
               />
               
               <Box w="full" p="2rem">
                <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating Supply"}  value={coin.market_data.circulating_supply}
              />
              
              <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
               </Box>
            </VStack>
            </>
        )
      }
    </Container>
  )
}

export default CoinDetails

const CustomBar=({high,low,h,p})=> (
    <VStack w="full">
        
        <Progress value={(100-((h-p)/h*100))} colorScheme={ ((100-((h-p)/h*100)))>50?"teal":"red"} w="full"/>
        
        <HStack>
            <Badge children={low} colorScheme={"red"}/>
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"}/>
        </HStack>
        
    </VStack>
)

const Item =({title,value})=> (
    <HStack justifyContent={"space-between"} my={"4"} w="full">
        <Text fontFamily={"Bebus Neue"} letterSpacing="widest" > {title}</Text>
        <Text>{value} </Text>
    </HStack>
)