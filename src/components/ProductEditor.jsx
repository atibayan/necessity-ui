import React, { useState, useEffect } from "react";
import axios from "axios";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  TextField,
  FilledInput,
  Avatar,
  useTheme,
} from "@mui/material";
import { PropagateLoader } from "react-spinners";
import { useProductManagement } from "../context/ProductManagementContext";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ProductEditor = ({ open, handleClose, selected }) => {
  const theme = useTheme();
  const { products, updateProducts, handleImageUpload } =
    useProductManagement();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [qtyOnHand, setQtyOnHand] = useState(0);

  const [imagesFromDB, setImagesFromDB] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [nameChanged, setNameChanged] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);
  const [discountChanged, setDiscountChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [quantityChanged, setQuantityChanged] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProduct(products.find((item) => item._id === selected));
  }, [products]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setDiscount(product.discount);
      setQtyOnHand(product.quantity_on_hand);
      setTags(product.tags);
      setInitialTags(product.tags);
      setImagesFromDB(product.images);
      setInitialImages(product.images);
      setSelectedImages([]);
    }
  }, [product]);

  const onSelectFile = (e) => {
    const selectedFilesArray = Array.from(e.target.files);

    const imagesArray = selectedFilesArray.map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  function deletePhotoFromLocal(imageUrl) {
    setSelectedImages(selectedImages.filter((e) => e.url !== imageUrl));
    URL.revokeObjectURL(imageUrl);
  }
  function deletePhotoFromDB(image_name) {
    setImagesFromDB(imagesFromDB.filter((e) => e.image_name !== image_name));
  }

  const addTag = (e) => {
    if (e.key === "ArrowRight") {
      let tag = e.target.value.replace(/\s+/g, " ");
      if (tag.length > 1 && !tags.includes(tag))
        tag.split(",").forEach((tag) => {
          setTags((prevTags) => prevTags.concat(tag));
          e.target.value = "";
        });
    }
  };

  const deleteTag = (deletedTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== deletedTag));
  };

  const handleEditSubmit = async () => {
    setIsLoading(true);
    const body = {};
    if (nameChanged) body.name = name;
    if (descriptionChanged) body.description = description;
    if (priceChanged) body.price = price;
    if (discountChanged) body.discount = discount;
    if (quantityChanged) body.quantity_on_hand = qtyOnHand;

    const addedTags = [];
    const deletedTags = [];

    tags.forEach((item) => {
      const newItem = initialTags.indexOf(item);
      if (newItem === -1) addedTags.push(item);
    });

    initialTags.forEach((item) => {
      const delItem = tags.indexOf(item);
      if (delItem === -1) deletedTags.push(item);
    });

    if (addedTags.length > 0) {
      await axios
        .post(`${serverUrl}product/${product._id}/tags`, { tags: addedTags })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("Successfully added tags", {
              variant: "success",
            });
          } else {
            enqueueSnackbar("Failed to add tags!", {
              variant: "error",
            });
          }
        });
    }

    deletedTags.forEach(async (item) => {
      await axios
        .delete(`${serverUrl}product/${product._id}/tags/${item}`)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(`Successfully deleted tag: ${item}`, {
              variant: "success",
            });
          } else {
            enqueueSnackbar(`Failed to delete tag: ${item}!`, {
              variant: "error",
            });
          }
        });
    });

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      const blob = await fetch(selectedImages[i].url).then((r) => r.blob());
      const resized_blob = await handleImageUpload(blob);
      formData.append("image", resized_blob);
    }

    if (selectedImages.length > 0) {
      await axios
        .post(`${serverUrl}product/${product._id}/photos`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("Successfully uploaded photo", {
              variant: "success",
            });
          } else {
            enqueueSnackbar("Failed to upload photo!", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          enqueueSnackbar("Failed to upload photo!", {
            variant: "error",
          });
        });
    }

    initialImages.forEach(async (prev) => {
      const found = imagesFromDB.findIndex(
        (curr) => curr.image_name === prev.image_name
      );
      if (found === -1) {
        await axios
          .delete(
            `${serverUrl}product/${product._id}/photos/${prev.image_name}`
          )
          .then((response) => {
            if (response.status === 200) {
              enqueueSnackbar(
                `Successfully deleted photo: ${prev.image_name}`,
                {
                  variant: "success",
                }
              );
            } else {
              enqueueSnackbar(`Failed to delete photo: ${prev.image_name}!`, {
                variant: "error",
              });
            }
          });
      }
    });

    if (Object.keys(body).length) {
      await axios
        .patch(`${serverUrl}product/${product._id}`, body)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("Successfully updated product", {
              variant: "success",
            });
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
    }
    updateProducts();
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ backdropFilter: "blur(3px)" }}>
      <DialogTitle>Edit Product</DialogTitle>
      <Stack gap={2} p={2} sx={{ width: "100%" }}>
        <TextField
          variant="filled"
          fullWidth
          label="Product Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameChanged(true);
          }}
          required
        />
        <TextField
          variant="filled"
          fullWidth
          label="Product Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionChanged(true);
          }}
          required
        />
        <FormControl fullWidth variant="filled" required>
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={parseFloat(price).toFixed(2)}
            inputProps={{
              step: "0.01",
              min: 0,
            }}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceChanged(true);
            }}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        <TextField
          label="Discount (0-99)"
          variant="filled"
          value={parseInt(discount)}
          inputProps={{
            min: 0,
            max: 99,
          }}
          onChange={(e) => {
            setDiscount(e.target.value);
            setDiscountChanged(true);
          }}
          type="number"
        />
        {/* </FormControl> */}
        <TextField
          variant="filled"
          fullWidth
          label="Quantity on Hand"
          value={parseInt(qtyOnHand)}
          inputProps={{
            step: "1",
            min: 0,
          }}
          onChange={(e) => {
            setQtyOnHand(e.target.value);
            setQuantityChanged(true);
          }}
          type="number"
          required
        />
        <Stack direction="row">
          {tags?.map((tag, idx) => {
            return (
              <div key={idx} className="tag">
                {tag}
                <span
                  onClick={() => {
                    deleteTag(tag);
                  }}>
                  x
                </span>
              </div>
            );
          })}{" "}
        </Stack>
        <TextField
          variant="filled"
          fullWidth
          label="Tags"
          onKeyUp={addTag}
          placeholder="Click right arrow key to add more tags."
          required
        />
        <Stack>
          <InputLabel htmlFor="choose-file" sx={{ mx: "auto" }}>
            <AddPhotoAlternateIcon icon={faPlus} id="plus" />
            Add Image
          </InputLabel>
          <input
            id="choose-file"
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/jpeg, image/png, image/gif"
            hidden
            required
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              my: "1rem",
            }}>
            {imagesFromDB?.map((image, idx) => (
              <div key={idx} className="image">
                <Avatar
                  variant="rounded"
                  src={image.signedImage}
                  sx={{ width: "80px", height: "80px" }}
                />
                <button onClick={() => deletePhotoFromDB(image.image_name)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))}
            {selectedImages.map((image, idx) => (
              <div key={idx} className="image">
                <Avatar
                  variant="rounded"
                  src={image.url}
                  sx={{ width: "80px", height: "80px" }}
                />
                <button onClick={() => deletePhotoFromLocal(image.url)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))}
          </Box>
          {isLoading ? (
            <Box mb={3} sx={{ display: "flex", justifyContent: "center" }}>
              <PropagateLoader color={theme.palette.primary.main} />
            </Box>
          ) : (
            <Button
              variant="contained"
              type="submit"
              onClick={handleEditSubmit}>
              Save
            </Button>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ProductEditor;
