import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ManageProducts from "../components/ManageProducts";
import ViewTransactions from "../components/ViewTransactions";
import { SnackbarProvider } from "notistack";
import { ProductManagementProvider } from "../context/ProductManagementContext";

const ViewSalesRoute = () => {
  return <p>View Sales</p>;
};

const AdminPanel = () => {
  return (
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={3000}
      hideIconVariant={true}>
      <ProductManagementProvider>
        <Routes>
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/viewsales" element={<ViewSalesRoute />} />
          <Route path="/viewtransactions" element={<ViewTransactions />} />
          <Route path="*" element={<ManageProducts />} />
        </Routes>
      </ProductManagementProvider>
    </SnackbarProvider>
  );
};

export default AdminPanel;
