'use client';

import React, { useEffect, useRef, useState } from 'react';
import BannerNav from '../shared/main/Navbar/BannerNav';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({
  children,
  showNav = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
}) => {
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureHeights = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
      }
    };

    measureHeights();

    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  return (
    <>
      <div
        className="w-full"
        style={{
          height: bannerHeight || 'clamp(150px, 25vh, 300px)',
        }}
      />

      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl fixed top-0 left-0 right-0 z-50 mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3"
      >
        {showNav && <BannerNav />}
        <CustomContainer>
          <div className={`${showNav ? 'py-4 sm:py-6 md:py-8' : 'pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8'}`}>{children}</div>
        </CustomContainer>
      </div>
    </>
  );
};

export default GradientBannerCustom;
