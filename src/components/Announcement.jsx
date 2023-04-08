import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { Box, useTheme } from "@mui/material";

const Announcement = () => {
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated && user.user_role == "admin" ? null : (
    <Box
      sx={{
        height: "25px",
        backgroundColor: "#2596be",
        // backgroundColor: theme.palette.primary.light,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "14px",
      }}>
      Free Shipping on Orders Over $100
    </Box>
  );
};

export default Announcement;
