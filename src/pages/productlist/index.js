import React, { Component, Fragment } from 'react';
import CustomSlick from '../../components/slick/CustomSlick.js';
import { API_PRODUCT } from '../../constants/apiConstants.js';
import { getData } from '../../utils/apiutil';
import './style.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            loading: true
        };
    }
    componentDidMount() {
        getData(`${API_PRODUCT.getAllProducts}`).then((data) => {
            this.setState({ products: data, loading: false })
        });
    }
    render() {
        return (
            <Fragment>
                <div className='mainTitle'>Daytona Systems</div>
                {this.state.loading && <div className='loadTitle'>Please wait...</div>}
                {this.state.products && <CustomSlick products={this.state.products}></CustomSlick>}
            </Fragment>
        )
    };
}

export default ProductList;
