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
  return <Container>Free Shipping on Orders Over $100</Container>;
};

export default Announcement;
