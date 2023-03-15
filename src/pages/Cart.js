import React from 'react';
import styled from "styled-components";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Container = styled.div``;

const Wrapper = styled.div`
   padding: 20px;
`;
    
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    margin-bottom: 20px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;


const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
`;

const Info = styled.div`
    flex:3;
`;

const Product = styled.div`
    display:flex;
    justify-content:space-between;
`;

const ProductDetail = styled.div`
    flex:2;
    display:flex;
`;
const Image = styled.img`
    margin: 10px 0px;
    width:200px;
`;
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styled.span``;

const ProductId = styled.span``;
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius: 50px;
    background-color: ${(props) => props.color}
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;


const ProductAmountContainer = styled.div`
    display:flex;
    align-items: center;
    margin-bottom:20px;
`;
const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
`;
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
`;

const Hr = styled.hr`
    background-color: #eee;
    border:none;
    height:1px;
`;

const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    padding:10px;
    justify-content: space-between;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"}
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding:10px;
    background-color: black;
    color:white;
    font-weight:600;
`;




const Cart = () => {
    return(
        <Container>
            <Announcement/>
            <Header/>
            <Navbar/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2) </TopText>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts>
                    <TopButton type="filled">PROCEED TO CHECKOUT</TopButton>
                </Top>
                <Bottom>

                    <Info>
                        <Product>
                            <ProductDetail>
                                <Image src="https://cdn.mukama.com/31812-large_default/formal-friday-ultrafine-merino-t-shirt-black.jpg"/>
                                <Details>
                                    <ProductName><b>Product: </b>BLACK T-SHIRT</ProductName>
                                    <ProductId><b>ID: </b>1234333890</ProductId>
                                    <ProductColor color="black"/>
                                    <ProductSize><b>Size: </b> M </ProductSize>
                                </Details>                                   
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon/>
                                    <ProductAmount>1</ProductAmount>
                                    <RemoveIcon/>
                                </ProductAmountContainer>
                                <ProductPrice>$19</ProductPrice>
                            </PriceDetail>
                        </Product>
                        <Hr/>
                        <Product>
                            <ProductDetail>
                                <Image src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"/>
                                <Details>
                                    <ProductName><b>Product: </b>WHITE ALI RUNNING SHOES</ProductName>
                                    <ProductId><b>ID: </b>1234567890</ProductId>
                                    <ProductColor color="lightgrey"/>
                                    <ProductSize><b>Size: </b> 40 </ProductSize>
                                </Details>                                   
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon/>
                                    <ProductAmount>2</ProductAmount>
                                    <RemoveIcon/>
                                </ProductAmountContainer>
                                <ProductPrice>$80</ProductPrice>
                            </PriceDetail>
                        </Product>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$99</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Fee</SummaryItemText>
                            <SummaryItemPrice>$10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Discount</SummaryItemText>
                            <SummaryItemPrice>$-10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$99</SummaryItemPrice>
                        </SummaryItem>
                        <Button>CHECKOUT</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart;
