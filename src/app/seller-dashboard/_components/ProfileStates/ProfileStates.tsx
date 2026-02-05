'use client';
import Image from 'next/image';
import profilePhoto from '@/assets/seller-dashboard/profileAvatar.svg';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import icon1 from '@/assets/seller-dashboard/states/icon1.svg';
import icon2 from '@/assets/seller-dashboard/states/icon2.svg';
import icon3 from '@/assets/seller-dashboard/states/icon3.svg';
import { getSellerStats } from '@/services/seller';
import { useEffect, useState } from 'react';

interface SellerStats {
  totalListing: number;
  activeListing: number;
  totalLeads: number;
  name: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  avatarUrl: string;
}

const ProfileStates = () => {
  const [stats, setStats] = useState<SellerStats | null>(null);

  useEffect(() => {
    const getStats = async () => {
      const getStatesFromApi = await getSellerStats();
      setStats(getStatesFromApi.data);
    };
    getStats();
  }, []);

  console.log('Seller Stats:', stats);
  return (
    <div className="">
      <CustomContainer>
        <div className="w-full flex lg:flex-row flex-col gap-5 md:gap-10 justify-between flex-wrap">
          <div className="flex flex-col sm:flex-row items-center space-y-2 md:space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                <Image
                  src={stats?.avatarUrl || profilePhoto}
                  alt="Esther Howard"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {stats ? stats.name : 'Not Available'}
              </h2>
              <p className="text-gray-600">
                {stats ? `${stats.city}, ${stats.state}` : 'Not Available'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-2 md:p-4 text-center shadow-sm">
              <Image
                src={icon1}
                alt="icon"
                width={80}
                height={80}
                className="w-7 md:w-11 h-7 md:h-11"
              />
              <span className="text-lg md:text-2xl mt-3 font-bold text-primary-txt">
                {stats ? stats.totalListing : 'Not Available'}
              </span>
              <span className="text-xs md:text-base text-primary-txt">
                Boat Listed
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-2 md:p-4 text-center shadow-sm">
              <Image
                src={icon2}
                alt="icon"
                width={80}
                height={80}
                className="w-7 md:w-11 h-7 md:h-11"
              />
              <span className="text-lg md:text-2xl mt-3 font-bold text-primary-txt">
                {stats ? stats.activeListing : 'Not Available'}
              </span>
              <span className="text-xs md:text-base text-primary-txt">
                Active Listing
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-2 md:p-4 text-center shadow-sm">
              <Image
                src={icon3}
                alt="icon"
                width={80}
                height={80}
                className="w-7 md:w-11 h-7 md:h-11"
              />
              <span className="text-lg md:text-2xl mt-3 font-bold text-primary-txt">
                {stats ? stats.totalLeads : 'Not Available'}
              </span>
              <span className="text-xs md:text-base text-primary-txt">
                Lead Generated
              </span>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProfileStates;
