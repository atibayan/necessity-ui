import React, { useEffect, useState } from "react";
import ProductUploader from './ProductUploader';
import AdminPanelRouter from "./AdminPanelRouter";
import { BrowserRouter } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <BrowserRouter>
      <AdminPanelRouter />
    </BrowserRouter>
  );
}

export default AdminPanel;