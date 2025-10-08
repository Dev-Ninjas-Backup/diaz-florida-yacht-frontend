import React from "react";
import Image from "next/image";
import { whyUsData } from "@/assets/demo-datas/demodata";

const WhyUs = () => {
  return (
    <section className="py-16 md:py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="text-sm font-medium text-gray-600">
              {whyUsData.label}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {whyUsData.heading}
            </h2>
            <p className="text-gray-500 text-base md:text-xl leading-relaxed">
              {whyUsData.description}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {whyUsData.stats.map((s, idx) => (
                <div className="space-y-1" key={idx}>
                  <h3 className="text-xl font-semibold">{s.value}</h3>
                  <p className="text-sm text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="bg-secondary hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-colors shadow-md">
                {whyUsData.cta}
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[450px]">
            {/* Left Image - Woman on yacht */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] md:w-[40%] lg:w-[38%] aspect-[4/5] z-10">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={whyUsData.images[0]}
                  alt="Yacht lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

    
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[55%] md:w-[50%] lg:w-[48%] aspect-[3/4] z-30">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-teal-900">
                <Image
                  src={whyUsData.images[2]}
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
                  src={whyUsData.images[1]}
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
