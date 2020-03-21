import React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import './css/slick-theme.css';
import './css/slick.css';
import './css/style.css';
import settings from './slicksettings';
import { LazyImage } from '../LazyLoadImage';


export default function CustomSlick(props) {
  const { products } = props;
  let slickItem = products && products.map((item, index) => {
    return (<div key={index} className='slickItem'>
      <Link to={`/product/${item.id}`}>
        <LazyImage src={item.url} alt='placeholder' title={item.title} />
      </Link>
    </div>);
  });

  return (
    <div className='slickSection'>
      <Slider {...settings}>
        {slickItem}
      </Slider>
    </div>
  );

}

