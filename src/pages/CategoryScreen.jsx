import { useParams } from "react-router-dom";
import { useShoppingCart } from '../context/ShoppingCartContext';
import ProductCard from '../components/ProductCard';
import { Container, Typography } from '@mui/material';
import { NavLink, BrowserRouter } from "react-router-dom";

const CategoryScreen = () => {
  const params = useParams();

  const { products } = useShoppingCart();

  const filteredProducts = params.cat ? products.filter((product) => product.tags.includes(params.cat)) : products;

  console.log(params.cat);
  console.log(products.map(product => product.tags));
  console.log("Filtered " + filteredProducts);

  return (
    <>
    <p>Category is {params.cat}</p>
    <div>
      {/* <BrowserRouter> */}
        <NavLink to="/category1">Top</NavLink>
        <NavLink to="/category2">Bottom</NavLink>
      {/* </BrowserRouter> */}
    </div>
    <Container sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', my: '20px', justifyContent: 'center' }}>
      {filteredProducts.map((item) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </Container>

    </>
    
  )
};

export default CategoryScreen;
