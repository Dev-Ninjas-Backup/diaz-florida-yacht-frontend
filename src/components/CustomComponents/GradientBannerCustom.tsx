'use client';

import React, { useEffect, useState, useRef } from 'react';
import CustomContainer from './CustomContainer';
import BannerNav from '../shared/main/Navbar/BannerNav';

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(250);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure expanded banner height on initial mount
    const measureHeight = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight;
        if (height > 96) {
          setExpandedHeight(height);
        }
      }
    };

    // Measure after a short delay to ensure content is rendered
    const timer = setTimeout(measureHeight, 100);

    // Update height on window resize
    window.addEventListener('resize', measureHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureHeight);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;

          // Simple threshold - only change state when crossing the boundary
          if (scrollPosition > 100 && !isScrolled) {
            setIsScrolled(true);
          } else if (scrollPosition <= 20 && isScrolled) {
            setIsScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <>
      {/* Placeholder to maintain page height */}
      <div className="w-full" style={{ height: expandedHeight }} />

      <div
        ref={bannerRef}
        className="bg-gradient-to-b from-[#006EF0] to-[#00CABE] rounded-2xl fixed top-0 left-0 right-0 z-50 mx-2 md:mx-5 my-2 md:my-3 transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          height: isScrolled ? '96px' : `${expandedHeight}px`,
        }}
      >
        <BannerNav />
        <CustomContainer>
          <div
            ref={contentRef}
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isScrolled
                ? 'max-h-0 opacity-0 scale-95'
                : 'max-h-96 opacity-100 scale-100 py-4'
            }`}
          >
            {children}
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default GradientBannerCustom;
