import { Box } from '@mui/material'
import { useShoppingCart } from '../context/ShoppingCartContext'

const Checkout = () => {
  const { drawerState, toggleDrawer, products, cartItems } = useShoppingCart()
  return(
    <Box>
      Checkout goes here!
    </Box>
  )
}

export default Checkout;