import { demodata } from "@/assets/demo-datas/demodata";
import CustomContainer from "@/components/Product/CustomContainer";
import ProductCard from "@/components/Product/ProductCard";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PremiumDeals = () => {
  return (
   <CustomContainer>
     <div className="my-20 space-y-10">
      <div className="flex items-end justify-between">
        <div className="text-left space-y-3 max-w-3xl">
          <h1 className="text-5xl font-bold">Premium Deals Near Florida</h1>
          <p className="text-xl text-secondary-txt">
            Discover the best yachts available right now. These premium
            selections are hand-picked from trusted sellers across Florida.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button className="bg-gray-300 p-3 rounded-xl"><IoIosArrowBack className="text-xl" /></button>
            <button className="bg-secondary text-white p-3 rounded-xl"><IoIosArrowForward className="text-xl" /></button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {
            demodata.slice(0, 4).map((item) => <ProductCard key={item.name} product={item} />)
        }
      </div>
    </div>
   </CustomContainer>
  );
};

export default PremiumDeals;
