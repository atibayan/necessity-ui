import NavBar from './components/NavBar';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userRole, setUserRole] = useState("");
  
  useEffect(() => {
    if(isAuthenticated){
      (async () => {
        const token = await getAccessTokenSilently()
        const response = await axios.post(`${serverUrl}user`, {
          user_id: user.sub,
          email: user.email,
          nickname: user.nickname,
          picture: user.picture
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUserRole(response.data.role)
      })()
    }
  }, [getAccessTokenSilently, isAuthenticated, userRole, setUserRole]);

  if(userRole === `admin`){
    return (
      <>
        <NavBar />
        <AdminPanel />
      </>
    )
  }
  else {
    return (
      <>
        <NavBar />
        <Profile />
      </>
    );
  }
}

export default App;