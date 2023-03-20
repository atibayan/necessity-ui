import * as React from "react";
import {Box, Typography, Stack, Drawer, Avatar, Divider, List, ListItem, Button} from "@mui/material";
import {AddCartBtn, MinusCartBtn, QtyBtn, CartBtn, DeleteBtn} from './CartButtons';
import {Link} from 'react-router-dom'

import { useShoppingCart } from '../context/ShoppingCartContext';

const CartItem = ({id, quantity}) => {
   const { products, getQuantity } = useShoppingCart()

  const product = products.find(item => item._id === id)

  if (product == null) return null
  return (
    <Stack direction={{sm:'column', md: 'row'}} spacing={2} justifyContent="space-between">
      <Avatar src={product.images[0].signedImage} variant="rounded" sx={{ height: 100, width: 100 }} />
      <Box sx={{width: 1/2}}>
        <Box>{product.name.toUpperCase()}</Box>
        <Box>CAD ${(product.price * 1).toFixed(2)}</Box>
        <Box>
          <MinusCartBtn item={{_id: id, quantity}} />
          <QtyBtn item={{_id: id, quantity}} />
          <AddCartBtn item={{_id: id, quantity}} />
        </Box>
        <Box>
          {product.quantity_on_hand < 200 ? 
          <Typography variant="caption">
            Only a few left in stock!
          </Typography> : null}
        </Box>
      </Box>
      
      <Box sx={{width: 1/3, textAlign: 'right'}}>
        Subtotal< br />
        CAD ${(product.price * getQuantity(id)).toFixed(2)}
      </Box>

      <Box>
        <DeleteBtn item={{_id: id, quantity}}/>
      </Box>
    </Stack>
  )
}

export default function CartDrawer() {
  const { drawerState, toggleDrawer, products, cartItems } = useShoppingCart()

  return (
    <Drawer anchor="right" 
      PaperProps={{
        sx: {
          width: "calc(320px + 10vw)",
          p: 2 }}}
      open={drawerState}
      onClose={() => toggleDrawer()}>
      
      <Typography
        variant='h5'
        noWrap
        sx={{
          display: { xs: 'flex', md: 'flex' },
          flexGrow: {xs: 1, md: 0},
          fontFamily: 'monospace',
          fontWeight: 500,
          letterSpacing: '.2rem',
          color: 'inherit',
          textDecoration: 'none',
          borderRadius: '5px',
          padding: '0px 5px',
          justifyContent: 'center',
          m: 3
        }}
      >Your Cart</Typography>
      <Stack direction={'column'} spacing={2}
       divider={<Divider />}
       >
        {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
      </Stack>
      <Divider sx={{ my: 1, backgroundColor: 'black', opacity: 0.3 }} />
      <Stack>
        <Link to="/checkout">Checkout</Link>
      </Stack>
    </Drawer>
  );
}
