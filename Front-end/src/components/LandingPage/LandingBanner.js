import React, { useState } from 'react';
import Image1 from '../../assets/genshin2.jpg';
import Image2 from '../../assets/eldenring.jpg';
import Image3 from '../../assets/gate.jpg';
import Image4 from '../../assets/2077.jpg';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const LandingBanner = () => {

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
        <div className='relative'>
          {/* image */}
          <div className='flex justify-center relative'>
            <motion.div>
              <img className='object-cover rounded-xl' src={activeImg} alt='' />
            </motion.div>
          </div>
          <div className='flex flex-row h-12 lg:h-24 pt-5'>
              <img src={images.img1} alt="" className='w-12 h-12 lg:w-32 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
              <img src={images.img2} alt="" className='w-12 h-12 lg:w-32 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
              <img src={images.img3} alt="" className='w-12 h-12 lg:w-32 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
              <img src={images.img4} alt="" className='w-12 h-12 lg:w-32 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
            </div>
        </div>
      </div>
    </section>
  );
};


export default LandingBanner;
