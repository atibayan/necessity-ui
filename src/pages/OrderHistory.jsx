import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Stack,
  Typography,
  Button,
  styled,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  useTheme,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { SnackbarProvider, useSnackbar } from "notistack";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ColorBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  textAlign: "center",
}));

const StyledStack = ({ label, value, w }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        maxWidth: { xs: "auto", md: w },
        width: { xs: "auto", md: w },
        flexDirection: { xs: "row", md: "column" },
        gap: { xs: 5, md: 0 },
        [`& > *`]: {
          "&:first-of-type": {
            fontSize: { xs: "0.9em", md: "0.9em" },
            width: { xs: "20%", md: "auto" },
            minWidth: { xs: "20%", md: "auto" },
          },
          fontSize: { xs: "0.9em", md: "1.1em" },
        },
      }}>
      <Typography>{label}</Typography>
      <Typography
        sx={{
          textOverflow: `ellipsis`,
          overflow: `hidden`,
        }}>
        {value}
      </Typography>
    </Stack>
  );
};

const OHHeading = ({ oh, us }) => {
  let shipping = "";
  if (us) {
    shipping += us.address + ", ";
    shipping += !us.state || us.state === "" ? "" : us.state + ", ";
    shipping += us.country + ", ";
    shipping += us.postalCode;
    shipping = shipping.toUpperCase();
  } else {
    shipping = "Shipping information not provided";
  }

  let orderDate = "";
  if (oh.createdAt)
    orderDate = new Date(oh.createdAt).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 0, md: 2 },
        p: 1,
        background: "rgba(215, 215, 215, 0.5)",
        alignContent: "center",
      }}>
      <StyledStack
        w="15%"
        label="Order Placed"
        value={orderDate !== "" ? orderDate : "Date Unknown"}
      />
      <StyledStack w="15%" label="Total" value={`CAD $${oh.totalCart}`} />
      <StyledStack w="40%" label="Shipped To" value={shipping} />
      <StyledStack w="30%" label="Order Number" value={oh._id} />
    </Stack>
  );
};

const OHBody = ({ productId, quantity }) => {
  const { products } = useShoppingCart();
  const product = products.find((item) => item._id === productId);
  const theme = useTheme();

  return !product || product.length === 0 ? null : (
    <Box m={1} mx={3} sx={{ flex: "1 1 320px" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          gap: { xs: 2, md: 2 },
        }}>
        <Box sx={{ width: "80px", height: "80px", bgColor: "red" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<ColorBadge>{quantity}</ColorBadge>}>
            <Avatar
              variant="rounded"
              src={product.images[0].signedImage}
              sx={{ width: "80px", height: "80px", bgColor: "red" }}
            />
          </Badge>
        </Box>
        <Stack>
          <Link
            to={`/product/${product._id}`}
            style={{
              color: theme.palette.primary.main,
            }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {product.name.toUpperCase()}
            </Typography>
          </Link>
          <Typography variant="body">{product.description}</Typography>
          <Typography variant="h6">
            CAD ${parseFloat(product.price).toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const ArchiveOrder = ({ oh, onUpdateCb }) => {
  const orderId = oh._id;
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleArchiveOrder = async () => {
    await axios
      .post(`${serverUrl}order/archive/${orderId}`)
      .then((response) => {
        if (response.status === 204) {
          enqueueSnackbar("Successfully archived product", {
            variant: "success",
          });
          onUpdateCb(orderId);
        } else {
          enqueueSnackbar("Failed to archive product!", {
            variant: "error",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Failed to archive product!", {
          variant: "error",
        });
      });

    setOpen(false);
  };

  const orderState = oh.orderStatus.toLowerCase();
  let estimatedDelivery = new Date(oh.updatedAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  estimatedDelivery = estimatedDelivery.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Stack direction="row" p={1} gap={1}>
      <Typography variant="h6">
        {orderState === "order received"
          ? `Your order was received. Please allow us 2-3 days to process your payment.`
          : orderState === "order shipped"
          ? `Your order was shipped! Estimated delivery is on or before ${estimatedDelivery}.`
          : orderState === "delivered"
          ? `Your item was marked delivered by 3rd party courier.`
          : orderState === "delivery confirmed"
          ? `Your item was delivered!`
          : null}
      </Typography>
      {orderState === "delivered" ? (
        <Button variant="contained" onClick={handleClickOpen}>
          Mark as Delivered
        </Button>
      ) : null}

      <Button variant="contained" onClick={handleClickOpen}>
        Archive Order
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="error">
          {"You are about to archive this order!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Archiving order will remove it from your order history. Do you still
            wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleArchiveOrder} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

const OrderHistory = () => {
  const { isAuthenticated, user } = useAuth0();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const getOrderHistory = async () => {
      const { data } = await axios.get(`${serverUrl}order/${user.sub}`);
      const { result } = data;
      if (data) setOrderHistory(result);
    };
    getOrderHistory();
  }, [isAuthenticated, user]);

  const updateOrderHistory = async (orderId) => {
    const { data } = await axios.get(`${serverUrl}order/${user.sub}`);
    const { result } = data;
    if (data) setOrderHistory(result);
  };

  return (
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={2000}
      hideIconVariant={true}>
      <Box mt={"5vh"} mx="auto" width={"calc(200px + 50vw)"}>
        <Typography variant="h5" my={2}>
          ORDER HISTORY
        </Typography>
        {orderHistory.map((item, idx) => (
          <Card key={idx} sx={{ m: 2 }}>
            <OHHeading {...item} />
            <ArchiveOrder {...item} onUpdateCb={updateOrderHistory} />
            <Divider />
            <Stack sx={{ display: "flex", flexFlow: "row wrap" }}>
              {item.oi?.map((orderItem, idx2) => (
                <OHBody key={idx2} {...orderItem} />
              ))}
            </Stack>
          </Card>
        ))}
      </Box>
    </SnackbarProvider>
  );
};

export default OrderHistory;
