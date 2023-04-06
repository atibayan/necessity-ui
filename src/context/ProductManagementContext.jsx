import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffectOnce } from "../utils/useEffectOnce";
import imageCompression from "browser-image-compression";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const ProductManagementContext = createContext({});

export function useProductManagement() {
  return useContext(ProductManagementContext);
}

export function ProductManagementProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffectOnce(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`${serverUrl}product`);
      setProducts(data.products);
    };
    getProducts();

    const getOrders = async () => {
      const { data } = await axios.get(`${serverUrl}order`);
      setOrders(data.orders);
    };
    getOrders();
  }, []);

  const updateProducts = async () => {
    const { data } = await axios.get(`${serverUrl}product`);
    setProducts(data.products);
  };

  const updateOrders = async () => {
    const { data } = await axios.get(`${serverUrl}order`);
    setOrders(data.orders);
  };

  async function handleImageUpload(imageFile) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }

  function getProduct(pid) {
    return products.find((item) => item._id === pid);
  }

  return (
    <ProductManagementContext.Provider
      value={{
        products,
        updateProducts,
        handleImageUpload,
        getProduct,
        setProducts,
        orders,
        updateOrders,
      }}>
      {children}
    </ProductManagementContext.Provider>
  );
}
