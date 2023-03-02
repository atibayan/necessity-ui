/*import React from 'react';
import styled from "styled-components";
import WidgetsIcon from '@mui/icons-material/Widgets';
import {useState} from 'react'
import { navItems } from '../data'

const Container = styled.div`
    height: 50px;
    background-color: #f6f6f6;
    
`;

const NavbarContainer = styled.div`
    justify-content:center;
    padding: 5px;
    height: 30px;
    display: flex;
    gap: 30px;
`;

const Categories = styled.p`
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);

`;

const DropdownMenu = styled.div`

`;

const MenuItem = styled.p`
        display:flex;
        margin: 10px auto
`;

const Navbar = () => {

    const [selected, setSelected] = useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

    return(
        <Container>
            <NavbarContainer>
                <WidgetsIcon style={{color:"darkgrey", cursor:"pointer"}}/>
                <Categories value={selected} onChange={selectionChangeHandler}>Tops</Categories>
                <Categories value={selected} onChange={selectionChangeHandler}>Bottoms</Categories>
                <Categories value={selected} onChange={selectionChangeHandler}>Dresses</Categories>
                <Categories value={selected} onChange={selectionChangeHandler}>Jackets</Categories>
                <Categories value={selected} onChange={selectionChangeHandler}>Accessories</Categories>
                <Categories value={selected} onChange={selectionChangeHandler}>Sale</Categories>
            </NavbarContainer>
            <DropdownMenu value={selected} onChange={selectionChangeHandler}>
                {navItems.map((item)=>{
                    if(item.category === "Tops")
                    <MenuItem>
                    key={item.id}
                    title={item.title}
                    </MenuItem>
                })}
            </DropdownMenu>
        </Container>
    )};



export default Navbar;*/

import React, { useState } from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/*const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));*/

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        Categories
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Clothing</MenuItem>
        <MenuItem onClick={handleClose}>Shoes</MenuItem>
        <MenuItem onClick={handleClose}>Accessories</MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;