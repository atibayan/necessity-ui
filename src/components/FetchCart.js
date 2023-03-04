import { useAuth0 } from '@auth0/auth0-react';
import {useState} from "react";

const FetchCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [ cart, setCart ] = useState("");

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently()//{
      const response = await fetch(
        `${serverUrl}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (<><button onClick={callSecureApi}>Get Cart Items</button><p>{cart}</p></>)

}

export default FetchCart;