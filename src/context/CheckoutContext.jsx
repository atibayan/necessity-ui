import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { isEmail, isEmpty, isNumeric } from "validator";
import { useShoppingCart } from "./ShoppingCartContext";
import { useAuth0 } from "@auth0/auth0-react";

const countryListUrl = process.env.REACT_APP_COUNTRY_STATE_LIST_API;
const CheckoutContext = createContext({});
const serverUrl = process.env.REACT_APP_SERVER_URL;

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const { user, isAuthenticated } = useAuth0();
  const { totalCart, deliveryMethod, resetCart, session, cartItems } =
    useShoppingCart();

  const [countryList, setCountryList] = useState([]);
  const [country, setSelectedCountry] = useState("");
  const [state, setSelectedState] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidPostalCode, setIsValidPostalCode] = useState(false);
  const [isValidShippingPhone, setIsValidShippingPhone] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [awaitingLoadState, setAwaitingLoadState] = useState(false);
  const [waitingState, setWaitingState] = useState("");

  const [isBillingAddressSame, setIsBillingAddressSame] = useState(true);
  const [billingAddress, setBillingAddress] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [isValidBillingAddress, setIsValidBillingAddress] = useState(false);
  const [isValidBillingPostalCode, setIsValidBillingPostalCode] =
    useState(false);
  const [billingCountry, setSelectedBillingCountry] = useState("");
  const [billingState, setSelectedBillingState] = useState("");
  const [billingProvinceList, setBillingProvinceList] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [isValidCardNumber, setIsValidCardNumber] = useState(false);
  const [cardExpiration, setCardExpiration] = useState(null);
  const [isValidCardExpiration, setIsValidCardExpiration] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isValidCVV, setIsValidCVV] = useState(false);
  const [cardName, setCardName] = useState("");
  const [isValidCardName, setIsValidCardName] = useState(false);
  const [waitForServer, setWaitForServer] = useState(false);
  const [orderJustPlaced, setOrderJustPlaced] = useState(false);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(countryListUrl);
      setCountryList(data.data);
    };
    fetchData();

    const getShippingDetailsFromDB = async () => {
      const { data } = await axios.get(`${serverUrl}user_shipping/${user.sub}`);

      if (data.shipping) {
        const {
          firstName,
          lastName,
          address,
          country,
          state,
          postalCode,
          shippingPhone,
          email,
        } = data.shipping;

        setFirstName(firstName);
        setLastName(lastName);
        setAddress(address);
        setPostalCode(postalCode);
        setShippingPhone(shippingPhone);
        setEmail(email);

        setWaitingState(state);
        setAwaitingLoadState(true);
        setSelectedCountry(country);
      }
    };

    if (isAuthenticated) getShippingDetailsFromDB();
  }, [isAuthenticated, user]);

  useEffect(() => {
    !isEmpty(shippingPhone) && isNumeric(shippingPhone)
      ? setIsValidShippingPhone(true)
      : setIsValidShippingPhone(false);
  }, [shippingPhone]);

  useEffect(() => {
    setProvinceList([]);
    setSelectedState("");
    const c = countryList.find((item) => item.name === country);
    if (c) setProvinceList(c.states);
    if (awaitingLoadState) {
      setSelectedState(waitingState);
      setWaitingState("");
      setAwaitingLoadState(false);
    }
  }, [country, awaitingLoadState, countryList, waitingState]);

  useEffect(() => {
    isEmail(email) ? setIsValidEmail(true) : setIsValidEmail(false);
  }, [email]);

  useEffect(() => {
    !isEmpty(firstName) && /^[a-zA-Z ]+$/.test(firstName)
      ? setIsValidFirstName(true)
      : setIsValidFirstName(false);
  }, [firstName]);

  useEffect(() => {
    !isEmpty(lastName) && /^[a-zA-Z ]+$/.test(lastName)
      ? setIsValidLastName(true)
      : setIsValidLastName(false);
  }, [lastName]);

  useEffect(() => {
    !isEmpty(address) ? setIsValidAddress(true) : setIsValidAddress(false);
  }, [address]);

  useEffect(() => {
    !isEmpty(postalCode) && /^[a-zA-Z0-9]+$/.test(postalCode)
      ? setIsValidPostalCode(true)
      : setIsValidPostalCode(false);
  }, [postalCode]);

  const changeBillingSelectedCountry = (event) => {
    const country = countryList.find(
      (country) => country.name === event.target.value
    );
    setBillingProvinceList(null);
    setSelectedBillingState("");
    setSelectedBillingCountry(country?.name);
    setBillingProvinceList(country?.states);
  };

  const changeBillingSelectedState = (event) => {
    const state = billingProvinceList.find(
      (state) => state.name === event.target.value
    );
    setSelectedBillingState(state?.name);
  };

  const validateBillingAddress = (event) => {
    const val = event.target.value;
    !isEmpty(val)
      ? setIsValidBillingAddress(true)
      : setIsValidBillingAddress(false);
    setBillingAddress(val);
  };

  const validateBillingPostalCode = (event) => {
    const val = event.target.value;
    !isEmpty(val) && /^[a-zA-Z0-9]+$/.test(val)
      ? setIsValidBillingPostalCode(true)
      : setIsValidBillingPostalCode(false);
    setBillingPostalCode(val);
  };

  const cc_format = (value) => {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  };

  const validateCardNumber = (event) => {
    const val = event.target.value.replace(/\s+/g, "");
    !isEmpty(val) && isNumeric(val)
      ? setIsValidCardNumber(true)
      : setIsValidCardNumber(false);
    setCardNumber(val);
  };

  const validateCardExpiration = (newValue, ctx) => {
    newValue != null && ctx.validationError === null
      ? setIsValidCardExpiration(true)
      : setIsValidCardExpiration(false);
    setCardExpiration(newValue);
  };

  const validateCVV = (event) => {
    const val = event.target.value;
    !isEmpty(val) && isNumeric(val)
      ? setIsValidCVV(true)
      : setIsValidCVV(false);
    setCvv(val);
  };

  const validateCardName = (event) => {
    const val = event.target.value;

    !isEmpty(val) && /^[a-zA-Z ]+$/.test(val)
      ? setIsValidCardName(true)
      : setIsValidCardName(false);
    setCardName(val);
  };

  const placeOrder = async () => {
    setWaitForServer(true);
    setOrderJustPlaced(true);
    const datePaid = new Date().toString();

    const order = {
      userId: session,
      firstName,
      lastName,
      address,
      country,
      state,
      postalCode,
      deliveryMethod,
      shippingPhone,
      email,
      isBillingAddressSame,
      billingAddress,
      billingCountry,
      billingState,
      billingPostalCode,
      datePaid,
      totalCart,
      cartItems,
    };

    const { data, status } = await axios.post(`${serverUrl}order`, order);
    if (status === 201) {
      resetCart();
      setOrderData({ oid: data.oid, status });
    } else {
      setOrderData({ oid: null, status });
    }
    setWaitForServer(false);
  };

  return (
    <CheckoutContext.Provider
      value={{
        countryList,
        provinceList,
        isValidEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        address,
        setAddress,
        country,
        state,
        postalCode,
        setPostalCode,
        shippingPhone,
        setShippingPhone,
        email,
        setEmail,
        isValidFirstName,
        isValidLastName,
        isValidAddress,
        isValidPostalCode,
        isValidShippingPhone,
        setIsBillingAddressSame,
        isBillingAddressSame,

        billingPostalCode,
        isValidBillingPostalCode,
        validateBillingPostalCode,
        billingAddress,
        isValidBillingAddress,
        validateBillingAddress,
        billingCountry,
        changeBillingSelectedCountry,
        billingProvinceList,
        changeBillingSelectedState,
        billingState,
        cardNumber,
        isValidCardNumber,
        validateCardNumber,
        cc_format,
        validateCardExpiration,
        isValidCardExpiration,
        cardExpiration,
        cvv,
        isValidCVV,
        validateCVV,
        cardName,
        isValidCardName,
        validateCardName,
        placeOrder,
        waitForServer,
        orderJustPlaced,
        setOrderJustPlaced,
        orderData,
        setOrderData,
        setSelectedCountry,
        setSelectedState,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
}
