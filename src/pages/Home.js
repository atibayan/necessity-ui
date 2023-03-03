import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Footer from '../components/Footer';

const Home = () => {
    return(
        <div>
            <Announcement/>
            <Header/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Footer/>
        </div>
    )
}

export default Home;