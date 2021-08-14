import React, {useEffect, useState} from 'react'
import ProductDataService from "../services/product"
import {Link} from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        retrieveProducts();
    }, [])

    const retrieveProducts = () => {
        ProductDataService.getAll()
            .then(response => {
                console.log(response.data);
                setProducts(response.data.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return <div className="card-group">
        {
            products.map(product => {
                return (
                    <div className="col-lg-4 pb-1" style={{paddingLeft: 25, paddingTop: 15}}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <div className="row-cols-lg-1 text-center" style={{marginTop: "auto"}}>
                                        <Link to={"/products/product/" + product.id}
                                              className="btn btn-primary col-lg-5 mx-1 mb-1 stretched-link">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                )
            })
        }
    </div>
}

export default ProductsList