import React from "react";
import Image from "next/image";
import img1 from "@/assets/local-marketplace/img1.jpg";
import img2 from "@/assets/local-marketplace/img2.png";
import img3 from "@/assets/local-marketplace/img3.png";

const WhyUs = () => {
  return (
    <section className="py-16 md:py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Section */}
          <div className="space-y-6">
            {/* Why us? label */}
            <div className="text-sm font-medium text-gray-600">Why us?</div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Florida&apos;s #1 Local Yacht Marketplace
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-base md:text-xl leading-relaxed">
              FloridaYachtTrader.com makes it easy for buyers and sellers to
              connect in one trusted place. From center consoles to luxury
              yachts, we&apos;re the go-to marketplace built for Florida
              boaters. With powerful search tools, premium listings, and local
              expertise, finding your dream yacht has never been simpler.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold ">24+ Years</h3>
                <p className="text-sm text-gray-600">Yachting Excellence</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold ">2000+</h3>
                <p className="text-sm text-gray-600">Boats Sold Per Year</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold ">1000+</h3>
                <p className="text-sm text-gray-600">Listings viewed monthly</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-secondary hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-colors shadow-md">
                List Your Boat For Sale
              </button>
            </div>
          </div>

          {/*  Image section */}
          <div className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[450px]">
            {/* Left Image - Woman on yacht */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] md:w-[40%] lg:w-[38%] aspect-[4/5] z-10">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={img1}
                  alt="Yacht lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Center Image - Aerial yacht view (Largest, on top) */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[55%] md:w-[50%] lg:w-[48%] aspect-[3/4] z-30">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-teal-900">
                <Image
                  src={img3}
                  alt="Yacht aerial view"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Image - Yacht interior */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] md:w-[40%] lg:w-[38%] aspect-[4/5] z-50">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={img2}
                  alt="Yacht interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
