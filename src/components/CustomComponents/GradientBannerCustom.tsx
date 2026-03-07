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
  const [scrolled, setScrolled] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(96);
  const [fullHeight, setFullHeight] = useState(0);

  useEffect(() => {
    const measureHeights = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.scrollHeight;
        setFullHeight(height);
      }
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    setTimeout(measureHeights, 100);

    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldScroll = window.scrollY > 50;
          if (shouldScroll !== scrolled) {
            setScrolled(shouldScroll);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      <div
        className="w-full"
        style={{
          height: scrolled ? `${navHeight}px` : `${fullHeight}px`,
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl fixed top-0 left-0 right-0 z-50 mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3 overflow-hidden"
        style={{
          height: scrolled ? `${navHeight}px` : `${fullHeight}px`,
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={navRef}>{showNav && <BannerNav />}</div>
        <div
          ref={contentRef}
          style={{
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateY(-20px)' : 'translateY(0)',
            transition:
              'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          <CustomContainer>
            <div
              className={`${showNav ? 'py-4 sm:py-6 md:py-8' : 'pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8'}`}
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
