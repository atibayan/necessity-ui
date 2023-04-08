import React from "react";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Wishlist from "./Wishlist";
import Checkout from "./Checkout";
import Footer from "../components/Footer";
import ProductScreen from "./ProductScreen";
import CategoryScreen from "./CategoryScreen";
import OrderHistory from "./OrderHistory";
import SearchResult from "../components/SearchResult"
import { useAuth0 } from "@auth0/auth0-react";
import AdminPanel from "./AdminPanel";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import '../App.css'

const Landing = () => {
  return (
    <>
      <Slider />
      <Products />
    </>
  );
};

const Home = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  return (
    <ShoppingCartProvider>
      <Announcement />
      <Navbar />
      <CartDrawer />

      {user?.user_role === "admin" ? <AdminPanel /> : null}

      {!user || user?.user_role !== "admin" ? (
        <>
        { window.location.pathname !== "/" ? (
          <div className="button-container">
          <button onClick={() => navigate(-1)}>⇦</button>
          </div>
        ) : null
        }
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/products/search-result/" element={<SearchResult/>}/>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/product/category/:cat" element={<CategoryScreen />}>
              <Route
                path="/product/category/:cat/top"
                element={<CategoryScreen />}
              />
              <Route
                path="/product/category/:cat/bottom"
                element={<CategoryScreen />}
              />
              <Route
                path="/product/category/:cat/footwear"
                element={<CategoryScreen />}
              />
            </Route>
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          { window.location.pathname !== "/" ? (
            <div className="button-container">
            <button onClick={() => navigate(-1)}>⇦</button>
           </div>
            ) : null
          }
        </>
      ) : null}
          <Footer />
    </ShoppingCartProvider>
  );
};

export default Home;
