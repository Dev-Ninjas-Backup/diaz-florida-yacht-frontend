import React from 'react';
import { BsStars } from 'react-icons/bs';
import SearchComponent from './SearchComponent';

const Banner = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden  py-10">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg-video/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="relative z-10 flex flex-col items-start justify-between px-[3%] gap-5 h-full space-y-[75%] sm:space-y-[45%] md:space-y-[35%] lg:space-y-5">
        {/* Heading */}
        <div className='text-white space-y-[5%] md:space-y-[20%] pt-[20%] md:pt-[5%]'>
            <h1 className='text-2xl md:text-6xl lg:text-[115px] font-bold md:text-center uppercase md:tracking-[5px]'>Florida yacht trader</h1>
            <div className='text-base md:text-xl max-w-[520px] pr-5 md:space-y-2'>
                <h2 className='flex items-center gap-2 font-semibold'><BsStars /> <span>AI Powered</span></h2>
                <p>The Worlds most affordable and safe marketplace with AI powered search assistant</p>
            </div>
            
        </div>
        <div className='mt-5 w-full'>
            <SearchComponent />
        </div>

        </div>
 
    </section>
    );
};

export default Banner;