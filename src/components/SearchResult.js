import React, {useState} from 'react'
import { useShoppingCart, ShoppingCartProvider } from '../context/ShoppingCartContext';
import {Container, Box, Card, CardMedia, CardContent,Typography} from "@mui/material";


const SearchResult = () => {
    

      return (
        <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            my: "20px",
            justifyContent: "center",
          }}>
          Result go here
        </Container>
      );
    };



export default SearchResult;