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

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const adminPages = ["Manage Products", "View Transactions"];

const NavbarAdmin = () => {
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

  const fGrow = user && user.user_role == "admin" ? 5 : 0.7;

  return (
    <AppBar
      position="static"
      className="header"
      sx={{ backgroundColor: theme.palette.bg.heading }}>
      <Toolbar className="toolbar">
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
          {adminPages.map((page, idx) => (
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
          ))}
        </Box>

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
                  <Link to="/orderhistory">
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

export default NavbarAdmin;
