import React, { Fragment, useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useCheckout } from "../context/CheckoutContext";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const BillingAddressCbx = () => {
  const { isBillingAddressSame, setIsBillingAddressSame } = useCheckout();
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={isBillingAddressSame}
            onChange={() => {
              setIsBillingAddressSame((prevState) => !prevState);
            }}
          />
        }
        label="Same as shipping address"
      />
    </FormGroup>
  );
};

const PostalCode = () => {
  const {
    billingPostalCode,
    isValidBillingPostalCode,
    validateBillingPostalCode,
  } = useCheckout();
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      required
      id="postal"
      label="Postal Code"
      variant="filled"
      fullWidth
      value={billingPostalCode}
      onChange={validateBillingPostalCode}
      onFocus={() => setTouched(true)}
      error={touched && !isValidBillingPostalCode}
      helperText={
        touched &&
        !isValidBillingPostalCode &&
        "Required and should be alphanumeric."
      }
    />
  );
};

const Address = () => {
  const { billingAddress, isValidBillingAddress, validateBillingAddress } =
    useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="street"
      label="Street Address"
      variant="filled"
      fullWidth
      value={billingAddress}
      onChange={validateBillingAddress}
      onFocus={() => setTouched(true)}
      error={touched && !isValidBillingAddress}
      helperText={touched && !isValidBillingAddress && "Required."}
    />
  );
};

const CountrySelector = () => {
  const { billingCountry, countryList, changeBillingSelectedCountry } =
    useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <FormControl required variant="filled" fullWidth>
      <InputLabel id="countryLbl">Country</InputLabel>
      <Select
        labelId="countryLbl"
        id="country"
        defaultValue=""
        value={billingCountry}
        onChange={changeBillingSelectedCountry}
        onFocus={() => setTouched(true)}
        error={touched && billingCountry === ""}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                height: "200px",
              },
            },
          },
        }}>
        {countryList.map((country, idx) => (
          <MenuItem value={country.name} key={idx} dense>
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {touched && billingCountry === "" ? (
        <FormHelperText error>Required</FormHelperText>
      ) : null}
    </FormControl>
  );
};

const ProvinceSelector = () => {
  const { billingProvinceList, changeBillingSelectedState, billingState } =
    useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <FormControl
      required
      variant="filled"
      fullWidth
      disabled={billingProvinceList.length == 0}>
      <InputLabel id="stateLbl">State/Province</InputLabel>
      <Select
        labelId="stateLbl"
        id="state"
        value={billingState}
        defaultValue=""
        onChange={changeBillingSelectedState}
        onFocus={() => setTouched(true)}
        error={touched && billingProvinceList.length > 0 && billingState === ""}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                height: "200px",
              },
            },
          },
        }}>
        {billingProvinceList.map((state, idx) => (
          <MenuItem value={state.name} key={idx} dense>
            {state.name}
          </MenuItem>
        ))}
      </Select>
      {billingProvinceList.length > 0 && touched && billingState === "" ? (
        <FormHelperText error>Required</FormHelperText>
      ) : null}
    </FormControl>
  );
};

const CardNo = () => {
  const { cardNumber, isValidCardNumber, validateCardNumber, cc_format } =
    useCheckout();
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      required
      id="cardNo"
      label="Card Number"
      variant="filled"
      fullWidth
      value={cc_format(cardNumber)}
      onChange={validateCardNumber}
      onFocus={() => setTouched(true)}
      error={touched && !isValidCardNumber}
      helperText={
        touched && !isValidCardNumber && "Not a valid credit card number"
      }
    />
  );
};

const CardExpiration = () => {
  const { cardExpiration, isValidCardExpiration, validateCardExpiration } =
    useCheckout();
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label="Card Expiration"
        disablePast
        required
        fullWidth
        format="MM/YY"
        variant="filled"
        value={cardExpiration}
        onChange={(val, ctx) => {
          setValidationError(ctx.validationError);
          validateCardExpiration(val, ctx);
        }}
        onFocus={() => setTouched(true)}
        error={touched && !isValidCardExpiration}
        helperText={
          touched &&
          !isValidCardExpiration &&
          (validationError != null
            ? validationError == "disablePast"
              ? "Card is expired."
              : validationError == "invalidDate"
              ? "Invalid Date."
              : null
            : "Required field.")
        }
      />
    </LocalizationProvider>
  );
};

const CVV = () => {
  const { cvv, isValidCVV, validateCVV } = useCheckout();
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      required
      id="cvv"
      label="CVV"
      variant="filled"
      value={cvv}
      onChange={validateCVV}
      onFocus={() => setTouched(true)}
      error={touched && !isValidCVV}
      helperText={touched && !isValidCVV && "Required and should be numeric."}
      inputProps={{ maxLength: 3 }}
    />
  );
};

const CardName = () => {
  const { cardName, isValidCardName, validateCardName } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="cardName"
      label="Card Owner"
      variant="filled"
      value={cardName}
      fullWidth
      onChange={validateCardName}
      onFocus={() => setTouched(true)}
      error={touched && !isValidCardName}
      helperText={
        touched &&
        !isValidCardName &&
        "Required and should not contain non-alphabetical characters."
      }
    />
  );
};

const BillingAddress = () => {
  return (
    <Fragment>
      <Address />
      <Stack direction={"row"} gap={2}>
        <CountrySelector />
        <ProvinceSelector />
        <PostalCode />
      </Stack>
    </Fragment>
  );
};

const CardDetails = () => {
  return (
    <Fragment>
      <CardNo />
      <Stack direction={"row"} gap={1.5}>
        <CardName />
        <CardExpiration />
        <CVV />
      </Stack>
    </Fragment>
  );
};

const Payment = () => {
  const { isBillingAddressSame } = useCheckout();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mb: 1.5 },
      }}>
      <Typography variant="subtitle1">Billing Address</Typography>
      <BillingAddressCbx />
      {!isBillingAddressSame ? <BillingAddress /> : null}
      <CardDetails />
    </Box>
  );
};

export default Payment;
