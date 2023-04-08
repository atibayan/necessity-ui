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
  const [clickedNavLink, setClickedNavLink] = useState("All");

  let location = window.location.pathname;

  useEffect(() => {
    setClickedNavLink("All");
  }, [params.cat]);

  let filteredProducts = products;
  if (
    params.cat &&
    params.cat !== "All" &&
    location == "/product/category/" + params.cat
  ) {
    filteredProducts = products.filter((product) =>
      product.tags.includes(params.cat)
    );
  } else if (params.cat && params.cat !== "All") {
    filteredProducts = products.filter(
      (product) =>
        product.tags.includes(params.cat) &&
        product.tags.includes(clickedNavLink)
    );
  } else if (
    params.cat &&
    params.cat == "All" &&
    location !== "/product/category/" + params.cat
  ) {
    filteredProducts = products.filter((product) =>
      product.tags.includes(clickedNavLink)
    );
  } else if (
    params.cat &&
    params.cat == "All" &&
    location == "/product/category/" + params.cat
  ) {
    filteredProducts = products;
  }

  const handleTabChange = (event, value) => {
    setClickedNavLink(value);
  };

  return (
    <>
      <Tabs value={clickedNavLink} onChange={handleTabChange} centered>
        <Tab label="All" value="All" component={NavLink} to={""}/>
        <Tab label="Top" value="Top" component={NavLink} to={"Top"} />
        <Tab label="Bottom" value="Bottom" component={NavLink} to={"Bottom"} />
        <Tab label="Footwear" value="Footwear" component={NavLink} to={"Footwear"} />
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
