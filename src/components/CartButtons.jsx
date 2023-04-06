import React from "react";
import { Button } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useShoppingCart } from "../context/ShoppingCartContext";

const cardActionBtnStyle = { minHeight: 0, minWidth: 0, px: 0.6, m: 0.5 };

const MinusCartBtn = ({ item }) => {
  const { decreaseCartQuantity } = useShoppingCart();
  return (
    <Button
      variant="contained"
      sx={cardActionBtnStyle}
      onClick={() => decreaseCartQuantity(item._id)}>
      {" "}
      <RemoveIcon fontSize="small" />{" "}
    </Button>
  );
};

const AddCartBtn = ({ item }) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <Button
      variant="contained"
      sx={cardActionBtnStyle}
      onClick={() => increaseCartQuantity(item._id)}>
      {" "}
      <AddIcon fontSize="small" />{" "}
    </Button>
  );
};

const QtyBtn = ({ item }) => {
  const { getQuantity } = useShoppingCart();
  return (
    <Button disabled sx={{ minHeight: 0, minWidth: 0, p: 0, m: 0.2 }}>
      {" "}
      {getQuantity(item._id)}{" "}
    </Button>
  );
};

const CartBtn = ({ item }) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <Button
      variant="contained"
      sx={cardActionBtnStyle}
      onClick={() => increaseCartQuantity(item._id)}>
      <ShoppingCartIcon fontSize="small" />
    </Button>
  );
};

const CartBtnLong = ({ item }) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <Button variant="contained" onClick={() => increaseCartQuantity(item._id)}>
      Add To Cart
    </Button>
  );
};

const DeleteBtn = ({ item }) => {
  const { removeFromCart } = useShoppingCart();
  return (
    <Button
      variant="contained"
      sx={cardActionBtnStyle}
      onClick={() => removeFromCart(item._id)}>
      {" "}
      <DeleteForeverIcon fontSize="small" />{" "}
    </Button>
  );
};

export { AddCartBtn, MinusCartBtn, QtyBtn, CartBtn, DeleteBtn, CartBtnLong };
