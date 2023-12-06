import React from 'react';
// components
import Banner from './Banner';
import Header from './Header';
import Nav from './Nav';
import Reviews from './Reviews';
import Shopping from './Shopping';
import Info from './Info';

const DetailProduct = () => {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <Header />
      <Banner />
      <section className='section justify-center'>_______________________________</section>
      <Nav />
      <Info />
      <section className='section justify-center'>_______________________________</section>
      <Reviews />
      <section className='section justify-center'>_______________________________</section>
      <Shopping />
      <div className='h-[1500px]'></div>
    </div>
  );
};

export default DetailProduct;
