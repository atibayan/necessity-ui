import React, { useState, Fragment } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { CheckoutProvider, useCheckout } from "../context/CheckoutContext";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import ReviewOrder from "../components/ReviewOrder";
import { useShoppingCart } from "../context/ShoppingCartContext";

const steps = ["Shipping", "Payment and Billing", "Review and Place Order"];

const CheckoutPanes = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    isValidEmail,
    isValidFirstName,
    isValidLastName,
    isValidAddress,
    isValidPostalCode,
    isValidShippingPhone,
    country,
    provinceList,
    state,
    isBillingAddressSame,
    isValidBillingPostalCode,
    isValidBillingAddress,
    isValidCardNumber,
    isValidCardExpiration,
    isValidCVV,
    isValidCardName,
    billingCountry,
    billingState,
    billingProvinceList,
    placeOrder,
    waitForServer,
  } = useCheckout();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      placeOrder();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isValidStep = () => {
    if (activeStep == 0)
      return (
        isValidEmail &&
        isValidFirstName &&
        isValidLastName &&
        isValidShippingPhone &&
        isValidAddress &&
        isValidPostalCode &&
        country !== "" &&
        (provinceList.length == 0 || (provinceList.length > 0 && state !== ""))
      );
    else if (activeStep == 1)
      return (
        isValidCardName &&
        isValidCardExpiration &&
        isValidCardNumber &&
        isValidCVV &&
        (isBillingAddressSame ||
          (!isBillingAddressSame &&
            isValidBillingAddress &&
            isValidBillingPostalCode &&
            billingCountry !== "" &&
            (billingProvinceList.length == 0 ||
              (billingProvinceList.length > 0 && billingState !== ""))))
      );
    else return true;
  };

  return (
    <Stack
      sx={{
        width: "calc(350px + 20vw)",
        my: "5vh",
        mx: "auto",
        p: 2,
      }}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "black",
          height: "60px",
          color: "white",
          p: 2,
        }}>
        CHECKOUT
      </Typography>
      <Box sx={{ border: "2px solid gray", p: 2, borderTop: "none" }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Fragment>
          {activeStep === steps.length ? null : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>

              <Button onClick={handleNext} disabled={!isValidStep()}>
                {activeStep === steps.length - 1 ? "Confirm and Pay" : "Next"}
              </Button>
            </Box>
          )}
        </Fragment>
        {activeStep == 0 ? (
          <Shipping />
        ) : activeStep == 1 ? (
          <Payment />
        ) : activeStep == 2 ? (
          <ReviewOrder />
        ) : waitForServer ? (
          <p>Loading...</p>
        ) : (
          <p>Order Placed!</p>
        )}
      </Box>
    </Stack>
  );
};

const Checkout = () => {
  const { cartQuantity } = useShoppingCart();
  return cartQuantity == 0 ? (
    <p>Your cart is empty</p>
  ) : (
    <CheckoutProvider>
      <CheckoutPanes />
    </CheckoutProvider>
  );
};

export default Checkout;
