import * as React from "react";
import {Link} from 'react-router-dom'
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const EmptyWishlist = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 5px",
          justifyContent: "center",
          mt: "10vh",
        }}>
        YOUR WISHLIST <FavoriteBorderIcon />
      </Typography>
      <Typography
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

const Wishlist = () => {
  const { products, wishlistQuantity, wishlistItems, removeFromWishlist, handleSelected, selected } = useShoppingCart();
  console.log(typeof removeFromWishlist)
  //array.filter(function(currentValue, index, arr), thisValue)
  const getWishlistItems = () => {
    const items = products.filter((product) => {
      return wishlistItems.includes(product._id);
    });
    return items;
  };

  // console.log("wishlist", wishlistItems);
  // console.log("products", products);

  return wishlistQuantity === 0 ? (
    <EmptyWishlist />
  ) : (
    <Box>
      <Typography
        variant="h5"
        noWrap
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          fontFamily: "monospace",
          fontWeight: 500,
          letterSpacing: ".2rem",
          color: "inherit",
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 5px",
          justifyContent: "center",
          m: 3,
        }}>
        Your WishList <FavoriteBorderIcon />
      </Typography>
      {getWishlistItems().map((item, idx) => (
        <Card
          key={idx}
          style={{ margin: 50, height: "300px", fontFamily: "monospace" }}
          sx={{ fontFamily: "monospace" }}>
          <Link to={`/product/${item._id}`}>
          <CardMedia //image of the product, need to handle onClick
            sx={{ height: 230, width: 230 }}
            style={{
              margin: 30,
              display: "inline-block",
              textAlign: "left",
              cursor: 'pointer'
            }}
            image={item.images[0].signedImage}
            title={item.name}
            onClick={()=>handleSelected(item)}
          />
          </Link>
          <CardContent
            style={{
              color: "grey",
              display: "inline-block",
              verticalAlign: "top",
              width: "calc(100% - 300px)",
              height: "100%",
              textAlign: "left",
            }}>
           <Button variant="contained" style={{float:'right', mt: 100, color:'white', backgroundColor: 'black' , fontSize:18}} 
           onClick={(item)=>removeFromWishlist(item._id)}>Remove From Wish List</Button>
            <Typography
              style={{
                padding: 7,
                fontSize: 35,
                color: "black",
                fontFamily: "monospace",
              }}>
              {item.name.toUpperCase()}
            </Typography>
            <Typography style={{ padding: 5, fontFamily: "monospace" }}>
              Product ID: {item._id}
            </Typography>
            <Typography style={{ padding: 5, fontFamily: "monospace" }}>
              Product Description: {item.description}
            </Typography>
            <Typography style={{ padding: 5, fontFamily: "monospace" }}>
              Price: CAD ${(item.price * 1).toFixed(2)}
            </Typography>
            <Typography style={{ padding: 5, fontFamily: "monospace" }}>
              Stock: {item.quantity_on_hand}
            </Typography>
            <Typography style={{ padding: 5, fontFamily: "monospace" }}>
              Rating: {item.rating}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Wishlist;
