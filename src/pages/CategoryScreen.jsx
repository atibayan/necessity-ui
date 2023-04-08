import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ProductCard from "../components/ProductCard";
import { Container, Typography, Tab, Tabs, Box, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import "../components/CategoryScreen.css";

const catTagLine = {
  women:
    "Empower your style, embrace your uniqueness - Unleash the fashionista in you with our women's fashion!",
  men: "Elevate your look, own your style - Redefine your fashion game with our men's collection!",
  kids: "Growing up in style, one outfit at a time - Let your little ones shine with our kid's fashion collection!",
  all: "Fashion that makes a statement - express yourself with our collection of trendy and timeless styles.",
};

const CategoryScreen = () => {
  const params = useParams();
  const { products } = useShoppingCart();
  const [clickedNavLink, setClickedNavLink] = useState("all");

  let location = window.location.pathname;
  let category = params.cat.toLowerCase();
  let subRoute = clickedNavLink.toLowerCase();

  useEffect(() => {
    setClickedNavLink("all");
  }, [category]);

  let filteredProducts = products;
  if (
    category &&
    category !== "all" &&
    location == "/product/category/" + category
  ) {
    filteredProducts = products.filter((product) =>
      product.tags.map((tag) => tag.toLowerCase()).includes(category)
    );
  } else if (category && category !== "all") {
    filteredProducts = products.filter(
      (product) =>
        product.tags.map((tag) => tag.toLowerCase()).includes(category) &&
        product.tags.map((tag) => tag.toLowerCase()).includes(subRoute)
    );
  } else if (
    category &&
    category == "all" &&
    location !== "/product/category/" + category
  ) {
    filteredProducts = products.filter((product) =>
      product.tags.map((tag) => tag.toLowerCase()).includes(subRoute)
    );
  } else if (
    category &&
    category == "all" &&
    location == "/product/category/" + category
  ) {
    filteredProducts = products;
  }

  const handleTabChange = (event, value) => {
    setClickedNavLink(value);
  };

  return (
    <Fragment>
      <Stack
        p={3}
        flexWrap={"wrap"}
        sx={{ background: "rgba(215,215,215,0.2)" }}
        gap={2}>
        <Typography variant="h5" textAlign={"center"}>
          {category.toUpperCase()}
        </Typography>
        <Typography textAlign={"center"}>
          {catTagLine[`${category}`]}
        </Typography>
      </Stack>
      <Tabs value={clickedNavLink} onChange={handleTabChange} centered>
        <Tab label="All" value="all" component={NavLink} to={""} />
        <Tab label="Top" value="top" component={NavLink} to={"top"} />
        <Tab label="Bottom" value="bottom" component={NavLink} to={"bottom"} />
        <Tab
          label="Footwear"
          value="footwear"
          component={NavLink}
          to={"footwear"}
        />
      </Tabs>
      {filteredProducts.length > 0 ? (
        <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            my: "20px",
            justifyContent: "center",
          }}>
          {filteredProducts.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </Container>
      ) : (
        <Typography variant="h6" mt={10} align="center">
          No available products.
        </Typography>
      )}
    </Fragment>
  );
};

export default CategoryScreen;
