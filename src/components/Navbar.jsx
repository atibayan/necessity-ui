import { Link } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import { useShoppingCart } from "../context/ShoppingCartContext";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const pages = ["Women", "Men", "Kids", "All"];

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

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

  const { cartQuantity, wishlistQuantity, drawerState, toggleDrawer } =
    useShoppingCart();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" className="header" color="secondary">
      <Toolbar className="toolbar">
        {/* Menus */}
        <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <MenuIcon />
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
                <Typography textAlign="center">{page.toUpperCase()}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography
            variant="h4"
            noWrap
            sx={{
              display: { xs: "flex", md: "flex" },
              flexGrow: { xs: 1, md: 0 },
              color: "inherit",
              textDecoration: "none",
            }}>
            NECESSITY
          </Typography>
        </Link>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          {pages.map((page, idx) => (
            <Link
              to={"/product/category/" + page}
              style={{ textDecoration: "none", color: "white" }}
              key={idx}>
              <Typography
                variant="h6"
                sx={{
                  my: 2,
                  mx: 2,
                }}>
                {page.toUpperCase()}
              </Typography>
            </Link>
          ))}
        </Box>

        <SearchBar />

        <Box
          sx={{
            display: "flex",
            flexGrow: 0.08,
            justifyContent: "space-around",
            mr: 5,
          }}>
          <Link to="/wishlist" style={{ color: "white" }}>
            <Tooltip title="Wishlist">
              <Badge badgeContent={wishlistQuantity} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </Tooltip>
          </Link>
          <Badge badgeContent={cartQuantity} color="primary">
            <ShoppingCartOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => toggleDrawer()}
            />
          </Badge>
        </Box>

        {/* Profile menu */}
        {isAuthenticated ? (
          <Box sx={{ flexGrow: 0.1 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.nickname}
                src={user.picture}
                sx={{ minHeight: 45, minWidth: 45 }}
              />
            </IconButton>
            <LogoutButton />
            <Typography
              sx={{
                display: { xs: "none", md: "inline-block" },
                width: "50px",
                fontSize: "10px",
                textDecoration: "none",
                verticalAlign: "middle",
              }}>
              Logged in as {user.user_role.toUpperCase()}
            </Typography>
          </Box>
        ) : (
          <LoginButton />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
