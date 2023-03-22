import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

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

  useEffect(() => {
      console.log(`Triggered getProduct`)
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
  }, 0)
  const totalCart = subTotalCart >= 100 ? subTotalCart * 1.12 : subTotalCart * 1.12 + 10;  

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
      products,
      subTotalCart,
      totalCart }} >
      {children}
    </ShoppingCartContext.Provider>
  )
}