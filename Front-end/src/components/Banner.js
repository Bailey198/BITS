import React, { useState } from 'react';
import Image1 from '../assets/wibuImpact.png';
import Image2 from '../assets/game2.png';
import Image3 from '../assets/game3.png';
import Image4 from '../assets/game4.png';
import { FaYoutube, FaFacebook, FaDiscord} from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';

const Banner = () => {

  const [images, setImages] = useState({
    img1: Image1,
    img2: Image2,
    img3: Image3,
    img4: Image4
  });

  const [activeImg, setActiveImage] = useState(images.img1)

  return (
    <section className='section pb-0' id='home'>
      <div className='container mx-auto'>
        <div className='relative '>
          {/* image */}
          <div className='flex flex-col justify-between'>
            <div>
              <img className='object-cover w-full h-full rounded-xl' src={activeImg} alt=''/>
            </div>
            <div className='flex flex-row justify-end h-24 p-5'>
                <img src={images.img1} alt="" className='w-24 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)}/>
                <img src={images.img2} alt="" className='w-24 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                <img src={images.img3} alt="" className='w-24 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                <img src={images.img4} alt="" className='w-24 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
            </div>
          </div>
          {/* text */}
          <div className="absolute top-0 px-5 py-5 bg-gray-500/50 w-full ">
            <h1>
              <b>Wibu <span>Impact</span></b>
            </h1>
            <div>
              <span>Best Open World RPG</span>
              <TypeAnimation sequence={[
                '65 millions Active Players. Explore the games vast open world alone or team up with friends to take on challenging fights',
                2000,
              ]}/>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};
  

export default Banner;
