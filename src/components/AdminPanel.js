import React, { useEffect, useState } from "react";
import ProductUploader from './ProductUploader';
import AdminPanelRouter from "./AdminPanelRouter";

const AdminPanel = () => {
  return(
    <div>
      {/* <AdminPanelRouter /> */}
      <ProductUploader />
    </div>
  )
}

export default AdminPanel;