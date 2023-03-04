import React, { useState } from "react";
import { faPlus, faTrashCan, faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import './ProductUploader.css'
const serverUrl = process.env.REACT_APP_SERVER_URL


const ImageUploader = () => {
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [qtyOnHand, setQtyOnHand] = useState(0)

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

  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for(let i = 0; i < selectedImages.length; i++){
      let blob = await fetch(selectedImages[i].url).then(r => r.blob())
      formData.append("image", blob)
    }
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("qtyOnHand", qtyOnHand)

    for(let i = 0; i < tags.length; i++){
      formData.append("tags", tags[i])
    }
    tags.map(tag => {
      formData.append("tags", tag)
    })
    await axios.post(`${serverUrl}admin/product`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
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

  return (
    <div>
      <form onSubmit={submit} >
        <label>Product Name</label>
        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Product Name' required/>

        <label>Product Description</label>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='Product Description' required />

        <label>Price</label>
        <input value={price} step="0.01" onChange={e => setPrice(e.target.value)} type="number" placeholder='Price' required />

        <label>Initial Qty On Hand</label>
        <input value={qtyOnHand} onChange={e => setQtyOnHand(e.target.value)} type="number" placeholder='Qty on Hand' />

        <label>Tags</label>
        <div id="tagsContainer">
          {
            tags.map((tag, idx) => {
              return (<div key={idx} className='tag'>{tag}<span onClick={() => {deleteTag(tag)}}>x</span></div>)
            })
          }
          <input type="text" placeholder="add tags" onKeyUp={addTag}></input>
        </div>

        <div id="imageUploaderCont">
          <label htmlFor="choose-file">
            <FontAwesomeIcon icon={faPlus} id="plus" />
          </label>
          <input
            id="choose-file"
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/*"
            required
          />
          
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
              })}
          </div>
          <button className="upload-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;