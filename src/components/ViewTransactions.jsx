import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Box,
  Avatar,
  Button,
  Typography,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Divider,
  Popover,
  useTheme,
  TextField,
  InputLabel,
} from "@mui/material";
import { useProductManagement } from "../context/ProductManagementContext";
import { useSnackbar } from "notistack";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const TableHeading = (props) => {
  return (
    <StyledTableCell>
      <Typography sx={{ fontWeight: "bold" }}>
        {props.children.hasOwnProperty("toUpperCase")
          ? props.children.toUpperCase()
          : props.children}
      </Typography>
    </StyledTableCell>
  );
};

const StyledTableCell = (props) => {
  return <TableCell sx={{ py: 0.2 }}>{props.children}</TableCell>;
};

const Order = ({
  orderId,
  orderDate,
  orderItems,
  custInfo,
  shippingMode,
  totalPaid,
  datePaid,
  orderStatus,
}) => {
  const [openConfirmProcessing, setOpenConfirmProcessing] = useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [openConfirmShipped, setOpenConfirmShipped] = useState(false);
  const [openConfirmDelivered, setOpenConfirmDelivered] = useState(false);
  const [productAvailability, setProductAvailability] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { updateOrders, orders, products, updateProducts } =
    useProductManagement();
  let shipping = "";
  if (custInfo) {
    shipping += custInfo.address + ", ";
    shipping +=
      !custInfo.state || custInfo.state === "" ? "" : custInfo.state + ", ";
    shipping += custInfo.country + ", ";
    shipping += custInfo.postalCode;
    shipping = shipping.toUpperCase();
  }

  const oStat = orderStatus.toLowerCase();

  let order_date = "";
  let paid_date = "";
  let date_format = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    second: "numeric",
    minute: "numeric",
  };
  if (orderDate)
    order_date = new Date(orderDate).toLocaleDateString("en-us", date_format);
  if (datePaid)
    paid_date = new Date(datePaid).toLocaleDateString("en-us", date_format);

  let bg = "inherit";
  if (orderStatus === "Archived") bg = "lightgray";

  const handleMarkAsProcessing = async () => {
    await axios.patch(`${serverUrl}order/${orderId}`, {
      orderStatus: "Processing",
    });

    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      const pid = item.productId;
      const product = products.find((p) => p._id === pid);
      if (product && Object.keys(product).length > 0)
        await axios
          .patch(`${serverUrl}product/${item.productId}`, {
            quantity_on_hand: product.quantity_on_hand - item.quantity,
          })
          .then((response) => {
            if (response.status === 200) {
              enqueueSnackbar(`Successfully updated stock level of ${pid}`, {
                variant: "success",
              });
              updateProducts();
            } else {
              enqueueSnackbar("Failed to update stock level!", {
                variant: "error",
              });
            }
          });
    }
    updateOrders();
    setOpenConfirmProcessing(false);
  };

  const handleMarkAsCancelled = async () => {
    await axios.patch(`${serverUrl}order/${orderId}`, {
      orderStatus: "Cancelled",
    });
    updateOrders();
    setOpenConfirmCancel(false);
  };

  const handleMarkAsShipped = async () => {
    await axios.patch(`${serverUrl}order/${orderId}`, {
      orderStatus: "Shipped",
    });
    updateOrders();
    setOpenConfirmShipped(false);
  };

  const handleMarkAsDelivered = async () => {
    await axios.patch(`${serverUrl}order/${orderId}`, {
      orderStatus: "Delivered",
    });
    updateOrders();
    setOpenConfirmDelivered(false);
  };

  useEffect(() => {
    const getProductAvailability = async () => {
      const result = [];
      orderItems.forEach((item) => {
        const pid = item.productId;
        const product = products.find((p) => p._id === pid);
        if (product && Object.keys(product).length > 0)
          result.push({ pid, qty: product.quantity_on_hand });
        else result.push({ pid, qty: 0 });
      });
      setProductAvailability(result);
    };

    getProductAvailability();
  }, [products, orders]);

  return (
    <Fragment>
      <TableRow sx={{ backgroundColor: bg }}>
        <StyledTableCell>{orderId}</StyledTableCell>
        <StyledTableCell>{order_date}</StyledTableCell>
        <StyledTableCell>
          <Stack divider={<Divider />}>
            {orderItems.map((item, idx) => (
              <Fragment key={idx}>
                PID: {item.productId} <br />
                QTY: {item.quantity}
              </Fragment>
            ))}
          </Stack>
        </StyledTableCell>
        <StyledTableCell>
          {custInfo ? (
            <Fragment>
              {(custInfo.firstName + " " + custInfo.lastName).toUpperCase()}{" "}
              <br />
              {shipping} <br />
              {custInfo.shippingPhone} <br />
              {custInfo.email}
            </Fragment>
          ) : (
            "GUEST USER"
          )}
        </StyledTableCell>
        <StyledTableCell>
          {shippingMode.toLowerCase() == "standard" ? "S" : "E"}
        </StyledTableCell>
        <StyledTableCell>{totalPaid}</StyledTableCell>
        <StyledTableCell>{paid_date}</StyledTableCell>
        <StyledTableCell>{orderStatus}</StyledTableCell>
        <StyledTableCell>
          {oStat === "order received" ? (
            <Stack gap={1}>
              <Stack>
                {productAvailability.map((item, idx) => (
                  <Typography variant="caption" key={idx}>
                    {item.pid} : {item.qty}
                  </Typography>
                ))}
              </Stack>
              <Button
                variant="contained"
                onClick={() => setOpenConfirmProcessing(true)}>
                Mark as Processing
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenConfirmCancel(true)}>
                Decline Order
              </Button>
            </Stack>
          ) : oStat === "processing" ? (
            <Button
              variant="contained"
              onClick={() => setOpenConfirmShipped(true)}>
              Mark as Shipped
            </Button>
          ) : oStat === "shipped" ? (
            <Button
              variant="contained"
              onClick={() => setOpenConfirmDelivered(true)}>
              Mark as Delivered
            </Button>
          ) : null}
        </StyledTableCell>
      </TableRow>
      <Prompt
        handleConfirm={handleMarkAsProcessing}
        openConfirm={openConfirmProcessing}
        setOpenConfirm={setOpenConfirmProcessing}
        orderStatus="Processing"
      />
      <Prompt
        handleConfirm={handleMarkAsCancelled}
        openConfirm={openConfirmCancel}
        setOpenConfirm={setOpenConfirmCancel}
        orderStatus="Cancelled"
      />
      <Prompt
        handleConfirm={handleMarkAsShipped}
        openConfirm={openConfirmShipped}
        setOpenConfirm={setOpenConfirmShipped}
        orderStatus="Shipped"
      />
      <Prompt
        handleConfirm={handleMarkAsDelivered}
        openConfirm={openConfirmDelivered}
        setOpenConfirm={setOpenConfirmDelivered}
        orderStatus="Delivered"
      />
    </Fragment>
  );
};

const Prompt = ({
  handleConfirm,
  openConfirm,
  setOpenConfirm,
  orderStatus,
}) => {
  return (
    <Dialog
      open={openConfirm}
      onClose={() => setOpenConfirm(false)}
      sx={{ backdropFilter: "blur(3px)" }}>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to mark order as {orderStatus.toUpperCase()}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirm(false)}>No</Button>
        <Button onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ViewTransactions = () => {
  const { orders } = useProductManagement();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (filter === "") setFilteredOrders(orders);
    else {
      const res = orders.filter((order) => {
        return (
          order.orderId.toLowerCase().includes(filter.toLowerCase()) ||
          order.orderStatus.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setFilteredOrders(res);
    }
  }, [filter, orders]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Stack gap={2} sx={{ width: "95%", mx: "auto", p: 2, mt: "3vh" }}>
      <Stack
        direction="row"
        flex="wrap"
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        my={1}>
        <InputLabel sx={{ flexGrow: 1, textAlign: "right" }}>
          Filter Transactions (Order ID or Status):
        </InputLabel>
        <TextField
          sx={{ flexGrow: 5 }}
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          required
        />
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(215, 215, 215, 0.5)",
          px: 2,
        }}>
        <Typography variant="h5" my={2}>
          TRANSACTIONS
        </Typography>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading>Order ID</TableHeading>
            <TableHeading>Order Date</TableHeading>
            <TableHeading>Order Items</TableHeading>
            <TableHeading>Customer Information</TableHeading>
            <TableHeading>
              ShippingInfo
              <QuestionMarkIcon
                fontSize="small"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                }}
                onClick={handleClick}
              />
            </TableHeading>
            <TableHeading>Total Paid</TableHeading>
            <TableHeading>Date Paid</TableHeading>
            <TableHeading>Order Status</TableHeading>
            <TableHeading>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders &&
            filteredOrders.length > 0 &&
            filteredOrders?.map((o, idx) => {
              return <Order key={idx} id={idx} {...o} />;
            })}
          {/* {orders?.map((o, idx) => {
            return <Order key={idx} id={idx} {...o} />;
          })} */}
        </TableBody>
      </Table>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Typography py={0.5} px={1}>
          S - Standard
        </Typography>
        <Typography py={0.5} px={1}>
          E - Express
        </Typography>
      </Popover>
    </Stack>
  );
};

export default ViewTransactions;
