import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Announcement from '../components/Announcement';
// import Slider from '../components/Slider';
// import Categories from '../components/Categories';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import AdminPanel from '../components/AdminPanel';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';

const Home = () => {
    const { isAuthenticated, user } = useAuth0();
    return(
        <ShoppingCartProvider>
            <Announcement/>
            <Navbar />
            <CartDrawer />

            {user?.user_role == 'admin' ? <AdminPanel /> : <></>}

            {!user || user?.user_role != 'admin' ? 
            <>
                {/* <Slider/>
                <Categories/>
                <Products/> */}
                <Products/>
                <Footer />
            </> :
            <></>}
           
        </ShoppingCartProvider>
    )
}

export default Home;
