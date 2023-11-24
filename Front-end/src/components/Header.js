import React from 'react';
import Logo from '../assets/logo.svg';

const Header = () => {
  return ( 
  <div className='pt-8 pb-12'>
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        {/* logo */}
        <a href='#'>
          <img src={Logo} alt=''/>
        </a>

        {/* button */}
        <button className='btn btn-sm'>
          Gaming Time Babe!
        </button>
      </div>
    </div>
  </div>
  );
};

export default Header;
