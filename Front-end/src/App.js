import React from 'react';
// components
import Banner from './components/Banner';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import Shopping from './components/Shopping';
import Info from './components/Info';

const App = () => {
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
      <div className='h-[4000px]'></div> 
    </div>
  );
};

export default App;
