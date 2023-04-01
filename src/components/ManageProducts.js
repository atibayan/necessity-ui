import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './ManageProducts.css'
import ProductUploader from './ProductUploader';
import { Modal, Box } from '@mui/material';
import Table from '@mui/material/Table';
import ProductEditor from './ProductEditor';
const serverUrl = process.env.REACT_APP_SERVER_URL

const Product = (props) => {

    console.log(props.details);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    return (
        <tr>
            <td>{props.details.name}</td>
            <td>{props.details.description}</td>
            <td>${props.details.price}</td>
            <td>
                {props.details.tags.map((tag, index) => {
                    return (
                        <p key={tag}>{tag}{index !== props.details.tags.length - 1 && ', '}</p>
                    )
                })}
            </td>
            <td>{props.details.quantity_on_hand}</td>
            <td>
                <div className="image-display" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {props.details.images.map(img => {
                        return (
                            <div key={img.image_name}>
                                <img className="prod-image" src={img.signedImage} style={{ margin: '0', padding: '0' }}></img>
                            </div>
                        )
                    })}
                </div>
            </td>
            <td>
                <button className="button-edit" onClick={() => {props.handleEditProduct(props.id); setSelectedProduct(props.details); handleOpenEditModal();}}>Edit</button>
                {/* <button className="button-edit" onClick={handleOpenEditModal}>Edit</button> */}
                <Modal open={openEditModal} onClose={handleCloseEditModal}>
                <Box className="box-modal">
                    <h2>Edit Product</h2>
                    {<ProductEditor product={selectedProduct} setSelectedProduct={setSelectedProduct}/>}
                    {/* {<ProductEditor/>} */}
                    <button className="closeBtn" variant="contained" onClick={handleCloseEditModal}>Close</button>
                </Box>
                </Modal>
                <button className="button-delete" onClick={() => props.handleDeleteProduct(props.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ManageProducts = () => {


    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const { data } = await axios.get(`${serverUrl}product`)
        setProducts([]);
        setProducts(prevProducts => [...prevProducts, ...data.products])
    }

    const handleDeleteProduct = async (id) => {
        const res = await axios.delete(`${serverUrl}product/${id}`)
        if (res.status == 200)
            setProducts(prevProducts => prevProducts.filter(p => p._id != id))
    }

    const handleEditProduct = async (id) => {

        // const selected = products.find(p => p._id === id);
        // setSelectedProduct(selected);
        // handleOpenEditModal();
        
    }

    return (
        <div>
            <button className="add-product-button" onClick={handleOpenAddModal}>Add Product</button>
            <Modal open={openAddModal} onClose={handleCloseAddModal}>
                <Box className="box-modal">
                    <h2>Add Product</h2>
                    {<ProductUploader />}
                    <button className="closeBtn" variant="contained" onClick={handleCloseAddModal}>Close</button>
                </Box>
            </Modal>
            <div className='product-viewer'>
                <Table>
                    <thead>
                        <tr>
                            <th className="header1">Product Name</th>
                            <th className="header1">Description</th>
                            <th className="header1">Price</th>
                            <th className="header1">Tags</th>
                            <th className="header1">Quantity</th>
                            <th className="header1">Images</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => {
                            return <>
                                <Product key={p._id} id={p._id} details={p} handleDeleteProduct={handleDeleteProduct} handleEditProduct={handleEditProduct}/>
                            </>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageProducts;