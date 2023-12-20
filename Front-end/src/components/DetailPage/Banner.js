import React, { useState } from 'react';
import Image1 from '../../assets/wibuImpact.png';
import Image2 from '../../assets/game2.png';
import Image3 from '../../assets/game3.jpg';
import Image4 from '../../assets/game4.png';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Banner = (props) => {
  const {title} = props;

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
          <div className='flex flex-col justify-between relative'>
            <motion.div>
              <img className='object-cover rounded-xl' src={activeImg} alt='' />
            </motion.div>
            <div className='flex flex-row absolute bottom-5 right-0 justify-end h-12 lg:h-24 pt-5'>
              <img src={images.img1} alt="" className='w-12 h-12 lg:w-24 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
              <img src={images.img2} alt="" className='w-12 h-12 lg:w-24 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
              <img src={images.img3} alt="" className='w-12 h-12 lg:w-24 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
              <img src={images.img4} alt="" className='w-12 h-12 lg:w-24 lg:h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
            </div>
          </div>
          {/* text */}
          <div className="flex-1 absolute top-0 px-5 py-5 bg-gray-500/50 w-full ">
            <motion.h1
              variants={fadeIn('down', 0.5)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
              className='text-[40px] font-bold leading-[0.8] lg:text-[70px] pb-3'
            >
              <b>{title}</b>
            </motion.h1>
            <motion.div
              variants={fadeIn('down', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
              className='text-[15px] lg:text-[22px] font-semibold uppercase leading-[1]'
            >
              <span>Best Open World RPG</span>
              <TypeAnimation sequence={[
                '65 millions Active Players are waiting for you.',
                2000,
                'Explore the games vast open world alone or team up with friends to take on challenging fights.',
                2000,
              ]}
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Banner;
