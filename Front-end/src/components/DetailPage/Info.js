import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { TypeAnimation } from 'react-type-animation';


const Info = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  return (
    <div className='section' id='info' ref={ref}>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-10 lg:flex-row items-center'>
          {/*img*/}
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
            className='flex-1 bg-about bg-contain bg-no-repeat lg:h-[500px] mix-blend-lighten bg-center'></motion.div>

          {/*text*/}
          <motion.div
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
            className='flex-1'>
            <h2 className='h2 text-accent'>Game Info</h2>
            <h3 className='h3 mb-4'>Gameplay</h3>
            {inView ? <TypeAnimation sequence={[
              'The combat in Wibu Impact is fast-paced and action-packed, with a wide range of characters and weapons to choose from. Each character has unique abilities that can be combined in creative ways, making combat dynamic and engaging. Switching between characters can be done quickly during combat, allowing the player to play with no braincell.',
              3000,
            ]}
              speed={80}
            /> : null}
            <div className='flex gap-x-6 lg:gap-x-10 mb-12 mt-12 justify-center'>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={64845911} duration={5} /> : null}
                </div>
                <div className='font-primary text-sm tracking-[2px]'>
                  Monthly <br /> Players
                </div>
              </div>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={4951567} duration={4} /> : null}
                </div>
                <div className='font-primary text-sm tracking-[2px]'>
                  Daily <br /> Players
                </div>
              </div>
              <div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={812567} duration={3} /> : null}
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
