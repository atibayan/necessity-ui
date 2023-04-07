import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  Stack,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAuth0 } from "@auth0/auth0-react";
import CartControls from "./CartControls";

export default function ProductCard({ item }) {
  const { addToWishlist, isInWishlist } = useShoppingCart();
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
          {item.images.map((image, idx) => (
            <CardMedia
              key={idx}
              sx={{ height: 230, width: 230, cursor: "pointer" }}
              image={image.signedImage}
              title={item.name}
            />
          ))}
        </Slider>
      </Link>

      <CardContent>
        <Typography
          mt={1}
          gutterBottom
          variant="body"
          component="div"
          sx={{
            minHeight: "60px",
          }}>
          {item.name.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            minHeight: "40px",
          }}>
          {item.activeFlag ? (
            item.discount === 0 ? (
              <Typography>CAD ${(item.price * 1).toFixed(2)}</Typography>
            ) : (
              <Stack>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "line-through" }}>
                  CAD ${(item.price * 1).toFixed(2)}
                </Typography>
                <Typography>
                  CAD ${(((100 - item.discount) / 100) * item.price).toFixed(2)}
                </Typography>
              </Stack>
            )
          ) : null}

          <Box>
            <CartControls item={item} longBtn={false} />
          </Box>
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
