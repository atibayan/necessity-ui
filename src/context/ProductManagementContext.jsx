import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffectOnce } from "../utils/useEffectOnce";
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const ProductManagementContext = createContext({});

export function useProductManagement() {
  return useContext(ProductManagementContext);
}

export function ProductManagementProvider({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [products, setProducts] = useState([]);

  useEffectOnce(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`${serverUrl}product`);
      setProducts(data.products);
    };
    getProducts();
  }, []);

  const updateProducts = async () => {
    const { data } = await axios.get(`${serverUrl}product`);
    setProducts(data.products);
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
      }}>
      {children}
    </ProductManagementContext.Provider>
  );
}
