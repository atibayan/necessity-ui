import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ProductCard from "../components/ProductCard";
import { Container, Typography, Tab, Tabs } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../components/CategoryScreen.css";

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
    <>
      <Tabs value={clickedNavLink} onChange={handleTabChange} centered>
        <Tab label="All" value="all" component={NavLink} to={""}/>
        <Tab label="Top" value="top" component={NavLink} to={"top"} />
        <Tab label="Bottom" value="bottom" component={NavLink} to={"bottom"} />
        <Tab label="Footwear" value="footwear" component={NavLink} to={"footwear"} />
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
        <Typography variant="h6" align="center">
          No available products.
        </Typography>
      )}
    </>
  );
};

export default CategoryScreen;
