import React, { useState } from "react";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./ProductUploader.css";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import imageCompression from "browser-image-compression";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ProductUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [qtyOnHand, setQtyOnHand] = useState(0);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  function deleteHandler(imageUrl) {
    setSelectedImages(selectedImages.filter((e) => e.url !== imageUrl));
    URL.revokeObjectURL(imageUrl);
  }

  async function handleImageUpload(imageFile) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(compressedFile.size / 1024 / 1024);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const product_info = {
      name,
      price,
      description,
      qtyOnHand,
    };
    const prod_info = await axios.post(`${serverUrl}product`, product_info);
    console.log(prod_info.data);

    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      const blob = await fetch(selectedImages[i].url).then((r) => r.blob());
      const resized_blob = await handleImageUpload(blob);
      formData.append("image", resized_blob);
      console.log(resized_blob);
    }

    const prod_photo = await axios.post(
      `${serverUrl}product/${prod_info.data.pid}/photos`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const prod_tag = await axios.post(
      `${serverUrl}product/${prod_info.data.pid}/tags`,
      { tags }
    );

    // Call handleOpen to show success alert toast
    handleOpen();

    // Call handleClose after 3 seconds to close success alert toast
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

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

  const handleDeleteProduct = async (id) => {
    const res = await axios.delete(`${serverUrl}product/${id}`);
    if (res.status === 200)
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
  };

  return (
    <div
      style={{
        maxHeight: "80vh",
        minWidth: "100%",
        maxWidth: "1200px",
        overflowY: "auto",
        overflowX: "hidden",
      }}>
      <br></br>

      {/* Success alert toast */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product uploaded successfully
        </Alert>
      </Snackbar>

      <form onSubmit={submit}>
        <TextField
          style={{ width: "100%", marginBottom: "1rem" }}
          id="outlined-required"
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
          required
        />

        <TextField
          style={{ width: "100%", marginBottom: "1rem" }}
          id="outlined-required"
          label="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Product Description"
          required
        />

        <FormControl style={{ width: "100%", marginBottom: "1rem" }} required>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            sx={{ fontSize: "smaller" }}
            id="outlined-adornment-amount"
            value={price}
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Price"
            required
          />
        </FormControl>

        <TextField
          style={{ width: "100%", marginBottom: "1rem" }}
          value={qtyOnHand}
          onChange={(e) => setQtyOnHand(e.target.value)}
          type="number"
          id="outlined-number"
          label="Quantity on Hand"
          InputLabelProps={{ shrink: true }}
          required
        />

        <div id="tagsContainer">
          {tags.map((tag, idx) => {
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
          })}
          <TextField
            style={{ width: "100%", marginBottom: "1rem" }}
            id="outlined-required"
            label="Tags"
            type="text"
            placeholder="Click right arrow key to add more tags."
            onKeyUp={addTag}
          />
        </div>

        <div id="imageUploaderCont">
          <label htmlFor="choose-file">
            <AddPhotoAlternateIcon icon={faPlus} id="plus" />
            Add Image
          </label>
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

          <div className="images">
            {selectedImages &&
              selectedImages.map((image) => {
                return (
                  <div key={image.url} className="image">
                    <img src={image.url} alt="upload" />
                    <button onClick={() => deleteHandler(image.url)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                );
              })}
          </div>
          <Button
            variant="outlined"
            className="upload-btn"
            type="submit"
            style={{ borderColor: "#609966", color: "#609966" }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductUploader;
