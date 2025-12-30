import React from 'react';
import { BsStars } from 'react-icons/bs';
import SearchComponent from './SearchComponent';
import CustomContainer from '@/components/CustomComponents/CustomContainer';

import { getBanner } from '@/services/main/banner';
import Image from 'next/image';

const Banner = async () => {
  const banner = await getBanner('HOME', 'FLORIDA').catch(() => null);

  const backgroundUrl = banner?.background?.url || '/bg-video/banner.mp4';
  const fileType = banner?.background?.fileType || 'video';
  const mimeType = banner?.background?.mimeType || 'video/mp4';
  const title = banner?.bannerTitle || 'Florida yacht trader';
  const subtitle =
    banner?.subtitle ||
    'The Worlds most affordable and safe marketplace with AI powered search assistant';

  return (
    <section className="relative h-[380px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl  md:py-10 ">
      {/* Background media */}
      {fileType === 'video' ? (
        <video
          className="absolute top-0 left-0 w-full h-[380px] md:h-full object-cover rounded-2xl "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundUrl} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={backgroundUrl}
          alt={title}
          className="absolute top-0 left-0 w-full h-[380px] md:h-full object-cover rounded-2xl"
        />
      )}

      <div className="relative z-10 px-3 md:px-5 bg-black/20 md:bg-transparent py-5 md:py-0 h-full flex items-center">
        <CustomContainer>
          <div className="flex flex-col items-start justify-between  gap-5 h-full space-y-24 md:space-y-5">
            <div className="text-white space-y-3 xl:space-y-[17%] pt-[20%] md:pt-[5%]">
              <h1 className="text-2xl md:text-6xl xl:text-7xl 2xl:text-[115px] font-bold text-left uppercase tracking-[1px] md:tracking-[5px]">
                {title}
              </h1>
              <div className="text-xs xl:text-lg 2xl:text-xl max-w-[520px] pr-5 space-y-2">
                <h2 className="flex items-center gap-2 font-semibold">
                  <BsStars /> <span>AI Powered</span>
                </h2>
                <p>{subtitle}</p>
              </div>
            </div>
            <div className="md:mt-10 w-full ">
              <SearchComponent />
            </div>
          </div>
        </CustomContainer>
      </div>
    </section>
  );
};

export default Banner;
