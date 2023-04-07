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

const ProductUploader = ({ open, handleClose, selected }) => {
  const theme = useTheme();
  const { updateProducts, handleImageUpload } = useProductManagement();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState([]);
  const [tags, setTags] = useState([]);
  const [qtyOnHand, setQtyOnHand] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const resetStates = () => {
    setSelectedImages([]);
    setName("");
    setPrice(0);
    setDiscount(0);
    setDescription("");
    setCredits([]);
    setTags([]);
    setQtyOnHand(0);
    setIsLoading(false);
  };

  const handleAddSubmit = async () => {
    setIsLoading(true);

    const product_info = {
      name,
      description,
      price,
      discount,
      quantity_on_hand: qtyOnHand,
      discount,
      credits,
    };

    let pid = "";
    await axios.post(`${serverUrl}product`, product_info).then((response) => {
      if (response.status === 201) {
        pid = response.data._id;
        enqueueSnackbar("Successfully added product", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to add product!", {
          variant: "error",
        });
      }
    });

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      const blob = await fetch(selectedImages[i].url).then((r) => r.blob());
      const resized_blob = await handleImageUpload(blob);
      formData.append("image", resized_blob);
    }

    await axios
      .post(`${serverUrl}product/${pid}/photos`, formData, {
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

    await axios
      .post(`${serverUrl}product/${pid}/tags`, { tags })
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
    updateProducts();
    setIsLoading(false);
    handleClose();
    resetStates();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ backdropFilter: "blur(3px)" }}>
      <DialogTitle>Add Product</DialogTitle>
      <Stack gap={2} p={2} sx={{ width: "100%" }}>
        <TextField
          variant="filled"
          fullWidth
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          variant="filled"
          fullWidth
          multiline
          label="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
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
          onChange={(e) => setDiscount(e.target.value)}
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
          onChange={(e) => setQtyOnHand(e.target.value)}
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
        <TextField
          variant="filled"
          fullWidth
          multiline
          label="Photo Credits"
          placeholder="Separate each link by space."
          value={credits?.join(" ")}
          onChange={(e) => setCredits(e.target.value.split(" "))}
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
            <Button variant="contained" type="submit" onClick={handleAddSubmit}>
              Save
            </Button>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ProductUploader;
