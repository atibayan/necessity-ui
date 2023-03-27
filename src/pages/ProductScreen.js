import { useShoppingCart, ShoppingCartProvider } from '../context/ShoppingCartContext';
import {Box, Card, CardMedia, CardContent,Typography} from "@mui/material";
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const ProductScreen = () => {

    const { products, selected, handleSelected } = useShoppingCart()

    console.log('selected in list',selected);
  return(
    <Container>
        <Wrapper>
            <ImgContainer>
                <CardMedia sx={{ height: 230, width: 230}}
                    style={{margin:20, display:'inline-block', textAlign:'left', padding: 20, width:'70%', height: '70vh', objectFit: 'cover'}}
                    image={selected.images[0].signedImage}
                    title={selected.name}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{selected.name}</Title>
                <Typography style={{padding: 5, fontFamily: 'monospace'}}>Product ID: {selected._id}</Typography>
                <Typography style={{padding: 5, fontFamily: 'monospace'}}>Product Description: {selected.description}</Typography>
                <Typography style={{padding: 5, fontFamily: 'monospace'}}>Stock: {selected.quantity_on_hand}</Typography>
                <Typography style={{padding: 5, fontFamily: 'monospace'}}>Rating: {selected.rating}</Typography>
                <Price>Price: CAD  ${(selected.price * 1).toFixed(2)}</Price>
                <AddContainer>
                    <AmountContainer>
                        <RemoveIcon/>
                        <Amount>1</Amount>
                        <AddIcon/>
                    </AmountContainer>
                    <Button>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        </Container>

  )
}

const Container = styled.div``;
const Wrapper = styled.div`
    padding:50px;
    display:flex;
`;

const ImgContainer = styled.div`
    flex: 1;
`;


const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    fontFamily: 'monospace';
    color: 'grey';
    
`;

const Title = styled.h1`
    font-weight: 200;
    font-size: 80px;
    padding: 5;
    
`;


const Price = styled.span`
    font-weight: 100;
    font-size: 30px;
    margin-top: 20px;
`;


const AddContainer = styled.div`
    display:flex;
    align-items: center;
    width:50%;
    justify-content: space-between;
    margin-top: 20px;
`;
const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`;

const Amount = styled.option`
    width:30px;
    height:30px;
    border-radius:10px;
    border: 1px solid teal;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0px 2px;
`;
const Button = styled.button`
    padding:15px;
    border: 2px solid teal;
    background-color:white;
    pointer: cursor;
    font-weight: 500;

`;

export default ProductScreen;