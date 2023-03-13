import { useAuth0 } from '@auth0/auth0-react'
import React from "react"
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log in</Button>
  )
}

export default LoginButton