"use client";
import Image from "next/image";
import React, { useState } from "react";
import banner from "@/assets/search-listing-image/banner.jpg";
import { IoSearchSharp } from "react-icons/io5";
import CustomContainer from "@/components/Product/CustomContainer";
import FilterListing from "./_components/FilterListing";
import AllListing from "./_components/AllListing";
import bannerDown from "@/assets/yacht-images/subscription.png";

const Page = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <div className="w-full h-[280px] md:h-[450px] relative rounded-2xl overflow-hidden">
        <Image
          src={banner}
          alt="Search Listing"
          className="w-full h-full object-cover"
          width={1200}
          height={300}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-end flex-col space-y-10 py-10 px-5">
          <h1 className="text-white text-2xl md:text-4xl lg:text-6xl uppercase font-bold md:tracking-[5px]">
            search FROM LISTING
          </h1>
          <div className="bg-white p-3 rounded-2xl max-w-7xl w-full flex items-center gap-5">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-3 rounded-lg focus:outline-none w-full bg-gray-100"
            />
            <button className="bg-secondary text-sm md:text-base text-white px-4 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 min-w-max">
              <IoSearchSharp /> <span>Show My Boat</span>
            </button>
          </div>
        </div>
      </div>

      <CustomContainer>
        <div className="md:hidden my-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-10 py-4 h-full">
          <div className="hidden md:block w-1/4 h-full">
            <FilterListing />
          </div>
          <div className="w-full md:w-3/4">
            <AllListing />
          </div>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FilterListing />
            </div>
          </div>
        )}
      </CustomContainer>

      <div className="pb-10 relative rounded-2xl">
        <Image src={bannerDown} className="w-full h-auto rounded-2xl" alt="banner" />
        <div className="absolute bottom-0 md:bottom-10 w-full text-center px-4 text-white flex flex-col items-center justify-end space-y-2 md:space-y-5 pb-10">
            <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold">Looking to Sell Your Boat?</h1>
            <p className="text-xs md:text-xl">Reach thousands of qualified buyers in Florida’s most active yacht marketplace.</p>
            <button className="px-2 md:px-5 py-1 md:py-2 rounded-2xl bg-black text-xs md:text-base text-white">Sell Your Boat</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
