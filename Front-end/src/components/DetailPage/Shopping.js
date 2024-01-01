import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

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

const Shopping = (props) => {
  
  const {price, productId} = props;

  const {addToCart} = useContext(ShopContext);

  return (
    <div className='section' id='shopping'>
      <div className='container mx-auto'>
        <motion.div
          variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
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
          <div className='flex flex-col mb-10 items-center'>
              {/* Score */}
              <div className='flex '>
                <div className='font-accent tracking-[2px]'>
                  SCORE
                </div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  <CountUp start={0} end={8} duration={3} /> 
                </div>
              </div>

              {/* overall rating */}
              <div className='flex'>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  Overwhelming Positive
                </div>
              </div>

              {/* Total Reviews */}
              <div className='flex py-10'>
                <div className='font-accent tracking-[2px]'>
                  Total Reviews
                </div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  <CountUp start={0} end={13456} duration={3} /> 
                </div>
              </div>

            </div>
            <h2 className='h2'>Add To Cart</h2>
            <div>
              <button onClick={() => addToCart(productId)} className='flex-1 btn mx-10 my-10 w-40'>Price: ${price}</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shopping;
