import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  alpha,
  InputBase,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const pages = ['Women', 'Men', 'Kids', 'Home'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' className='header' color='secondary'>
      <Toolbar className='toolbar'>        
        {/* Menus */}
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        
        
        <Typography
          variant='h5'
          noWrap
          component='a'
          href=''
          sx={{
            display: { xs: 'flex', md: 'flex' },
            flexGrow: {xs: 1, md: 0},
            fontFamily: 'monospace',
            fontWeight: 500,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
            borderRadius: '5px',
            padding: '0px 5px',
            justifyContent: 'center'
          }}
        >
          NECESSITY
        </Typography>
      
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        
        <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        

        <Box sx={{ flexGrow: 0.1 }}>
          <Tooltip title='Wishlist'>
            <IconButton disableRipple={true} style={{ color: 'white' }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <IconButton disableRipple={true} style={{ color: 'white' }}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>

        {/* Profile menu */}
        {
          isAuthenticated ? 
            <Box sx={{ flexGrow: 0.1}}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar alt={user.nickname} src={user.picture} />
              </IconButton>
              <LogoutButton />
              <Typography
                sx={{
                  display: { xs: 'none', md: 'inline-block' },
                  width: '50px',
                  fontSize: '10px',
                  textDecoration: 'none',
                  verticalAlign: 'middle'
                }}
              >Logged in as {user.user_role.toUpperCase()}
              </Typography>
            </Box> :
            <LoginButton />
        }
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
