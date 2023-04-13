import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductUploader from "./ProductUploader";
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
  InputLabel,
  TextField,
} from "@mui/material";
import ProductEditor from "./ProductEditor";
import { useProductManagement } from "../context/ProductManagementContext";
import { useSnackbar } from "notistack";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const tableCellPadding = 0.5;
const tableCellPaddingX = 1.3;
const TableHeading = (props) => {
  return (
    <TableCell sx={{ py: tableCellPadding, px: tableCellPaddingX }}>
      <Typography sx={{ fontWeight: "bold" }}>
        {props.children.toUpperCase()}
      </Typography>
    </TableCell>
  );
};

const Product = ({
  id,
  _id,
  name,
  description,
  activeFlag,
  price,
  discount,
  tags,
  quantity_on_hand,
  images,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { updateProducts } = useProductManagement();

  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handlerDeleteProduct = async () => {
    await axios
      .patch(`${serverUrl}product/${id}`, { activeFlag: !activeFlag })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("Successfully updated product", {
            variant: "success",
          });
          updateProducts();
        } else {
          enqueueSnackbar("Failed to update product!", {
            variant: "error",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Failed to update product!", {
          variant: "error",
        });
      });
    setOpenDeleteDialog(false);
  };

  const handleClickEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const bg = id % 2 === 0 ? "rgba(215,215,215,0.2)" : "inherit";
  return (
    <TableRow sx={{ background: bg }}>
      <TableCell
        sx={{ width: "5%", py: tableCellPadding, px: tableCellPaddingX }}>
        {_id.substring(0, 10)}
      </TableCell>
      <TableCell
        sx={{ width: "10%", py: tableCellPadding, px: tableCellPaddingX }}>
        {name.toUpperCase()}
      </TableCell>
      <TableCell
        sx={{ width: "20%", py: tableCellPadding, px: tableCellPaddingX }}>
        <Typography
          variant="body"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}>
          {description}
        </Typography>
      </TableCell>
      <TableCell
        sx={{ width: "5%", py: tableCellPadding, px: tableCellPaddingX }}>
        {activeFlag ? "Active" : "Deactivated"}
      </TableCell>
      <TableCell
        sx={{ width: "5%", py: tableCellPadding, px: tableCellPaddingX }}>
        ${parseFloat(price).toFixed(2)}
      </TableCell>
      <TableCell
        sx={{ width: "5%", py: tableCellPadding, px: tableCellPaddingX }}>
        {parseInt(discount)}%
      </TableCell>
      <TableCell
        sx={{ width: "20%", py: tableCellPadding, px: tableCellPaddingX }}>
        <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
          {tags.map((tag, index) => {
            return (
              <Box
                key={index}
                sx={{
                  mx: 0.1,
                  my: 1,
                }}>
                <Typography
                  variant="body"
                  sx={{
                    py: 0.2,
                    px: 1,
                    borderRadius: "10px",
                    border: "1px solid gray",
                  }}>
                  {tag}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </TableCell>
      <TableCell
        sx={{ width: "5%", py: tableCellPadding, px: tableCellPaddingX }}>
        {quantity_on_hand}
      </TableCell>
      <TableCell
        sx={{ width: "15%", py: tableCellPadding, px: tableCellPaddingX }}>
        <div
          className="image-display"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {images.map((img, idx) => (
            <Avatar
              key={idx}
              variant="rounded"
              src={img.signedImage}
              sx={{ width: "50px", height: "50px" }}
            />
          ))}
        </div>
      </TableCell>
      <TableCell
        sx={{ width: "10%", py: tableCellPadding, px: tableCellPaddingX }}>
        <Stack direction="row" gap={0.5}>
          <Button
            variant="contained"
            sx={{ minWidth: 0, px: 1, py: 0.1 }}
            onClick={handleClickEdit}>
            Edit
          </Button>
          {activeFlag ? (
            <Button
              variant="contained"
              sx={{ minWidth: 0, px: 1, py: 0.1 }}
              onClick={handleClickDelete}>
              Deactivate
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ minWidth: 0, px: 1, py: 0.1 }}
              onClick={handleClickDelete}>
              Activate
            </Button>
          )}
        </Stack>
        <ProductEditor
          open={openEdit}
          handleClose={handleCloseEdit}
          selected={id}
        />
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          sx={{ backdropFilter: "blur(3px)" }}>
          {activeFlag ? (
            <DialogTitle color="error">
              "You are about to delete this product!"
            </DialogTitle>
          ) : (
            <DialogTitle>Activate Product</DialogTitle>
          )}
          <DialogContent>
            <DialogContentText>
              {activeFlag
                ? "Removing this product means users will not be able to order this product. Are you really sure you want to deactivate this product?"
                : "Activating this product will allow users to order this product. Proceed to activate?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>No</Button>
            <Button onClick={handlerDeleteProduct} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

const ManageProducts = () => {
  const { products } = useProductManagement();
  const [openAdd, setOpenAdd] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [prodFilter, setProdFilter] = useState("");

  useEffect(() => {
    if (prodFilter === "") setFilteredProducts(products);
    else {
      const res = products.filter((product) => {
        return (
          product._id.toLowerCase().includes(prodFilter.toLowerCase()) ||
          product.name.toLowerCase().includes(prodFilter.toLowerCase()) ||
          (product.activeFlag == false &&
            "deactivated".includes(prodFilter.toLowerCase())) ||
          product.tags
            .toString()
            .toLowerCase()
            .includes(prodFilter.toLowerCase())
        );
      });
      setFilteredProducts(res);
    }
  }, [prodFilter, products]);

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <Box sx={{ width: "95%", mx: "auto", p: 2, mt: "5vh" }}>
      <Stack
        direction="row"
        flex="wrap"
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        my={1}>
        <InputLabel sx={{ flexGrow: 1, textAlign: "right" }}>
          Filter Products (Product ID/Name/Deactivated/Tags):
        </InputLabel>
        <TextField
          sx={{ flexGrow: 5 }}
          variant="outlined"
          value={prodFilter}
          onChange={(e) => setProdFilter(e.target.value)}
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
          PRODUCTS
        </Typography>
        <Button variant="contained" onClick={handleClickAdd}>
          Add Product
        </Button>
        <ProductUploader open={openAdd} handleClose={handleCloseAdd} />
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading>ID</TableHeading>
            <TableHeading>Name</TableHeading>
            <TableHeading>Description</TableHeading>
            <TableHeading>Active?</TableHeading>
            <TableHeading>Price</TableHeading>
            <TableHeading>Discount</TableHeading>
            <TableHeading>Tags</TableHeading>
            <TableHeading>Quantity</TableHeading>
            <TableHeading>Images</TableHeading>
            <TableHeading>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts &&
            filteredProducts.length > 0 &&
            filteredProducts?.map((p, idx) => {
              return <Product key={p._id} id={idx} {...p} />;
            })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageProducts;
