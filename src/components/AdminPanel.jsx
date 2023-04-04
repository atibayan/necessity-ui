import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import { Box, Card } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ProductManagementProvider } from "../context/ProductManagementContext";

const ManageProductsRoute = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <ManageProducts />;
};

const ViewSalesRoute = () => {
  return <p>View Sales</p>;
};

const TransactionApprovalRoute = () => {
  return <p>Transaction Approval</p>;
};

const AdminPanel = () => {
  return (
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={3000}
      hideIconVariant={true}>
      <ProductManagementProvider>
        <Routes>
          <Route path="/manageproducts" element={<ManageProductsRoute />} />
          <Route path="/viewsales" element={<ViewSalesRoute />} />
          <Route
            path="/viewtransactions"
            element={<TransactionApprovalRoute />}
          />
          <Route path="*" element={<ManageProductsRoute />} />
        </Routes>
      </ProductManagementProvider>
    </SnackbarProvider>
  );
};

export default AdminPanel;
