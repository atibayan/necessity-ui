import React from 'react';
import styled from "styled-components";
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Container = styled.div`
    height: 70px;
    background-color: #f6f6f6;
    justify-content:center;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display:flex;
    align-items: center;
    justify-content:space-between;
`;

const Left = styled.div`
    flex:1;
    display:flex;
`;

const Language = styled.span`
    font-size:14px;
    cursor:pointer;
`;

const Search = styled.div`
    border: 0.6px solid lightgrey;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
`;

const Input = styled.input`
    border:none;
`;

const Center = styled.div`
    flex:1;
    text-align:center;
`;

const Logo = styled.h1`
    font-weight:bold;
`;

const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin:10px;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);

`;

const Header = () =>{
    return(
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <Search><Input/><SearchIcon/></Search>
                </Left>
                <Center><Logo>LOGO</Logo></Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <MenuItem>
                    <Badge badgeContent={4}>
                        <ShoppingCartOutlinedIcon/>
                    </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Header;