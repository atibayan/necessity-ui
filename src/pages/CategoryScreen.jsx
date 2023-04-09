import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ProductCard from "../components/ProductCard";
import {
  Container,
  Typography,
  Tab,
  Tabs,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const params = useParams();
  const { products } = useShoppingCart();
  const [clickedNavLink, setClickedNavLink] = useState("all");
  const [pagedProducts, setPagedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [prodsPerPage, setProdsPerPage] = useState(12);

  let location = window.location.pathname;
  let category = params.cat.toLowerCase();
  let subRoute = clickedNavLink.toLowerCase();

  const handleTabChange = (event, value) => {
    setClickedNavLink(value);
  };

  useEffect(() => {
    setPage(0);
    setFilteredProducts(getFilteredProducts());
  }, []);

  useEffect(() => {
    setPage(0);
    const locArr = window.location.pathname.split("/");
    const sub = locArr[locArr.length - 1];
    if (sub === category) {
      setClickedNavLink("all");
    } else {
      setClickedNavLink(sub);
    }
  }, [category, location]);

  useEffect(() => {
    setPage(0);
    setFilteredProducts(getFilteredProducts());
  }, [category, clickedNavLink, products]);

  useEffect(() => {
    setPage(0);
  }, [prodsPerPage]);

  useEffect(() => {
    setPagedProducts(getPagedProducts());
  }, [page, filteredProducts, prodsPerPage]);

  const getFilteredProducts = () => {
    const fprod = products.filter((product) => {
      if (category === "all") {
        if (subRoute === "all") return true;
        else
          return product.tags
            .map((tag) => tag.toLowerCase())
            .includes(subRoute);
      } else {
        if (subRoute === "all")
          return product.tags
            .map((tag) => tag.toLowerCase())
            .includes(category);
        else {
          const refinedTag = product.tags.map((tag) => tag.toLowerCase());
          const mustHave = [subRoute, category];
          const result = mustHave.every((val) => refinedTag.includes(val));
          return result;
        }
      }
    });
    return fprod;
  };

  const getPagedProducts = () => {
    const pagedProds = [];
    for (
      let i = page * prodsPerPage;
      i < Math.min(page * prodsPerPage + prodsPerPage, filteredProducts.length);
      i++
    ) {
      if (filteredProducts) pagedProds.push(filteredProducts[i]);
    }
    return pagedProds;
  };

  const pages = [];
  const pageCount = filteredProducts.length / prodsPerPage;
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
      <Stack
        p={3}
        flexWrap={"wrap"}
        sx={{ background: "rgba(215,215,215,0.2)" }}
        gap={1}>
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ letterSpacing: ".2rem" }}>
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
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent={"center"} my={1}>
        {pages}
      </Stack>
      {filteredProducts && filteredProducts.length > 0 ? (
        <Container
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            my: "20px",
            justifyContent: "center",
          }}>
          {pagedProducts &&
            pagedProducts.length != 0 &&
            pagedProducts?.map((item) => {
              return <ProductCard item={item} key={item._id} />;
            })}
        </Container>
      ) : (
        <Typography variant="h6" mt={10} align="center">
          No available products.
        </Typography>
      )}
      <Stack direction="row" justifyContent={"center"} my={1}>
        {pages}
      </Stack>
    </Fragment>
  );
};

export default CategoryScreen;
