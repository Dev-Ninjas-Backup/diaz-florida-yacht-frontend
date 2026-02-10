import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { BsStars } from 'react-icons/bs';
import SearchComponent from './SearchComponent';

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
    <section className="relative min-h-[550px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl md:py-10">
      {fileType === 'video' ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
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
          fill
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
        />
      )}

      <div className="relative z-10 px-3 md:px-5 bg-black/20 md:bg-transparent py-10 md:py-0 h-full flex items-center w-full">
        <CustomContainer>
          <div className="flex flex-col items-center md:items-start justify-between gap-10 h-full">
            <div className="w-full text-white space-y-6 md:space-y-3 xl:space-y-[17%] pt-10 md:pt-[5%]">
              <h1 className="w-full text-3xl sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-[115px] font-bold text-center uppercase tracking-[1px] md:tracking-[5px] leading-tight">
                {title}
              </h1>
              <div className="w-full md:w-1/2 text-sm xl:text-lg 2xl:text-xl max-w-[520px] mx-auto md:mx-0 md:px-10 space-y-2 text-center md:text-left">
                <h2 className="flex items-center justify-center md:justify-start gap-2 font-semibold">
                  <BsStars className="text-blue-400" /> <span>AI Powered</span>
                </h2>
                <p className="text-gray-100 md:text-white">{subtitle}</p>
              </div>
            </div>
            <div className="w-full mt-auto md:mt-10">
              <SearchComponent />
            </div>
          </div>
        </CustomContainer>
      </div>
    </section>
  );
};

export default Banner;
