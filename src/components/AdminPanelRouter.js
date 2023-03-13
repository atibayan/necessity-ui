import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Products from "./Products";
import Product from "../pages/Product";
import ProductUploader from './ProductUploader';
import ManageProducts from './ManageProducts';
import './AdminPanelRouter.css';

const ManageProductsRoute = () => {
  return (
    <div>
      <div className="add_product">
        <button className="add-product-button">Add Product</button>
      </div>
      <br></br>
      <ManageProducts />
    </div>
  );
};

const ViewSalesRoute = () => {
  return <p>View Sales</p>;
};

const TransactionApprovalRoute = () => {
  return <p>Transaction Approval</p>;
};

const PanelRoutes = () => {
  return (
    <div className="router_container">
      <div className="router_row">
        <div className="router_links">
          <nav>
            <ul>
              <li><NavLink to="/manageproducts" activeClassName="active">Manage Products</NavLink></li>
              <li><NavLink to="/viewsales" activeClassName="active">View Sales</NavLink></li>
              <li><NavLink to="/transactionapproval" activeClassName="active">Transaction Approval</NavLink></li>
            </ul>
          </nav>
        </div>
        <div className="router_result">
          <Routes>
            <Route path="/manageproducts" element={<ManageProductsRoute />} />
            <Route path="/viewsales" element={<ViewSalesRoute />} />
            <Route path="/transactionapproval" element={<TransactionApprovalRoute />} />
            <Route path="*" element={<ManageProductsRoute />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const AdminPanelRouter = () => {
  return (
    <BrowserRouter>
      <PanelRoutes />
    </BrowserRouter>
  );
}

export default AdminPanelRouter;