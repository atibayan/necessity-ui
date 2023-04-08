import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Badge,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useState, Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import { useShoppingCart } from "../context/ShoppingCartContext";

const pages = ["women", "men", "kids", "all"];
const adminPages = ["Manage Products", "View Transactions"];

const Navbar = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const open = Boolean(anchorElUser);

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

  const { cartQuantity, wishlistQuantity, toggleDrawer } = useShoppingCart();
  const fGrow = user && user.user_role == "admin" ? 5 : 0.7;

  return (
    <AppBar
      position="static"
      className="header"
      sx={{ backgroundColor: theme.palette.bg.heading }}>
      <Toolbar className="toolbar">
        {/* Menus */}
        {user && user.user_role == "admin" ? null : (
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="white">
              <MenuIcon
                sx={{ cursor: "pointer", color: theme.palette.text.custom }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page.toUpperCase()}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
        <Link to="/">
          <Avatar variant="rounded" src={`/img/logo.png`} />
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: theme.palette.text.custom,
          }}>
          <Typography
            variant="h4"
            noWrap
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: { xs: 1, md: 2 },
              textDecoration: "none",
              mx: 2,
              color: theme.palette.text.custom,
            }}>
            NECESSITY
          </Typography>
        </Link>

        <Box
          sx={{
            flexGrow: fGrow,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          {user && user.user_role == "admin"
            ? adminPages.map((page, idx) => (
                <NavLink
                  to={"/" + page.replace(/ /g, "").toLocaleLowerCase()}
                  style={({ isActive, isPending }) => {
                    return {
                      textDecoration: "none",
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "inherit",
                      color: isActive
                        ? theme.palette.bg.heading
                        : theme.palette.text.custom,
                    };
                  }}
                  key={idx}>
                  <Typography
                    variant="h6"
                    sx={{
                      my: 2,
                      mx: 2,
                    }}>
                    {page.toUpperCase()}
                  </Typography>
                </NavLink>
              ))
            : pages.map((page, idx) => (
                <NavLink
                  to={"/product/category/" + page}
                  style={({ isActive, isPending }) => {
                    return {
                      textDecoration: "none",
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "inherit",
                      color: isActive
                        ? theme.palette.bg.heading
                        : theme.palette.text.custom,
                    };
                  }}
                  key={idx}>
                  <Typography
                    variant="h6"
                    sx={{
                      my: 2,
                      mx: 2,
                    }}>
                    {page.toUpperCase()}
                  </Typography>
                </NavLink>
              ))}
        </Box>
        {user && user.user_role == "admin" ? null : <SearchBar />}
        <Stack
          direction="row"
          gap={1}
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center",
            mx: 2,
          }}>
          {user && user.user_role == "admin" ? null : (
            <Fragment>
              <Link to="/wishlist" style={{ color: theme.palette.text.custom }}>
                <Tooltip title="Wishlist">
                  <Badge badgeContent={wishlistQuantity} color="primary">
                    <FavoriteBorderIcon />
                  </Badge>
                </Tooltip>
              </Link>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlinedIcon
                  sx={{ cursor: "pointer", color: theme.palette.text.custom }}
                  onClick={() => toggleDrawer()}
                />
              </Badge>
            </Fragment>
          )}

          {isAuthenticated ? (
            <Fragment>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  variant="rounded"
                  alt={user.nickname}
                  src={user.picture}
                  sx={{ minHeight: 45, minWidth: 45 }}
                />
              </IconButton>
              {user.user_role === "user" ? (
                <Menu
                  anchorEl={anchorElUser}
                  open={open}
                  onClose={handleCloseUserMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}>
                  <Link
                    to="/orderhistory"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      Order History
                    </MenuItem>
                  </Link>
                </Menu>
              ) : null}
              <LogoutButton />
            </Fragment>
          ) : (
            <LoginButton />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
