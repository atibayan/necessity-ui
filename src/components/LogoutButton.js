import { useAuth0 } from '@auth0/auth0-react'
import React from "react"
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <IconButton disableRipple={true} style={{ color: 'white' }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <LogoutIcon />
    </IconButton>
  )
}

export default LogoutButton