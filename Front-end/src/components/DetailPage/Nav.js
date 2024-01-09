import React from 'react';
import { GrInfo } from "react-icons/gr";
import { BiHomeAlt } from 'react-icons/bi';
import { BsChatSquareText } from 'react-icons/bs';
import { MdOutlineShoppingCart } from "react-icons/md";

import { Link } from 'react-scroll';

const Nav = () => {
  return (
    <nav className='fixed bottom-2 ig:bottom-8 w-full overflow-hidden z-50' >
      <div className='container mx-auto'>
        <div className='w-full bg-black/20 h-[96px] backdrop-blur-2x1
        rounded-full max-w-[460px] mx-auto px-5 flex justify-between items-center text-2x1 text-white/50'>
            <Link 
              to='home' 
              activeClass='active'
              smooth={true}
              spy={true}
              offset={-200}
              className='cursor-pointer w-[60px] h-[60px] flex items-center justify-center'>
              <BiHomeAlt />
            </Link>
            <Link to='info' 
              activeClass='active'
              smooth={true}
              spy={true}
              className='cursor-pointer w-[60px] h-[60px] flex items-center justify-center'>
              <GrInfo />
            </Link>
            <Link to='shopping'
              activeClass='active'
              smooth={true}
              spy={true}
              className='cursor-pointer w-[60px] h-[60px] flex items-center justify-center'>
              <MdOutlineShoppingCart />
            </Link>
            <Link to='reviews'
              activeClass='active'
              smooth={true}
              spy={true}
              className='cursor-pointer w-[60px] h-[60px] flex items-center justify-center'>
              <BsChatSquareText />
            </Link>
        </div>
      </div>
    </nav> 
)};

export default Nav;
