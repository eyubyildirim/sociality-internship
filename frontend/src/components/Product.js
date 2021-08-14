import React, {useEffect, useState} from 'react'
import ProductDataService from '../services/product'
import {Link} from "react-router-dom";

const Product = (props) => {
    const [product, setProduct] = useState(null);

    const getProduct = id => {
        ProductDataService.get(id)
            .then(response => {
                console.log(response);
                setProduct(response.data.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        console.log("useEffect")
        getProduct(props.match.params.id);
    }, [props.match.params.id]);

    return <div>
        {product ? (
            <div className="row align-items-start">
                <div className="col">
                    <img src={product.image} alt=""/>
                </div>
                <div className="col">
                    <div className="row">
                        <h1>{product.name}</h1>
                        <h4>Price: {product.price}</h4>
                        <Link to={"/products/"}
                              className="btn btn-primary col-lg-5 mx-1 mb-1">
                            Return to products
                        </Link>
                    </div>
                </div>
            </div>) : (
            <div>

            </div>
        )}
    </div>
}

export default Product