import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

// components
import Banner from './Banner';
import Nav from './Nav';
import Reviews from './Reviews';
import Shopping from './Shopping';
import Info from './Info';

const DetailProduct = () => {
  const [productData, setProductData] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.controlLoading(true))
    requestApi(`/products/${params.id}`, 'GET', []).then(response => {
        console.log(response)
        setProductData(response.data)
        console.log(productData)
        dispatch(actions.controlLoading(false))
    }).catch(err => {
        console.log(err)
        dispatch(actions.controlLoading(false))
    })
}, [])

  return (
    <div>
      <Banner title={productData.title}/>
      <section className='section justify-center'>_______________________________</section>
      <Nav />
      <Info description={productData.description}/>
      <section className='section justify-center'>_______________________________</section>
      <Reviews />
      <section className='section justify-center'>_______________________________</section>
      <Shopping price={productData.price}/>
      <div className='h-[1500px]'></div>
    </div>
  );
};

export default DetailProduct;
