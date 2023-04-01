import Home from './pages/Home';
import { BrowserRouter } from "react-router-dom";

import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const THEME = createTheme({
   typography: {
    "fontFamily": `"Oswald", "Roboto", "Helvetica", "Arial", sans-serif`,
   }
});

const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  
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
      })()
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
    <ThemeProvider theme={THEME}>
      {!isLoading ? <Home /> : null}
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
