'use client';

import React, { useRef } from 'react';
import BannerNav from '../shared/main/Navbar/BannerNav';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({
  children,
  showNav = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3"
      >
        <div ref={navRef}>{showNav && <BannerNav />}</div>
        <div ref={contentRef}>
          <CustomContainer>
            <div
              className={`${showNav ? 'py-3 sm:py-4 md:py-5' : 'pt-14 md:pt-16 pb-3 sm:pb-4 md:pb-5'}`}
            >
              {children}
            </div>
          </CustomContainer>
        </div>
      </div>
    </>
  );
};

export default GradientBannerCustom;
