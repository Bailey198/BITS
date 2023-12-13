import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/login")
  }

  return ( 
  <div className='pt-8 pb-12'>
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        {/* logo */}
        <a href='/'>
          <img className='w-40 rounded-lg' src={Logo} alt=''/>
        </a>

        {/* button */}
        <button className='btn btn-sm' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
  );
};

export default Header;
