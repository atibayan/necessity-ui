import React, { useState, Fragment } from "react";
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
} from "@mui/material";
import { useProductManagement } from "../context/ProductManagementContext";
import { useSnackbar } from "notistack";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const TableHeading = (props) => {
  return (
    <TableCell>
      <Typography sx={{ fontWeight: "bold" }}>
        {props.children.hasOwnProperty("toUpperCase")
          ? props.children.toUpperCase()
          : props.children}
      </Typography>
    </TableCell>
  );
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
  const [openConfirmShipped, setOpenConfirmShipped] = useState(false);
  const [openConfirmDelivered, setOpenConfirmDelivered] = useState(false);
  const { updateOrders } = useProductManagement();
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
    updateOrders();
    setOpenConfirmProcessing(false);
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

  return (
    <Fragment>
      <TableRow sx={{ backgroundColor: bg }}>
        <TableCell>{orderId}</TableCell>
        <TableCell>{order_date}</TableCell>
        <TableCell>
          <Stack divider={<Divider />}>
            {orderItems.map((item, idx) => (
              <Fragment key={idx}>
                PID: {item.productId} <br />
                QTY: {item.quantity}
              </Fragment>
            ))}
          </Stack>
        </TableCell>
        <TableCell>
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
        </TableCell>
        <TableCell>
          {shippingMode.toLowerCase() == "standard" ? "S" : "E"}
        </TableCell>
        <TableCell>{totalPaid}</TableCell>
        <TableCell>{paid_date}</TableCell>
        <TableCell>{orderStatus}</TableCell>
        <TableCell>
          {oStat === "order received" ? (
            <Button
              variant="contained"
              onClick={() => setOpenConfirmProcessing(true)}>
              Mark as Processing
            </Button>
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
        </TableCell>
      </TableRow>
      <Prompt
        handleConfirm={handleMarkAsProcessing}
        openConfirm={openConfirmProcessing}
        setOpenConfirm={setOpenConfirmProcessing}
        orderStatus="Processing"
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box sx={{ width: "95%", mx: "auto", p: 2, mt: "5vh" }}>
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
          {orders?.map((o, idx) => {
            return <Order key={idx} {...o} />;
          })}
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
    </Box>
  );
};

export default ViewTransactions;
