import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Stack,
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Products = () => {
  const { products } = useShoppingCart();
  const theme = useTheme();
  const [pagedProducts, setPagedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [prodsPerPage, setProdsPerPage] = useState(12);

  useEffect(() => {
    setPage(0);
  }, [prodsPerPage]);

  useEffect(() => {
    setPagedProducts(getPagedProducts());
  }, [page, prodsPerPage, products]);

  const getPagedProducts = () => {
    const pagedProds = [];
    for (
      let i = page * prodsPerPage;
      i < Math.min(page * prodsPerPage + prodsPerPage, products.length);
      i++
    ) {
      if (products) pagedProds.push(products[i]);
    }
    return pagedProds;
  };

  const pages = [];
  const pageCount = products.length / prodsPerPage;
  for (let i = 0; i < pageCount; i++) {
    pages.push(
      <Button
        key={i}
        sx={{
          color: theme.palette.secondary.dark,
          background: i === page ? theme.palette.primary.light : "inherit",
          minHeight: 0,
          minWidth: 0,
          px: 1,
          py: 0.1,
          mx: 0.2,
          my: 0,
          "&:hover": {
            background: theme.palette.primary.light,
          },
        }}
        onClick={() => setPage(i)}>
        {i + 1}
      </Button>
    );
  }
  return (
    <Fragment>
      <Box mt={"3vh"} mx="auto" width={"80vw"}>
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
      <Stack
        direction="row"
        flex="wrap"
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        my={1}>
        <InputLabel>Products Per Page:</InputLabel>
        <FormControl variant="standard">
          <Select
            value={prodsPerPage}
            onChange={(e) => {
              setProdsPerPage(e.target.value);
            }}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={18}>16</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent={"center"} my={1}>
        {pages}
      </Stack>
      <Container
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          my: "20px",
          justifyContent: "center",
        }}>
        {/* {products.map((item) =>
          item.activeFlag ? (
            <ProductCard
              handleSelectProduct={handleOnClick}
              item={item}
              key={item._id}
            />
          ) : null
        )} */}
        {pagedProducts &&
          pagedProducts.length != 0 &&
          pagedProducts?.map((item) => {
            return <ProductCard item={item} key={item._id} />;
          })}
      </Container>
      <Stack direction="row" justifyContent={"center"} my={1}>
        {pages}
      </Stack>{" "}
    </Fragment>
  );
};

export default Products;
