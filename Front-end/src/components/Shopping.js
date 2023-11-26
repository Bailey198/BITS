import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const minimumSystem = {
  OS: 'Windows 7 or later',
  Processor: 'Intel Core i5 2.6GHz or similar',
  Memory: '6 GB RAM',
  Graphics: 'GeForce GTX 700 series or similar',
  Storage: '10 GB available space'
}

const recommendSystem = {
  OS: 'Windows 7 or later',
  Processor: 'Intel Core i5-6600 3.3GHz or similar',
  Memory: '8 GB RAM',
  Graphics: 'GeForce GTX 1050 series or similar',
  Storage: '10 GB available space'
}

const Shopping = () => {
  return (
    <div className='section' id='shopping'>
      <div className='container mx-auto'>
        <motion.div 
        variants={fadeIn('right', 0.3)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.3 }}
        className='flex'>
          {/* half page left */}
          <div className='flex-1 '>
            <h2 className='h2 '>System Requirement</h2>
            <div className='flex border-y'>
              <div className='flex-1 mx-1'>
                <h3 className='h3 text-accent'>MINIMUM</h3>
                <p><span className='text-sm font-bold text-gray-500'>OS: </span>{minimumSystem.OS}</p>
                <p><span className='text-sm font-bold text-gray-500'>Processor: </span>{minimumSystem.Processor}</p>
                <p><span className='text-sm font-bold text-gray-500'>Memory: </span>{minimumSystem.Memory}</p>
                <p><span className='text-sm font-bold text-gray-500'>Graphics: </span>{minimumSystem.Graphics}</p>
                <p><span className='text-sm font-bold text-gray-500'>Storage: </span>{minimumSystem.Storage}</p>
              </div>

              <div className='flex-1 mx-1'>
                <h3 className='h3 text-accent'>RECOMMEND</h3>
                <p><span className='text-sm font-bold text-gray-500'>OS: </span>{recommendSystem.OS}</p>
                <p><span className='text-sm font-bold text-gray-500'>Processor: </span>{recommendSystem.Processor}</p>
                <p><span className='text-sm font-bold text-gray-500'>Memory: </span>{recommendSystem.Memory}</p>
                <p><span className='text-sm font-bold text-gray-500'>Graphics: </span>{recommendSystem.Graphics}</p>
                <p><span className='text-sm font-bold text-gray-500'>Storage: </span>{recommendSystem.Storage}</p>
              </div>
            </div>
          </div>

          {/* half page right */}
          <div className='flex flex-col flex-1 mx-5 items-center justify-center'>
            <h2 className='h2'>Add To Cart</h2>
            <div>
              <button className='flex-1 btn mx-10 my-10 w-40'>Price: $60</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shopping;
