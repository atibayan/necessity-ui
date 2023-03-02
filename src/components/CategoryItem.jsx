import React from 'react';
import styled from "styled-components"

const Container = styled.div`
    flex:1;
    margin: 3px;
    height:70vh;
    position:relative;
`;

const Img = styled.img`
    width: 100%;
    height:100%;
    object-fit: cover;
`;

const Info = styled.h1`
    position:absolute;
    width: 100%;
    height:100%;
    top:0;
    left:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Title = styled.h2`
    color:white;
    margin-bottom:20px;
    font-weight:bold;
`;
const Button = styled.button`
    border:none;
    padding:10px;
    background-color:white;
    color:gray;
    cursor:pointer;
    font-weight:600;
    transition: all 0.5s ease;
    &:hover{
        font-weight: bold;
        transform: scale(1.3);
`;

const CategoryItem = ({item}) => {
    return(
        <Container>
            <Img src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </Container>
    )
}

export default CategoryItem;