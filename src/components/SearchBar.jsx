import React from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import { styled, alpha, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from 'react';
import { useShoppingCart } from "../context/ShoppingCartContext";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = ({ value, onChange, filteredProducts}) => {
  const navigate = useNavigate();
  const { handleSearch, searchResult} = useShoppingCart();
  const [search, setSearch] = useState('');
  //const [searchResult, setSearchResult] = useState([]);

  //moi lan search thay doi filter product
  // useEffect(() => {
  //   var filteredProducts = products.filter((product) => {
  //     if ((
  //       product.tags.toString().toLowerCase().includes(search) ||
  //       product.name.toLowerCase().includes(search) ||
  //       product.description.toLowerCase().includes(search) 
  //     ) && (search !== '' )) {
  //       return true;
  //     };
  //     return false;
  //   }); 
  //   },[search]);

  function handleKeyDown(e) {
    console.log(e.key)
    if (e.key === 'Enter') {
      //<Link to={`/search?q=${search}`}/>
      e.preventDefault();
      handleSearch(search);
      navigate("/products/search-result")
      //navigate(`/search?query=${search}`);
    }
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  }
    console.log(searchResult)
    
  return (
      <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
      <SearchIconWrapper>
      {/*<form onSubmit={onSubmit}>*/}
          <SearchIcon type="submit" value={value} onChange={onChange}  />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        //value={search}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleOnChange}
        onKeyPress={handleKeyDown}
      />
      </Search>)
}


export default SearchBar;



    // const handleSubmit = async (e) =>{
    //   e.preventDefault();
    //   setSearchResult([...filteredProducts])
    // } 
    // console.log("Search result", searchResult)