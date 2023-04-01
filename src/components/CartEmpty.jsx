import React, { Fragment } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const StyledStack = (props) => {
  return (
    <Stack
      sx={{
        my: "5vh",
        mx: "auto",
        p: 2,
      }}>
      {props.children}
    </Stack>
  );
};

const CartEmpty = () => {
  const { setDrawerState } = useShoppingCart();
  return (
    <Fragment>
      <StyledStack>
        <Typography
          variant="h5"
          sx={{
            display: { xs: "flex", md: "flex" },
            letterSpacing: ".2rem",
            justifyContent: "center",
            m: 3,
          }}>
          Your Cart is empty!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <figure style={{ display: "flex", flexFlow: "column" }}>
            <img
              src="/img/shopping-cart.png"
              style={{ width: "calc(80px + 50%)" }}
            />
            <Button
              variant="text"
              color="secondary"
              size="small"
              href="https://www.flaticon.com/free-icons/shopping-cart"
              sx={{
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}>
              Credits: Flaticon
            </Button>
          </figure>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
              m: 3,
            }}>
            Looks like you have not added anything to your cart. Go find
            products you like before check out.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDrawerState(false)}>
              Back to Shop
            </Button>
          </Link>
        </Box>
      </StyledStack>
    </Fragment>
  );
};

export default CartEmpty;
