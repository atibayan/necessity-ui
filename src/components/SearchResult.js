import React, {useState} from 'react'
import { useShoppingCart, ShoppingCartProvider } from '../context/ShoppingCartContext';
import {Container, Box, Card, CardMedia, CardContent,Typography, Stack} from "@mui/material";
import ProductCard from './ProductCard';


const SearchResult = () => {
  const {searchResult} = useShoppingCart();

  return searchResult.length==0 ? (
    <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            my: "20px",
            justifyContent: "center",
          }}>
          <Typography
        variant="h4"
        noWrap
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 400px",
          justifyContent: "center",
          m: 3,
        }}>
        Oops...There is no result for your search!
      </Typography>
      <img
        src="/img/oops.png"
        alt="/img/oops.png"
        style={{ width: "calc(80px + 5%)", marginTop: "5vh" }}
      />
      </Container>
  ) : (
        <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            my: "20px",
            justifyContent: "center",
          }}>
          <Typography
        variant="h4"
        noWrap
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 400px",
          justifyContent: "center",
          m: 3,
        }}>
        All Results
      </Typography>
      <Stack gap={2} dsx={{ display: "flex", flexFlow: "row wrap" }}></Stack>
          {searchResult.map((filteredProduct)=>(
            <ProductCard
            item={filteredProduct}
            key={filteredProduct._id}
            />
            // <ul>
            // <li>{filteredProduct.name}</li>
            // <li>{filteredProduct.description}</li>
            // </ul>
          ))}
        </Container>
      );
    };



export default SearchResult;