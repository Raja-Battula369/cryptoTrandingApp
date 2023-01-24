import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {  Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";
import ReactPaginate from 'react-paginate'

const Coins = () => {

  const [coins,setCoins]=useState([]);
  const [loading,SetLoading]=useState(true);
  const [error,setError]=useState(false);
  const [currency,setCurreny]=useState('inr');
  const [page,setPage]=useState(1);

  const currencySymbol =currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
 


  useEffect(()=>{
    const fetchCoins=async()=> {
    
      try {
                const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&per_page=125&page=${page}`);
                // console.log(data)

                setCoins(data);
                SetLoading(false);
      }catch {

        SetLoading(false);
        setError(true);
      }
    }
    fetchCoins();
  },[currency,page]);

      if (error) return <Error message={"Error While Fetching Coins"} />;
  
      return (
        <>
        <HStack display={"grid"} >
              <RadioGroup value={currency} onChange={setCurreny}  p="2rem" >
                <HStack gap="0.5rem">
                  <Radio value="inr">INR</Radio>
                  <Radio value="eur">EUR</Radio>
                  <Radio value="usd">USD</Radio>
                </HStack>
              </RadioGroup>
                    <ReactPaginate  previousLabel={"<<"} nextLabel={">>"} breakLabel={"..."}
                    pageCount={100} marginPagesDisplayed={2} pageRangeDisplayed={3} 
                    onPageChange={(data)=>setPage(data.selected+1) }
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"} pageLinkClassName={"page-link"}
                    previousClassName={"page-item"} previousLinkClassName={"page-link"}
                    nextClassName={"page-item"} nextLinkClassName={"page-link"}
                    breakClassName={"page-item"} breakLinkClassName={"page-link"}
                    activeClassName={"active"} />
        </HStack>
        <Container maxW="container.xl">
          {loading?<Loader/>:(
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((data)=><CoinCard name={data.name} key={data.id} id={data.id}
              image={data.image} price={data.current_price} symbol={data.symbol}
               currencySymbol={currencySymbol} />)}
            </HStack>
          )}
        </Container>
        
        
         
         
        </>
      )
}

export default Coins
