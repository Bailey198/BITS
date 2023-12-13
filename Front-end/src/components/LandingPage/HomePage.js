import React from 'react'
import Banner from './LandingBanner';
import Nav from './LandingNav'
import GameList  from './GameList';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <section className='section justify-center'>_______________________________</section>
      <Nav />
      <GameList />
      <section className='section justify-center'>_______________________________</section>
      
      <div className='h-[1500px]'></div>
    </div>
  )
}

export default HomePage;