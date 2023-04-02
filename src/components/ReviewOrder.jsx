import React, { Fragment } from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { useCheckout } from "../context/CheckoutContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

const StyledHeading = (props) => {
  const theme = useTheme();
  return (
    <Typography
      variant="body"
      sx={{
        display: "block",
        backgroundColor: theme.palette.bg.paper,
        textAlign: "center",
        p: 1,
      }}>
      {props.children}
    </Typography>
  );
};
const StyledTable = (props) => {
  return (
    <Table
      sx={{
        width: "80%",
        mx: "auto",
        [`& .${tableCellClasses.root}`]: {
          padding: 0.5,
          "&:first-of-type": {
            fontWeight: "bolder",
            width: "40%",
          },
        },
      }}>
      {props.children}
    </Table>
  );
};

const ShippingDetails = () => {
  const {
    firstName,
    lastName,
    address,
    country,
    state,
    postalCode,
    shippingPhone,
    email,
  } = useCheckout();
  const { deliveryMethod } = useShoppingCart();
  return (
    <Fragment>
      <StyledHeading>Shipping Information</StyledHeading>
      <TableContainer>
        <StyledTable>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                {firstName.toUpperCase() + " " + lastName.toUpperCase()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>
                {address.toUpperCase() + ", "}
                {state !== "" ? state.toUpperCase() + ", " : ""}{" "}
                {(country + ", " + postalCode).toUpperCase()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{shippingPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{email.toUpperCase()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Delivery Method</TableCell>
              <TableCell>{deliveryMethod.toUpperCase()}</TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Fragment>
  );
};

const PaymentDetails = () => {
  const {
    isBillingAddressSame,
    billingAddress,
    billingCountry,
    billingState,
    billingPostalCode,
    cardNumber,
    cardName,
    cardExpiration,
    cvv,
  } = useCheckout();
  return (
    <Fragment>
      <StyledHeading>Payment and Billing Information</StyledHeading>
      <TableContainer>
        <StyledTable>
          <TableBody>
            <TableRow>
              <TableCell>Billing Address</TableCell>
              <TableCell>
                {isBillingAddressSame
                  ? "Same as Shipping Address".toUpperCase()
                  : (
                      billingAddress +
                      ", " +
                      (billingState === "" ? "" : billingState + ", ") +
                      billingCountry +
                      ", " +
                      billingPostalCode
                    ).toUpperCase()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Card Owner</TableCell>
              <TableCell>{cardName.toUpperCase()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Card Number</TableCell>
              <TableCell>{cardNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Card Expiration</TableCell>
              <TableCell>
                {cardExpiration?.month() + 1}/
                {cardExpiration?.year().toString().substr(2, 3)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CVV</TableCell>
              <TableCell>{cvv}</TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Fragment>
  );
};

const OrderSummary = () => {
  const { subTotalCart, totalCart, pst, gst, getShippingFee } =
    useShoppingCart();

  return (
    <Fragment>
      <StyledHeading>Order Summary</StyledHeading>
      <TableContainer>
        <StyledTable>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{subTotalCart}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxes</TableCell>
              <TableCell>
                {(parseFloat(pst) + parseFloat(gst)).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell>{getShippingFee()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{totalCart}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Fragment>
  );
};

const Review = () => {
  return (
    <Fragment>
      <ShippingDetails />
      <PaymentDetails />
      <OrderSummary />
    </Fragment>
  );
};

export default Review;
