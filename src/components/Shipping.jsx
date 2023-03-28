import React, { useState } from "react";
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
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useCheckout } from "../context/CheckoutContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

const ShippingPhone = () => {
  const { shippingPhone, isValidShippingPhone, validateShippingPhone } =
    useCheckout();
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      required
      id="phone"
      label="Shipping Phone"
      variant="filled"
      fullWidth
      value={shippingPhone}
      onChange={validateShippingPhone}
      onFocus={() => setTouched(true)}
      error={touched && !isValidShippingPhone}
      helperText={
        touched && !isValidShippingPhone && "Required and should be numeric."
      }
    />
  );
};

const PostalCode = () => {
  const { postalCode, isValidPostalCode, validatePostalCode } = useCheckout();
  const [touched, setTouched] = useState(false);
  return (
    <TextField
      required
      id="postal"
      label="Postal Code"
      variant="filled"
      fullWidth
      value={postalCode}
      onChange={validatePostalCode}
      onFocus={() => setTouched(true)}
      error={touched && !isValidPostalCode}
      helperText={
        touched && !isValidPostalCode && "Required and should be alphanumeric."
      }
    />
  );
};

const Address = () => {
  const { address, isValidAddress, validateAddress } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="street"
      label="Street Address"
      variant="filled"
      fullWidth
      value={address}
      onChange={validateAddress}
      onFocus={() => setTouched(true)}
      error={touched && !isValidAddress}
      helperText={touched && !isValidAddress && "Required."}
    />
  );
};

const LastName = () => {
  const { lastName, isValidLastName, validateLastName } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="lname"
      label="Last Name"
      variant="filled"
      value={lastName}
      fullWidth
      onChange={validateLastName}
      onFocus={() => setTouched(true)}
      error={touched && !isValidLastName}
      helperText={
        touched &&
        !isValidLastName &&
        "Required and should not contain non-alphabetical characters."
      }
    />
  );
};

const FirstName = () => {
  const { firstName, isValidFirstName, validateFirstName } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="fname"
      label="First Name"
      variant="filled"
      value={firstName}
      fullWidth
      onChange={validateFirstName}
      onFocus={() => setTouched(true)}
      error={touched && !isValidFirstName}
      helperText={
        touched &&
        !isValidFirstName &&
        "Required and should not contain non-alphabetical characters."
      }
    />
  );
};

const Email = () => {
  const { email, isValidEmail, validateEmail } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      required
      id="email"
      label="Email"
      variant="filled"
      fullWidth
      value={email}
      helperText={touched && !isValidEmail && "Invalid email."}
      onChange={validateEmail}
      onFocus={() => setTouched(true)}
      error={touched && !isValidEmail}
    />
  );
};

const DeliveryMethod = () => {
  const { deliveryMethod, setDeliveryMethod } = useShoppingCart();

  return (
    <FormControl>
      <RadioGroup
        row
        value={deliveryMethod}
        name="deliveryGrp"
        onChange={(e) => setDeliveryMethod(e.target.value)}>
        <FormControlLabel
          value="standard"
          control={<Radio />}
          label="Standard"
        />
        <FormControlLabel
          value="express"
          control={<Radio />}
          label="Express ($40.00)"
        />
      </RadioGroup>
    </FormControl>
  );
};

const CountrySelector = () => {
  const { country, countryList, changeSelectedCountry } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <FormControl required variant="filled" fullWidth>
      <InputLabel id="countryLbl">Country</InputLabel>
      <Select
        labelId="countryLbl"
        id="country"
        defaultValue=""
        value={country}
        onChange={changeSelectedCountry}
        onFocus={() => setTouched(true)}
        error={touched && country === ""}
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
      {touched && country === "" ? (
        <FormHelperText error>Required</FormHelperText>
      ) : null}
    </FormControl>
  );
};

const ProvinceSelector = () => {
  const { provinceList, changeSelectedState, state } = useCheckout();
  const [touched, setTouched] = useState(false);

  return (
    <FormControl
      required
      variant="filled"
      fullWidth
      disabled={provinceList.length == 0}>
      <InputLabel id="stateLbl">State/Province</InputLabel>
      <Select
        labelId="stateLbl"
        id="state"
        value={state}
        defaultValue=""
        onChange={changeSelectedState}
        onFocus={() => setTouched(true)}
        error={touched && provinceList.length > 0 && state === ""}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                height: "200px",
              },
            },
          },
        }}>
        {provinceList.map((state, idx) => (
          <MenuItem value={state.name} key={idx} dense>
            {state.name}
          </MenuItem>
        ))}
      </Select>
      {provinceList.length > 0 && touched && state === "" ? (
        <FormHelperText error>Required</FormHelperText>
      ) : null}
    </FormControl>
  );
};

const Shipping = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mb: 1.5 },
      }}>
      <Stack direction={"row"} gap={1.5}>
        <FirstName />
        <LastName />
      </Stack>
      <Address />
      <Stack direction={"row"} gap={2}>
        <CountrySelector />
        <ProvinceSelector />
        <PostalCode />
      </Stack>
      <Typography variant="subtitle1">Select Delivery Method</Typography>
      <DeliveryMethod />
      <Stack direction={"row"} gap={2}>
        <ShippingPhone />
        <Email />
      </Stack>
    </Box>
  );
};

export default Shipping;
