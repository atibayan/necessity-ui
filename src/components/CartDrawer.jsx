import React, { Fragment } from "react";
import {
  Box,
  Typography,
  Stack,
  Drawer,
  Avatar,
  Divider,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DeleteBtn } from "./CartButtons";
import { Link } from "react-router-dom";
import CartEmpty from "./CartEmpty";
import { useSnackbar } from "notistack";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartControls from "./CartControls";

const styledTableCell = {
  padding: 0.5,
};

const CartSummary = () => {
  const { subTotalCart, gst, pst } = useShoppingCart();
  return (
    <TableContainer>
      <Table sx={{ mx: "auto" }}>
        <TableBody>
          <TableRow>
            <TableCell sx={styledTableCell}>Subtotal</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {parseFloat(subTotalCart).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>GST (5%)</TableCell>
            <TableCell sx={styledTableCell} align="right">
              {gst}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>PST (7%)</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {pst}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>Estimated Shipping</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {subTotalCart >= 100 ? "FREE" : "10.00"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>
              <Typography variant="h6">Estimated Total</Typography>
            </TableCell>
            <TableCell align="right" sx={styledTableCell}>
              <Typography variant="h6">
                CAD $
                {(
                  parseFloat(subTotalCart) +
                  parseFloat(gst) +
                  parseFloat(pst) +
                  (subTotalCart >= 100 ? 0 : 10)
                ).toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CartItem = ({ id, quantity }) => {
  const { products, getQuantity, toggleDrawer } = useShoppingCart();

  const product = products.find((item) => item._id === id);

  if (product === null) return null;
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Link to={`/product/${product._id}`} onClick={() => toggleDrawer()}>
        <Avatar
          src={product.images[0].signedImage}
          variant="rounded"
          sx={{ height: 100, width: 100 }}
        />
      </Link>
      <Box sx={{ width: 1 / 2 }}>
        <Link
          to={`/product/${product._id}`}
          onClick={() => toggleDrawer()}
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}>
          <Typography>{product.name.toUpperCase()}</Typography>
        </Link>
        {product.activeFlag ? (
          product.discount === 0 ? (
            <Typography variant="caption">
              CAD ${(product.price * 1).toFixed(2)}
            </Typography>
          ) : (
            <Stack direction="row" gap={1}>
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through" }}>
                CAD ${(product.price * 1).toFixed(2)}
              </Typography>
              <Typography>
                CAD $
                {(((100 - product.discount) / 100) * product.price).toFixed(2)}
              </Typography>
            </Stack>
          )
        ) : null}
        <Stack alignItems="flex-start">
          <CartControls item={product} longBtn={false} />
        </Stack>
        <Box>
          {product.activeFlag && product.quantity_on_hand < 50 ? (
            <Typography variant="caption">Only a few left in stock!</Typography>
          ) : null}
        </Box>
      </Box>

      <Box sx={{ width: 1 / 3, textAlign: "right" }}>
        {product.activeFlag ? (
          <Fragment>
            Subtotal
            <br />$
            {product.discount === 0
              ? (product.price * getQuantity(id)).toFixed(2)
              : (
                  (((100 - product.discount) / 100) * product.price).toFixed(
                    2
                  ) * getQuantity(id)
                ).toFixed(2)}
          </Fragment>
        ) : null}
      </Box>

      <Box>
        <DeleteBtn item={{ _id: id, quantity }} />
      </Box>
    </Stack>
  );
};

export default function CartDrawer() {
  const { drawerState, toggleDrawer, cartItems, cartQuantity, canCheckout } =
    useShoppingCart();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Drawer
      anchor="right"
      PaperProps={{
        sx: {
          width: "calc(350px + 15vw)",
          p: 2,
        },
      }}
      open={drawerState}
      onClose={() => toggleDrawer()}>
      {cartQuantity === 0 ? (
        <CartEmpty />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant="h5"
            noWrap
            sx={{
              letterSpacing: ".2rem",
              justifyContent: "center",
              m: 3,
            }}>
            YOUR CART
          </Typography>
          <Stack
            direction={"column"}
            spacing={2}
            divider={<Divider />}
            width={1}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
          <Divider sx={{ my: 1, backgroundColor: "black", opacity: 0.3 }} />
          <CartSummary />
          <Box m={2} p={2}>
            <Link
              to={canCheckout() ? "/checkout" : {}}
              style={{ textDecoration: "none" }}
              onClick={() => {
                canCheckout()
                  ? toggleDrawer()
                  : enqueueSnackbar("Delete unavailable products from cart.", {
                      variant: "error",
                    });
              }}>
              <Button variant="contained">Checkout</Button>
            </Link>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
