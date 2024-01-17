import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shop-context';
import Logo from '../../src/assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const {getTotalCartItems, currentUser} = useContext(ShopContext);

  const cartQuantity = getTotalCartItems();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/login")
  }

  return (
    <div className='fixed bg-white top-2 ig:top-8 pt-4 pb-8 w-full overflow-hidden z-50'>
      <div className='container mx-auto '>
        <div className='flex justify-between items-center'>
          {/* logo */}
          <Link to='/'>
            <img className='w-40 rounded-lg' src={Logo} alt='' />
          </Link>
          <p className='h2 text-accent'>Welcome {currentUser.firstName} {currentUser.lastName}</p>
          <div className='flex'>
            <Link to="/cart" className='bg-white rounded h-14 w-12'>
              <button className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                <svg className="h-8 w-8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="absolute inset-0 object-right-top -mr-6">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    {cartQuantity}
                  </div>
                </span>
              </button>
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
