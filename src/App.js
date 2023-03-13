import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';

import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    if(isAuthenticated){
      console.log(`Sending user authentication to backend....`);
      (async () => {
        const token = await getAccessTokenSilently()
        const response = await axios.post(`${serverUrl}user`,
        {
          user_id: user.sub
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response)
      })()
    }
  }, [isAuthenticated]);

  return (
    <Home />
  )
}

export default App;
