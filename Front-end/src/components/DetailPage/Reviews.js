import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { ShopContext } from '../../context/shop-context';
import Comments from './CommentSection/Comments';


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p onClick={toggleReadMore} className='font-secondary leading-tight'>
      {isReadMore ? text.slice(0, 100) : text}
      <span
        className='text-accent'
      >
        {isReadMore ? " read more" : " show less"}
      </span>
    </p>
  );
};

const Reviews = (props) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  const { currentUser } = useContext(ShopContext);
  const {productId} = props;
  return (
    <div className='section' id='reviews' ref={ref}>
      <div className='container mx-auto'>
        <div className='flex'>
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.3 }}
            className='flex-1'>
            <div>
              <h2 className='h2'>Write Your Reviews</h2>
              <Comments productId={productId} currentUserId={currentUser.id} />
            </div>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
};

export default Reviews;
