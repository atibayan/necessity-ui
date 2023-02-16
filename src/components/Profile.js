import React from "react"
import { useAuth0 } from '@auth0/auth0-react';
import FetchCart from './FetchCart';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return;

  console.log(user.picture)
  return (<><h2>Hi {user.nickname}</h2><FetchCart /></>);
  // return (<><h2>Hi {user.nickname}</h2></>);

}

export default Profile;