import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { useShoppingCart } from '../context/ShoppingCartContext';

const cardActionBtnStyle = {minHeight: 0, minWidth: 0, p: 0.7, m: 1}

const MinusCartBtn = ({item}) => {
  console.log(item)
  const { decreaseCartQuantity } = useShoppingCart()
  return (
    <Button variant="contained" color="secondary" sx={cardActionBtnStyle}
      onClick={() => decreaseCartQuantity(item._id)}> <RemoveIcon fontSize="small" /> </Button>
  )
}

const AddCartBtn = ({item}) => {
  const { increaseCartQuantity } = useShoppingCart()
  return (
    <Button variant="contained" color="secondary" sx={cardActionBtnStyle}
      onClick={() => increaseCartQuantity(item._id)}> <AddIcon fontSize="small" /> </Button>
  )
}

const QtyBtn = ({item}) => {
  const { getQuantity } = useShoppingCart()
  return (
    <Button disabled color="secondary" sx={{minHeight: 0, minWidth: 0, p: 0, m: 0 }}> {getQuantity(item._id)} </Button>
  )
}

const CartBtn = ({item}) => {
  const { increaseCartQuantity } = useShoppingCart()
  return (
    <Button variant="contained" color="secondary" sx={cardActionBtnStyle}
      onClick={() => increaseCartQuantity(item._id)}> <ShoppingCartIcon fontSize="small"/> </Button>
  )
}

const DeleteBtn = ({item}) => {
  const { removeFromCart } = useShoppingCart()
  return (
    <Button variant="contained" color="secondary" sx={cardActionBtnStyle}
      onClick={() => removeFromCart(item._id)}> <DeleteForeverIcon fontSize="small"/> </Button>
  )
}

export {
  AddCartBtn,
  MinusCartBtn,
  QtyBtn,
  CartBtn,
  DeleteBtn
}