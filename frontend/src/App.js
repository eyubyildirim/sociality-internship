import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

function App() {
    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/products" className="navbar-brand">
                    Etsy Products
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/products"} className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/products/add"} className="nav-link">
                            Add Product
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/products"]} component={ProductsList}/>
                    <Route
                        path="/products/product/:id"
                        component={Product}/>
                    <Route
                        path="/products/add"
                        render={(props) => (
                            <AddProduct {...props} user={user}/>
                        )}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;
