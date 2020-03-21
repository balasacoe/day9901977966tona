import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './style.css';
import { API_PRODUCT, API_IMAGE } from '../../constants/apiConstants.js';
import { getData } from '../../utils/apiutil';
import Tesseract from 'tesseract.js';
import { LazyImage } from '../../components/LazyLoadImage';
import Features from '../../components/Features';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            scannedData: null,
            productData: null
        };
        this.scan = this.scan.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount() {
        getData(`${API_PRODUCT.getSingleProduct}${this.id}`).then((data) => {
            this.setState({ productData: data })
        });
    }

    scan() {
        this.setState({ scannedData: "Generating.." });
        Tesseract.recognize(
            `${API_IMAGE}${(this.id % 7)}.jpg`,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            this.setState({ scannedData: text });
        })
    };
    goBack() {
        this.props.history.push('/');
    };
    render() {
        const productData = this.state.productData;
        return (
            <div>
                {productData ?
                    <div className='infocontainer'>
                        <Grid justify="center" container>
                            <Grid item lg={3} md={4} sm={12} xs={12} >
                                <div className='imgContent'>
                                    <LazyImage src={productData.url} alt='placeholder' title={productData.title} />
                                </div>
                            </Grid>
                            <Grid item lg={8} md={8} sm={12} xs={12} >
                                <div className='InfoContent'>
                                    <div className='title'>{productData.title}</div>
                                    <div className='subTitle'>Quantity : <span>{productData.quantity}</span></div>
                                    <div className='descTitle'>Description :</div>
                                    <div className='desc'>{productData.description}</div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container >
                            <Grid item lg={11} md={11} sm={12} xs={12} >
                                <div className='descTitle'>Features :</div>
                                <Features features={productData.features} className='desc' />
                            </Grid>
                        </Grid>
                        <div className='buttonSection'>
                            <div className='submitBtn' onClick={this.scan}>SCAN</div>
                        </div>
                        <div className='buttonSection'>
                            <div className='submitBtn' onClick={this.goBack}>HOME</div>
                        </div>
                    </div>
                    : <div className='loadTitle'>Please wait...</div>}

                {this.state.scannedData && <div className='scannedcontainer'>
                    <div className='scannedTxt'>{this.state.scannedData} </div>
                </div>}
            </div>

        );
    }
}

export default ProductDetail;
