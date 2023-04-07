import * as React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Box, Typography } from "@mui/material";
import {
  CartBtnLong,
  MinusCartBtn,
  AddCartBtn,
  QtyBtn,
  CartBtn,
} from "../components/CartButtons";

const CartControls = ({ item, longBtn }) => {
  const { isInCart } = useShoppingCart();
  return item.activeFlag ? (
    isInCart(item._id) ? (
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
        }}>
        <MinusCartBtn item={item} />
        <QtyBtn item={item} />
        <AddCartBtn item={item} />
      </Box>
    ) : longBtn ? (
      <CartBtnLong item={item} />
    ) : (
      <CartBtn item={item} />
    )
  ) : (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {longBtn ? (
        <Typography variant="h6" color="error">
          This product is currently unavailable.
        </Typography>
      ) : (
        <Typography variant="body" color="error" sx={{ textAlign: "right" }}>
          Product is unavailable
        </Typography>
      )}
    </Box>
  );
};

export default CartControls;
