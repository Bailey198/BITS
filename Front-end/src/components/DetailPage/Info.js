import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { TypeAnimation } from 'react-type-animation';
import ReactPlayer from 'react-player/youtube'


const Info = (props) => {
  const {description, videoLink} = props;
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  let videoDemo = videoLink || 'https://www.youtube.com/watch?v=XIMLoLxmTDw&ab_channel=CandRfun'

  return (
    <div className='section' id='info' ref={ref}>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-10 lg:flex-row items-center'>
          {/*img*/}
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true}}
            className='flex-1 lg:h-[400px] mix-blend-lighten bg-center'>
              <ReactPlayer url={videoDemo} />
          </motion.div>

          {/*text*/}
          <motion.div
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.3 }}
            className='flex-1'>
            <h2 className='h2 text-accent'>Game Info</h2>
            <h3 className='h3 mb-4'>Gameplay</h3>
            {inView ? <div>{description}</div>
            : null}
            <div className='flex gap-x-6 lg:gap-x-10 mb-12 mt-12 justify-center'>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={64845911} duration={3} /> : null}
                </div>
                <div className='font-primary text-sm tracking-[2px]'>
                  Monthly <br /> Players
                </div>
              </div>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={4951567} duration={2} /> : null}
                </div>
                <div className='font-primary text-sm tracking-[2px]'>
                  Daily <br /> Players
                </div>
              </div>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={812567} duration={1} /> : null}
                </div>
                <div className='font-primary text-sm tracking-[2px]'>
                  Current <br /> Players
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
};

export default Info;
