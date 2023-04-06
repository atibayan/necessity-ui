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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAuth0 } from "@auth0/auth0-react";

export default function ProductCard({ item }) {
  const { isInCart, addToWishlist, isInWishlist } = useShoppingCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Card
      sx={{
        maxWidth: 230,
        minWidth: 230,
        minHeight: "350px",
        position: "relative",
        background: "rgba(215, 215, 215, 0.2)",
      }}>
      <Link to={`/product/${item._id}`}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}>
          {item.images.map((image) => (
            <CardMedia
              key={image._id}
              sx={{ height: 230, width: 230, cursor: "pointer" }}
              image={image.signedImage}
              title={item.name}
            />
          ))}
        </Slider>
      </Link>

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            minHeight: "100px",
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
            checked={isInWishlist(item._id)}
            onClick={() =>
              isAuthenticated ? addToWishlist(item._id) : loginWithRedirect()
            }
          />
        </Box>
      </CardActions>
    </Card>
  );
}
