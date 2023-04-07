import React, { useState, useEffect, Fragment } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Stack,
  Typography,
  Avatar,
  Button,
  Checkbox,
  useTheme,
} from "@mui/material";
import {
  CartBtnLong,
  MinusCartBtn,
  AddCartBtn,
  QtyBtn,
} from "../components/CartButtons";

import Carousel from "react-material-ui-carousel";

const ProductScreen = () => {
  const { products, isInWishlist, addToWishlist, isInCart } = useShoppingCart();
  const routeParams = useParams();
  const [item, setItem] = useState();
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const prod = products.find((item) => item._id === routeParams.id);
    if (prod) setItem(prod);
  }, [products]);

  return item ? (
    <Box
      sx={{
        width: "calc(300px + 40%)",
        mx: "auto",
        p: 5,
      }}>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="center"
        gap={3}>
        <Stack direction="row">
          <Stack mx={1} flexWrap={"wrap"}>
            {item.images.map((img, idx) => {
              const style =
                index === idx
                  ? {
                      border: `none`,
                      filter: `grayscale(0)`,
                    }
                  : {
                      border: `3px solid rgba(215,215,215,0.1)`,
                      filter: `grayscale(1)`,
                    };
              return (
                <Avatar
                  key={idx}
                  variant="rounded"
                  src={img.signedImage}
                  onClick={() => setIndex(idx)}
                  sx={{
                    ...style,
                    cursor: "pointer",
                    width: "50px",
                    height: "50px",
                  }}
                />
              );
            })}
          </Stack>
          <Box
            sx={{
              minWidth: "calc(200px + 10vw)",
              width: "calc(200px + 10vw)",
              height: "calc(200px + 10vw)",
              maxHeight: "calc(200px + 10vw)",
              overflow: "hidden",
            }}>
            <Carousel
              navButtonsAlwaysVisible={false}
              index={index}
              indicators={false}
              fullHeightHover={false}
              stopAutoPlayOnHover={true}
              duration={300}
              autoPlay={false}
              animation="slide"
              next={(next, active) => {
                setIndex(next);
              }}
              prev={(prev, active) => {
                setIndex(prev);
              }}>
              {item.images.map((img, idx) => {
                return (
                  <Avatar
                    key={idx}
                    variant="rounded"
                    src={img.signedImage}
                    sx={{
                      width: "calc(200px + 10vw)",
                      height: "calc(200px + 10vw)",
                      objectFit: "contain",
                    }}
                  />
                );
              })}
            </Carousel>
          </Box>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h4" sx={{}}>
            {item.name.toUpperCase()}
          </Typography>
          <Typography variant="h6">{item.description}</Typography>
          {item.activeFlag ? (
            item.discount === 0 ? (
              <Typography variant="h4">
                CAD ${(item.price * 1).toFixed(2)}
              </Typography>
            ) : (
              <Fragment>
                <Typography sx={{ textDecoration: "line-through" }}>
                  CAD ${(item.price * 1).toFixed(2)}
                </Typography>
                <Typography variant="h4">
                  CAD ${((item.price * 1 * item.discount) / 100).toFixed(2)}
                </Typography>
              </Fragment>
            )
          ) : null}
          {item.activeFlag ? (
            <Box>
              {isInCart(item._id) ? (
                <Fragment>
                  <MinusCartBtn item={item} />
                  <QtyBtn item={item} />
                  <AddCartBtn item={item} />
                </Fragment>
              ) : (
                <CartBtnLong item={item} />
              )}
            </Box>
          ) : (
            <Typography variant="h6" color="error">
              This product is currently unavailable.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  ) : null;
};

export default ProductScreen;
