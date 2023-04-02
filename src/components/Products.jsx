import React from "react";
import ProductCard from "./ProductCard";
import { Container } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Products = () => {
  const { products } = useShoppingCart();

  const handleOnClick = () => {};

  return (
    <Container
      sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        my: "20px",
        justifyContent: "center",
      }}>
      {products.map((item) => (
        <ProductCard
          handleSelectProduct={handleOnClick}
          item={item}
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default Products;
