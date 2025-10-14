import React from "react";
import CustomContainer from "./CustomContainer";
import BannerNav from "../shared/main/Navbar/BannerNav";

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-50 sm:min-h-60 bg-gradient-to-b from-[#006EF0] to-[#00CABE] rounded-2xl sticky top-2 z-50">
      <BannerNav />
      <CustomContainer>{children}</CustomContainer>
    </div>
  );
};

export default GradientBannerCustom;
