import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

const serverUrl = process.env.REACT_APP_SERVER_URL
const ShoppingCartContext = createContext({})

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider( { children } ) {
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [drawerState, setDrawerState] = useState(false);
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)

  const handleSelected = (item) => {
    setSelected(item);
  }
  const [deliveryMethod, setDeliveryMethod] = useState("standard")

  useEffect(() => {
      const getProducts = async () => {
          const { data } = await axios.get(`${serverUrl}product`)
          setProducts(data.products)
      }
      getProducts();
  }, [])

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
  const wishlistQuantity = wishlistItems.length
  const subTotalCart = cartItems.reduce((sum, item) => {
    const product = products.find(p => p._id === item.id)
    return sum + product.price * item.quantity
  }, 0).toFixed(2)
  const gst = (subTotalCart * 0.05).toFixed(2)
  const pst = (subTotalCart * 0.07).toFixed(2)
  const totalCart = (parseFloat(subTotalCart) + parseFloat(gst) + parseFloat(pst) + parseFloat(getShippingFee())).toFixed(2);
  
  // const totalCart = subTotalCart >= 100 ? subTotalCart * 1.12 : subTotalCart * 1.12 + 10;  

  function resetCart(){
    setCartItems([])
  }

  function getShippingFee(){
    let fee = 0;
    if(subTotalCart >= 100 && deliveryMethod == "standard")
      fee = 0
    else if (subTotalCart < 100 && deliveryMethod == "standard")
      fee = 10
    else if (deliveryMethod == "express")
      fee = 40
    return fee.toFixed(2)
  }

  function increaseCartQuantity(id){
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) == null) {
        return [...currItems, {id, quantity: 1}]
      } else {
        return currItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id){
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id)?.quantity == 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id){
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  function isInCart(id) {
    return cartItems.some(item => item.id === id)
  }

  function getQuantity(id) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function addToWishlist(id){
    setWishlistItems(currItems => {
      if(currItems.find(item => item === id) == null) {
        return [...currItems, id]
      } else {
        return currItems.filter(item => item !== id)
      }
    })
  }

  function isInWishlist(id){
    return wishlistItems.find(item => item === id)
  }

  function toggleDrawer(){
    setDrawerState(prev => !prev)
  }

  return (
    <ShoppingCartContext.Provider value={{
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
      setDrawerState }} >
      {children}
    </ShoppingCartContext.Provider>
  )
}
