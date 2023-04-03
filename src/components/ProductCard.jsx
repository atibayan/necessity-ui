import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { AddCartBtn, MinusCartBtn, QtyBtn, CartBtn } from "./CartButtons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

const heartInactiveStyle = {
  color: "#a9a9a9",
  opacity: "80%",
  stroke: "white",
  strokeWidth: 2,
};

export default function ProductCard({ item }) {
  const { isInCart, addToWishlist, isInWishlist } = useShoppingCart();
  return (
    <Card
      sx={{
        maxWidth: 230,
        minWidth: 230,
        minHeight: "350px",
        position: "relative",
      }}>
      <Link to={`/product/${item._id}`}>
        <CardMedia
          sx={{ height: 230, width: 230, cursor: "pointer" }}
          image={item.images[0]?.signedImage}
          title={item.name}
        />
      </Link>

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            minHeight: "70px",
          }}>
          {item.name.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              mt: 1,
            }}>
            CAD $ {(item.price * 1).toFixed(2)}
          </Typography>

          {isInCart(item._id) ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}>
              <MinusCartBtn item={item} />
              <QtyBtn item={item} />
              <AddCartBtn item={item} />
            </Box>
          ) : (
            <CartBtn item={item} />
          )}
        </Box>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "end",
          gap: "5px",
          top: 0,
          right: 0,
          margin: "5px",
          padding: 0,
        }}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
          }}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onClick={() => addToWishlist(item._id)}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
