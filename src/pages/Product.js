import React from 'react';
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Container = styled.div``;
const Wrapper = styled.div`
    padding:50px;
    display:flex;
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width:100%;
    height: 90vh;
    object-fit: cover;
    `;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width:50%;
    margin: 30px 0px;
    display:flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    display:flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-weight: 200;
    font-size:20px;
`;

const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding:5px;
`;

const SizeOption = styled.option``;

const AddContainer = styled.div`
    display:flex;
    align-items: center;
    width:50%;
    justify-content: space-between;
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
const Product = () => {
    return(
        <Container>
        <Header/>
        <Wrapper>
            <ImgContainer>
                <Image src="https://images.pexels.com/photos/10116617/pexels-photo-10116617.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"/>
            </ImgContainer>
            <InfoContainer>
                <Title>Denim Jeans</Title>
                <Description>- Fabric designed to combine comfort and a classic denim feel.
- High-rise, ankle-length straight jeans.
- The slim fit and straight line from the waist to the ankles shows off the legs and match with a variety of styles.</Description>
                <Price>$49.99</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                            <FilterColor color="black"/>
                            <FilterColor color="darkblue"/>
                            <FilterColor color="gray"/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <SizeOption>S</SizeOption>
                            <SizeOption>M</SizeOption>
                            <SizeOption>L</SizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
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
        <Footer/>
        </Container>
    )
}

export default Product;