import Image from 'next/image';
import React from 'react';
import bannerDown from "@/assets/yacht-images/subscription.png";
const AdComponent = () => {
    return (
        <div className="pb-10 relative rounded-2xl">
        <Image src={bannerDown} className="w-full h-auto rounded-2xl" alt="banner" />
        <div className="absolute bottom-0 md:bottom-10 w-full text-center px-4 text-white flex flex-col items-center justify-end space-y-2 md:space-y-5 pb-10">
            <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold">Looking to Sell Your Boat?</h1>
            <p className="text-xs md:text-xl">Reach thousands of qualified buyers in Florida’s most active yacht marketplace.</p>
            <button className="px-2 md:px-5 py-1 md:py-2 rounded-2xl bg-black text-xs md:text-base text-white">Sell Your Boat</button>
        </div>
      </div>
    );
};

export default AdComponent;