import React from 'react';
import styled from "styled-components"
import Header from '../components/Header';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Footer from '../components/Footer';


const Container = styled.div`

`;

const Title = styled.h1`

`;

const FilterContainer = styled.div`
    display:flex;
    justify-conter: space-between;
`;

const Filter = styled.div`
    margin:20px;
`;

const FilterText = styled.span`
    font-size:20px;
    font-weight:600;

`;

const ProductList = () => {
return(
    <Container>
        <Announcement/>
        <Header/>
        <Title>Shirts</Title>
        <FilterContainer>
            <Filter><FilterText>Filter Products</FilterText></Filter>
            <Filter><FilterText>Sort Products</FilterText></Filter>
        </FilterContainer>
        <Products/>
    <Footer/>
    </Container>
)
}

export default ProductList;