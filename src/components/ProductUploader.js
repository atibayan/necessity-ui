import React, { useState } from "react";
import { faPlus, faTrashCan, faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import './ProductUploader.css'
import Resizer from 'react-image-file-resizer'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const serverUrl = process.env.REACT_APP_SERVER_URL

const Product = (props) => {
    return (
      <div style={{"border": "1px solid black"}}>
        <p>{props.details.name}</p>
        <p>{props.details.price}</p>
        <p>{props.details.description}</p>
        {props.details.tags.map(tag => {
          return (
            <p key={tag}>TAG: {tag}</p>
          )
        })}
        {
          props.details.images.map(img => {
            return (
              <div key={img.image_name}>
              <img src={img.signedImage}></img> 
              <p>{img.image_name}</p>
              </div>
            )
          })
        }
        <button onClick={() => props.handleDeleteProduct(props.id)}>Delete</button>
      </div>
    )
}

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [qtyOnHand, setQtyOnHand] = useState(0)

  const [products, setProducts] = useState([])

  const onSelectFile = e => {
    const selectedFilesArray = Array.from(e.target.files);

    const imagesArray = selectedFilesArray.map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file)};
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  function deleteHandler(imageUrl) {
    setSelectedImages(selectedImages.filter((e) => e.url !== imageUrl));
    URL.revokeObjectURL(imageUrl);
  }

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      }, 'blob' );
  });

  const submit = async e => {
    e.preventDefault();
    const product_info = {
      name,
      price,
      description,
      qtyOnHand
    }
    const prod_info = await axios.post(`${serverUrl}product`, product_info)
    console.log(prod_info.data)

    const formData = new FormData();
    for(let i = 0; i < selectedImages.length; i++){
      const blob = await fetch(selectedImages[i].url).then(r => r.blob())
      const resized_blob = await resizeFile(blob)
      formData.append("image", resized_blob)
    }

    const prod_photo = await axios.post(
      `${serverUrl}product/${prod_info.data.pid}/photos`,
      formData,
      { headers: {'Content-Type': 'multipart/form-data'}
    })

    const prod_tag = await axios.post(
      `${serverUrl}product/${prod_info.data.pid}/tags`,
      {tags})
  }

  const getProducts = async () => {
    const {data} = await axios.get(`${serverUrl}product`)
    setProducts(prevProducts => [...prevProducts, ...data.products])
  }

  const addTag = e => {
    if(e.key == "ArrowRight") {
      let tag = e.target.value.replace(/\s+/g, ' ')
      if(tag.length > 1 && !tags.includes(tag))
        tag.split(',').forEach(tag => {
          setTags(prevTags => prevTags.concat(tag));
          e.target.value = ""
        })
    }
  }

  const deleteTag = deletedTag => {
    setTags(prevTags => prevTags.filter(tag => tag !== deletedTag))
  }

  const handleDeleteProduct = async (id) => {
      const res = await axios.delete(`${serverUrl}product/${id}`)
      if (res.status == 200)
        setProducts(prevProducts => prevProducts.filter(p => p._id != id))
    }

  return (
    <div style={{ maxHeight: "80vh", minWidth: "100%", maxWidth: "1200px", overflowY: "auto", overflowX: "hidden" }}>
      <br></br>
      <form onSubmit={submit} >
        <TextField style={{ width: "100%", marginBottom: "1rem"}}
          id="outlined-required" label="Product Name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Product Name' required/>
        <TextField style={{ width: "100%", marginBottom: "1rem"  }}
          id="outlined-required" label="Product Description"  value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='Product Description' required />

        <FormControl style={{ width: "100%", marginBottom: "1rem"  }} required>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput sx={{ fontSize: 'smaller' }}
            id="outlined-adornment-amount" value={price} step="0.01" onChange={e => setPrice(e.target.value)} type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Price" required/>
        </FormControl>

        <TextField style={{ width: "100%", marginBottom: "1rem"}}
          value={qtyOnHand} onChange={e => setQtyOnHand(e.target.value)} type="number"
          id="outlined-number" label="Quantity on Hand" InputLabelProps={{shrink: true,}} required/>

        <div id="tagsContainer">
          {
            tags.map((tag, idx) => {
              return (<div key={idx} className='tag'>{tag}<span onClick={() => {deleteTag(tag)}}>x</span></div>)
            })
          }
          <TextField style={{ width: "100%", marginBottom: "1rem" }}
          id="outlined-required" label="Tags" type="text" placeholder="Click right arrow key to add more tags." onKeyUp={addTag}/>
        </div>

        <div id="imageUploaderCont">
          <label htmlFor="choose-file"><AddPhotoAlternateIcon icon={faPlus} id="plus"/>Add Image</label>
          <input id="choose-file" type="file" name="images" onChange={onSelectFile} multiple accept="image/jpeg, image/png, image/gif" hidden required />
          
          <div className="images">
            {selectedImages &&
              selectedImages.map((image) => {
                return (
                  <div key={image.url} className="image">
                    <img src={image.url} alt="upload" />
                    <button onClick={() => deleteHandler(image.url)}>
                      <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                  </div>
                 
                );
              }) }
          </div>
          <Button variant="outlined" className="upload-btn" type="submit" style={{ borderColor: "#609966", color: "#609966" }}>Submit</Button>
        </div>
      </form>
      <Button className="upload-btn" onClick={getProducts}>Get Products</Button>
      <div className='product-viewer'>
        {
          products.map(p => {
            return <Product key={p._id} id={p._id} details={p} handleDeleteProduct={handleDeleteProduct} />
          })
        }
      </div>
    </div>
  );
};

export default ImageUploader;