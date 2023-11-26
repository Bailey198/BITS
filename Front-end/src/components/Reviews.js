import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const reviews = [
  {
    name: "GAMER ONE",
    review: "I hate gacha... send help!"
  },
  {
    name: "GAMER TWO",
    review: "Game for Wibu, surely I'm not one of them...Game for Wibu, surely I'm not one of them...Game for Wibu, surely I'm not one of them...Game for Wibu, surely I'm not one of them... Surely! Game for Wibu, surely I'm not one of them... Surely! Game for Wibu, surely I'm not one of them... Surely!"
  },
  {
    name: "GAMER THREE",
    review: "Great character designs, beautiful open world. Highly recommend!"
  },
  {
    name: "GAMER FOUR",
    review: "I'm a troll!!! I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!I'm a troll!!!"
  },
];

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

const Reviews = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  return (
    <div className='section' id='reviews' ref={ref}>
      <div className='container mx-auto'>
        <div className='flex'>

          <div className='flex-1'>
            <div className='flex flex-col mb-20 mt-20 items-center'>
              {/* Score */}
              <div className='flex '>
                <div className='font-accent tracking-[2px]'>
                  SCORE
                </div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={8} duration={3} /> : null}
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
                  {inView ? <CountUp start={0} end={13456} duration={3} /> : null}
                </div>
              </div>

               {/* Recent Reviews */}
               <div className='flex'>
                <div className='font-accent tracking-[2px]'>
                  Recent Reviews
                </div>
                <div className='text-[30px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={984} duration={3} /> : null}
                </div>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <div>
              {/* reviews list */}
              {reviews.map((review, index) => {
                return (
                  <div key={index} className='border-b border-white/20 h-[120px] mb-[20px] flex '>

                    <div className='max-w-[500px] overflow-hidden'>
                      <h4 className='text-[15px] text-accent tracking-wider font-primary font-semibold mb-6'>
                        {review.name}
                      </h4>
                      <div className='flex-grow'>
                        <ReadMore>
                          {review.review}
                        </ReadMore>
                      </div>
                    </div>

                    <div className='flex flex-col flex-1 items-end'>
                      <button className='btn btn-sm'>Reply</button>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
