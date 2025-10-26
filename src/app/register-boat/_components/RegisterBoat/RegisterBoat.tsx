'use client';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import RegisterBoatForm from './_components/RegisterBoatForm/RegisterBoatForm';

const RegisterBoat = () => {
  const router = useRouter();
  return (
    <div className="my-2 md:my-3 mx-2 md:mx-5 rounded-2xl">
      {/* <Navbar /> */}
      <GradientBannerCustom>
        <div className="flex items-center gap-3  pt-10">
          <IoArrowBack
            className="text-2xl sm:text-4xl text-white cursor-pointer hover:scale-105 duration-500 transition-transform"
            onClick={() => router.back()}
          />
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            Register Your Boat
          </h1>
        </div>
      </GradientBannerCustom>
      <div className="my-20">
        <RegisterBoatForm />
      </div>
    </div>
  );
};

export default RegisterBoat;
