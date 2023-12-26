import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "phosphor-react";
import Logo from '../../src/assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/login")
  }

  return (
    <div className='fixed top-2 ig:top-8 pt-4 pb-8 w-full overflow-hidden z-50'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          {/* logo */}
          <a href='/'>
            <img className='w-40 rounded-lg' src={Logo} alt='' />
          </a>
          <div className='flex'>
            <Link className='mt-2' to="/cart">
              <ShoppingCart size={32} />
            </Link>

            {/* button */}
            <button className='btn btn-sm ml-5' onClick={handleLogout}>
              Logout
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Header;
