'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import {
  FeaturedBrand,
  getFeaturedBrands,
} from '@/services/featuredBrands/featuredBrands';
import { NoDataFound } from '@/components/ui/no-data-found';
import FeaturedBrandsSkeleton from '../Skeletons/FeaturedBrandsSkeleton';

const FeaturedBrands = () => {
  const [brands, setBrands] = useState<FeaturedBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      const data = await getFeaturedBrands('FLORIDA');
      setBrands(data);
      setIsLoading(false);
    };
    loadBrands();
  }, []);

  if (isLoading) {
    return (
      <CustomContainer>
        <FeaturedBrandsSkeleton />
      </CustomContainer>
    );
  }

  return (
    <div className="py-20">
      <CustomContainer>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Our Featured Yacht Brands
        </h1>

        {brands.length === 0 ? (
          <NoDataFound
            title="No featured brands found"
            description="There are no featured brands available at the moment."
          />
        ) : (
          <div className="space-y-10 my-20 px-4 sm:px-8 md:px-16 lg:px-[10%] relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-linear-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

            <div className="flex items-center relative">
              <Marquee
                direction="right"
                gradient={false}
                speed={40}
                pauseOnHover
              >
                {brands.map((brand) => (
                  <div key={brand.id} className="mx-3 sm:mx-5 md:mx-7">
                    <div className="relative w-36 sm:w-48 md:w-56 h-16 sm:h-20">
                      <Image
                        src={brand.featuredbrandLogo.url}
                        alt="Featured Brand"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            <div>
              <Marquee
                direction="left"
                gradient={false}
                speed={25}
                pauseOnHover
              >
                {brands.map((brand) => (
                  <div key={brand.id} className="mx-3 sm:mx-5 md:mx-7">
                    <div className="relative w-36 sm:w-48 md:w-56 h-16 sm:h-20">
                      <Image
                        src={brand.featuredbrandLogo.url}
                        alt="Featured Brand"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        )}
      </CustomContainer>
    </div>
  );
};

export default FeaturedBrands;
