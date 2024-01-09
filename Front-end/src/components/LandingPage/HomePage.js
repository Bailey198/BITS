import React from 'react'
import Banner from './LandingBanner';
import Nav from './LandingNav'
import GameList  from './GameList';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className='h-[300px]'><center></center></div>
      <GameList/>
      <div className='h-[1000px]'></div>
    </div>
  )
}

export default HomePage;