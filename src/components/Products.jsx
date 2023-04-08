import React, { Fragment } from "react";
import ProductCard from "./ProductCard";
import { Stack, Box, Typography, Container } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Products = () => {
  const { products } = useShoppingCart();

  const handleOnClick = () => {};

  return (
    <Fragment>
      <Box mt={"2vh"} mx="auto" width={"80vw"}>
        <Typography
          variant="h5"
          sx={{
            display: { xs: "flex", md: "flex" },
            flexGrow: { xs: 1, md: 0 },
            letterSpacing: ".3rem",
            borderRadius: "5px",
            justifyContent: "center",
          }}>
          ALL PRODUCTS
        </Typography>
      </Box>
      {/* <Stack
        my={"5vh"}
        mx="auto"
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}> */}
      <Container
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          my: "20px",
          justifyContent: "center",
        }}>
        {products.map((item) =>
          item.activeFlag ? (
            <ProductCard
              handleSelectProduct={handleOnClick}
              item={item}
              key={item._id}
            />
          ) : null
        )}
      </Container>
      {/* </Stack> */}
    </Fragment>
  );
};

export default Products;
