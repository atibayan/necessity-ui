import React from 'react';
import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Info = styled.div`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    opacity:0;
    background-color:grey;
    transition:all 0.5s ease;
    cursor:pointer;
`;

const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    &:hover ${Info}{
        opacity:0.3;
    }
`;

const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position:absolute;
`;

const Img = styled.img`
    height:75%;
    z-index:2;
`;



const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
    cursor:pointer;
    transition: all 0.5s ease;
    &:hover{
        background-color:white;
        transform: scale(1.3);
    }
`;

const Product = ({item}) => {
    return(
        <Container>
            <Circle/>
            <Img src={item.img}/>
            <Info>
                <Icon>
                    <ShoppingCartIcon/>
                </Icon>
                <Icon>
                    <SearchIcon/>
                </Icon>
                <Icon>
                    <FavoriteBorderIcon/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product;