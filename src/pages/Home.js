import React from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
// import Categories from '../components/Categories';
import Products from '../components/Products';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Footer from '../components/Footer';
import ProductScreen from '../pages/ProductScreen';
import { useAuth0 } from '@auth0/auth0-react';
import AdminPanel from '../components/AdminPanel';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { Routes, Route, Navigate } from 'react-router-dom'


const Landing = () => {
    return (
        <>
            <Slider />
            <Products />
        </>
    )
}

const Home = () => {
    const { isAuthenticated, user } = useAuth0();
    return(
        <ShoppingCartProvider>
            <Announcement/>
            <Navbar />
            <CartDrawer />

            {user?.user_role == 'admin' ? <AdminPanel /> : null}

            {!user || user?.user_role != 'admin' ? 
            <>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/product/:id" element={<ProductScreen />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
            </> :
            null}
           
        </ShoppingCartProvider>
    )
}

export default Home;
