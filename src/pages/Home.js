import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import AdminPanel from '../components/AdminPanel';

const Home = () => {
    const { isAuthenticated, user } = useAuth0();
    return(
        <div>
            <Announcement/>
            <NavBar />

            {user?.user_role == 'admin' ? <AdminPanel /> : <></>}

            {!user || user?.user_role != 'admin' ? 
            <>
                {/* <Slider/>
                <Categories/>
                <Products/>  */}
                <Footer />
            </> :
            <></>}
           
        </div>
    )
}

export default Home;