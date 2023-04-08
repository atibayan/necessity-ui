import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useEffectOnce } from "../utils/useEffectOnce";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuid } from "uuid";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [drawerState, setDrawerState] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [session, setSession] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (search) => {

    var filteredProducts = products.filter((product) => {
      if ((
        product.tags.toString().toLowerCase().includes(search) ||
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) 
      ) && (search !== '' )) {
        return true;
      };
      return false;
    }); 
      setSearchResult(filteredProducts)
  }

  const handleSelected = (item) => {
    setSelected(item);
  };
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  useEffectOnce(() => {
    const getProducts = async () => {
      console.log(`getting product...`);
      const { data } = await axios.get(`${serverUrl}product`);
      setProducts(data.products);
    };
    getProducts();

    const getCartItemsFromDB = async (userId) => {
      console.log(`getting cart...`);
      const { data } = await axios.get(`${serverUrl}cart/${userId}`);
      return data.cartItems;
    };

    const getWishlistItemsFromDB = async (userId) => {
      console.log(`getting wishlist...`);
      const { data } = await axios.get(`${serverUrl}wishlist/${userId}`);
      return data.wishlist;
    };

    const session_uuid = window.localStorage.getItem("session_uuid");
    if (session_uuid == "" || !session) {
      const unique_id = uuid();
      window.localStorage.setItem("session_uuid", unique_id);
      setSession(unique_id);
    } else {
      setSession(session_uuid);
    }
    if (isAuthenticated) {
      setSession(user.sub);
      getWishlistItemsFromDB(user.sub).then((wishlist) => {
        setWishlistItems(wishlist);
      });
    }

    if (!isAuthenticated && !isLoading) {
      const storedCartItems = window.localStorage.getItem("cartItems");
      const items = storedCartItems ? JSON.parse(storedCartItems) : [];
      if (items) {
        setCartItems(items);
      }
    } else if (isAuthenticated && !isLoading) {
      const storedCartItems = window.localStorage.getItem("cartItems");
      const items = storedCartItems ? JSON.parse(storedCartItems) : [];
      getCartItemsFromDB(user.sub)
        .then((dbItems) => {
          dbItems.forEach((dbItem) => {
            const objIndex = items.findIndex((obj) => obj.id === dbItem.id);
            if (objIndex === -1) {
              items.push(dbItem);
            } else {
              items[objIndex].quantity = Math.max(
                items[objIndex].quantity,
                dbItem.quantity
              );
            }
          });
          setCartItems(items);
          window.localStorage.setItem("cartItems", []);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      updateCartInDB(user.sub);
    }
  }, [cartItems]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) return;
    async function updateWishlistInDB(userId) {
      if (wishlistItems != 0) console.log(`updating wishlist...`);
      await axios.put(`${serverUrl}wishlist/`, {
        userId,
        wishlistItems,
      });
    }
    updateWishlistInDB(user.sub);
  }, [wishlistItems, isAuthenticated, user]);

  const cartQuantity =
    cartItems.length != 0
      ? cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
      : 0;
  const wishlistQuantity = wishlistItems.length;
  const subTotalCart =
    cartItems.length != 0
      ? cartItems
          .reduce((sum, item) => {
            const product = products.find((p) => p._id === item.id);
            const discounted_price = product?.activeFlag
              ? product?.discount === 0
                ? sum + product?.price * item.quantity
                : sum +
                  ((100 - product.discount) / 100) *
                    product.price *
                    item.quantity
              : sum + 0;
            return discounted_price;
          }, 0)
          .toFixed(2)
      : 0;
  const gst = (subTotalCart * 0.05).toFixed(2);
  const pst = (subTotalCart * 0.07).toFixed(2);
  const totalCart = (
    parseFloat(subTotalCart) +
    parseFloat(gst) +
    parseFloat(pst) +
    parseFloat(getShippingFee())
  ).toFixed(2);

  async function updateCartInDB(userId) {
    console.log(`updating cart...`);
    const { data } = await axios.put(`${serverUrl}cart`, {
      userId,
      cartItems,
    });
  }

  function canCheckout() {
    const found = cartItems.find((cartItem) => {
      const pdetails = products.find((p) => cartItem.id === p._id);
      return pdetails && pdetails.activeFlag === false ? true : false;
    });
    return found && Object.keys(found).length > 0 ? false : true;
  }

  async function resetCart() {
    setCartItems([]);
  }

  function getShippingFee() {
    let fee = 0;
    if (subTotalCart >= 100 && deliveryMethod == "standard") fee = 0;
    else if (subTotalCart < 100 && deliveryMethod == "standard") fee = 10;
    else if (deliveryMethod == "express") fee = 40;
    return fee.toFixed(2);
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function isInCart(id) {
    if (cartItems) return cartItems.some((item) => item.id === id);
    else return false;
  }

  function getQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function addToWishlist(id) {
    setWishlistItems((currItems) => {
      if (currItems.find((item) => item === id) == null) {
        return [...currItems, id];
      } else {
        return currItems.filter((item) => item !== id);
      }
    });
  }

  function isInWishlist(id) {
    return wishlistItems.find((item) => item === id) ? true : false;
  }

  function removeFromWishlist(id) {
    setWishlistItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function toggleDrawer() {
    setDrawerState((prev) => !prev);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        isInCart,
        getQuantity,
        addToWishlist,
        wishlistQuantity,
        isInWishlist,
        drawerState,
        toggleDrawer,
        wishlistItems,
        handleSelected,
        selected,
        products,
        subTotalCart,
        totalCart,
        getShippingFee,
        deliveryMethod,
        setDeliveryMethod,
        gst,
        pst,
        resetCart,
        setDrawerState,
        session,
        removeFromWishlist,
        handleSearch,
        searchResult,
        canCheckout,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
