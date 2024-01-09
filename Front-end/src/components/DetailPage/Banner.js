import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Banner = (props) => {
  const {title, bannerImg} = props;
  const mainImg = process.env.REACT_APP_API_URL+'/'+ bannerImg;

  return (
    <section className='section pb-0' id='home'>
      <div className='container mx-auto'>
        <div className='relative'>
          {/* image */}
          <div className='flex justify-center relative'>
            <motion.div>
              <img className='object-cover rounded-xl' src={mainImg} alt='' />
            </motion.div>
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
              viewport={{ once: true, amount: 0.7 }}
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
