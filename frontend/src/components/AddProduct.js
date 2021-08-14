import React, {useState} from 'react'
import ProductDataService from '../services/product'
import {Link} from "react-router-dom";

const AddProduct = () => {

    const [product, setProduct] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const saveProduct = () => {
        ProductDataService.addProduct(product)
            .then(response => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleInputChange = event => {
        setProduct(event.target.value);
    };

    return <div>
        {submitted ? (
            <div className="col-lg text-center">
                <h1 className="align-self-center">Thank you for submitting a product!</h1>
                <Link to={"/products/"}
                      className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Return to products
                </Link>
            </div>
        ) : (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Etsy</span>
                </div>
                <input type="text" className="form-control" placeholder="Link" aria-label="Username"
                       aria-describedby="basic-addon1" onChange={handleInputChange}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={saveProduct}>Add This Product
                    </button>
                </div>
            </div>
        )}
    </div>
}

export default AddProduct