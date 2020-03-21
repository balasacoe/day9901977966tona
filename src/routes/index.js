import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../pages/productlist';
import ProductDetail from '../pages/productdetail';

class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path='/product/:id' render={(props) => < ProductDetail {...props} />} />
                        <Route exact path='/' render={(props) => < ProductList {...props} />} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}
export default Router;