import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './ManageProducts.css';


function ManageProducts() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('http://localhost:5001/');
        const items = await data.json();
        setItems(items);
    }

    return(
        <section>
        <div>
            <table className='products_table'>
                <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity On Hand</th>
                    <th>Actions</th>
                </tr>
        {
            
                 items.map(item => (
                    <tr>
                        <td>{item.product_name}</td>
                        <td>{item.product_description}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.quantityOnHand}</td>
                        <th>
                         <button type="button">Edit</button>
                            <button type="button">Delete</button>
                        </th>
                    </tr>
            ))
        }
            </table>
        </div>
        </section>
    );
}

export default ManageProducts;