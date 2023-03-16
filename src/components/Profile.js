import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return;
  //GET ORDER HISTORY FROM BACKEND
  //GET CART FROM BACKEND
  //GET FAVORITES FROM BACKEND
  //DISPLAY PRODUCTS PAGE

  return (
  <div>
    <p>Hi {user.nickname}</p>
  </div>
  )
}

export default Profile;