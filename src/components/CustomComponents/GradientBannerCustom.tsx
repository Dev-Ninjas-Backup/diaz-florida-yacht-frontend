import React from 'react';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full h-40 md:h-60 bg-gradient-to-b from-[#006EF0] to-[#00CABE] flex items-center justify-center rounded-2xl">
            <CustomContainer>
                {children}
            </CustomContainer>
        </div>
    );
};

export default GradientBannerCustom;