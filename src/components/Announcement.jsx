import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #2596be;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

const Announcement = () => {
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated && user.user_role == "admin" ? null : (
    <Container>Free Shipping on Orders Over $100</Container>
  );
};

export default Announcement;
