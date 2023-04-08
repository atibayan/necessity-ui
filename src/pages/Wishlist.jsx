import * as React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {
  Box,
  Card,
  Stack,
  Typography,
  Avatar,
  Button,
  Checkbox,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import CartControls from "../components/CartControls";
import { Link } from "react-router-dom";

const WishlistHeading = () => {
  return (
    <Typography
      variant="h5"
      sx={{
        display: { xs: "flex", md: "flex" },
        flexGrow: { xs: 1, md: 0 },
        letterSpacing: ".3rem",
        justifyContent: "center",
        my: "5vh",
      }}>
      YOUR WISHLIST <FavoriteBorderIcon />
    </Typography>
  );
};

const EmptyWishlist = () => {
  return (
    <Box>
      <WishlistHeading />
      <Typography
        variant="h6"
        sx={{
          margin: 10,
          justifyContent: "center",
          display: "flex",
        }}>
        Nothing was added in your wishlist yet.
      </Typography>
    </Box>
  );
};

const NeedLogin = () => {
  return (
    <Stack direction="column" justifyContent={"center"} alignItems={"center"}>
      <Typography
        variant="h5"
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          letterSpacing: ".3rem",
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 5px",
          justifyContent: "center",
          mt: "10vh",
        }}>
        OOPS... You're not logged in...
      </Typography>
      <img
        src="/img/oops.png"
        alt="/img/oops.png"
        style={{ width: "calc(80px + 5%)", marginTop: "5vh" }}
      />
      <Button
        variant="text"
        color="secondary"
        size="small"
        href="https://www.flaticon.com/free-icons/oops"
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}>
        Credits: Flaticon
      </Button>
      <Typography
        sx={{
          mt: 5,
          mb: 3,
          justifyContent: "center",
          display: "flex",
        }}>
        Login to save products to your wishlist....
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          mb: 10,
        }}>
        <LoginButton />
      </Box>
    </Stack>
  );
};

const Wishlist = () => {
  const { isAuthenticated } = useAuth0();
  const { products, wishlistItems, isInWishlist, addToWishlist } =
    useShoppingCart();

  return !isAuthenticated ? (
    <NeedLogin />
  ) : wishlistItems.length === 0 ? (
    <EmptyWishlist />
  ) : (
    <Box sx={{ width: "80%", mx: "auto", mb: "5vh", mt: "3vh" }}>
      <WishlistHeading />
      <Stack gap={2} sx={{ display: "flex", flexFlow: "row wrap" }}>
        {wishlistItems.map((wishlist, idx) => {
          const item = products.find((p) => p._id === wishlist);
          return item ? (
            <Card
              key={idx}
              sx={{
                flex: "1 1 400px",
                maxWidth: "600px",
                p: 2,
                background: "rgba(215, 215, 215, 0.2)",
              }}>
              <Stack direction="row" gap={3}>
                <Stack gap={1} sx={{ position: "relative" }}>
                  <Link to={`/product/${item._id}`}>
                    <Avatar
                      variant="rounded"
                      src={item.images[0].signedImage}
                      sx={{
                        width: "calc(100px + 5vw)",
                        height: "calc(100px + 5vw)",
                      }}
                    />
                  </Link>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      padding: 0,
                    }}>
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={isInWishlist(item._id)}
                      onClick={() => addToWishlist(item._id)}
                    />
                  </Box>
                  <CartControls item={item} longBtn={true} />
                </Stack>
                <Stack gap={1}>
                  <Typography variant="h5">
                    {item.name.toUpperCase()}
                  </Typography>
                  <Typography>{item.description}</Typography>
                  {item.activeFlag ? (
                    item.discount === 0 ? (
                      <Typography variant="h6">
                        CAD ${(item.price * 1).toFixed(2)}
                      </Typography>
                    ) : (
                      <Stack>
                        <Typography
                          variant="caption"
                          sx={{ textDecoration: "line-through" }}>
                          CAD ${(item.price * 1).toFixed(2)}
                        </Typography>
                        <Typography variant="h6">
                          CAD $
                          {(((100 - item.discount) / 100) * item.price).toFixed(
                            2
                          )}
                        </Typography>
                      </Stack>
                    )
                  ) : null}
                </Stack>
              </Stack>
            </Card>
          ) : null;
        })}
      </Stack>
    </Box>
  );
};

export default Wishlist;
