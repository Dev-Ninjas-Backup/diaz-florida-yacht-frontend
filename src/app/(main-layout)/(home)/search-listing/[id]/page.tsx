'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import { getBoatDetails } from '@/services/boats';
import { BoatDetails } from '@/types/boat-details-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import SendMessage from './_components/SendMessage';

const SearchListingDetailsPage = () => {
  const id = useParams().id as string;
  const navigate = useRouter();
  const [boatDetails, setBoatDetails] = useState<BoatDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        setIsLoading(true);
        const { data: details } = await getBoatDetails(id as string);
        setBoatDetails(details);
      } catch (error) {
        console.error('Error fetching boat details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBoatDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!boatDetails) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Boat details not found</p>
      </div>
    );
  }
  return (
    <div>
      <GradientBannerCustom showNav={false}>
        <div className="text-white flex flex-row md:flex-row items-start justify-between gap-3 w-full md:pt-24 px-4 pt-2">
          <div className="flex flex-row items-center justify-start gap-3 font-semibold text-sm md:text-xl lg:text-2xl">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => navigate.back()}
            />
            <h1>
              {boatDetails.buildYear} {boatDetails.make} {boatDetails.model}
            </h1>
          </div>
          <div className="text-right md:text-left text-sm md:text-xl lg:text-2xl pl-5 w-full md:w-max">
            <p>
              Price:{' '}
              {boatDetails.price
                ? `$${boatDetails.price.toLocaleString()}`
                : 'Price on request'}
            </p>
            <p className="text-xs md:text-base lg:text-lg">
              {boatDetails.city}, {boatDetails.state}
            </p>
          </div>
        </div>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="flex flex-col md:flex-row gap-10 py-5">
          <div className="md:w-2/3 flex-shrink-0">
            <ItemDetailsComponents boatDetails={boatDetails} />
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="sticky top-20">
              <SendMessage listingId={id} />
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default SearchListingDetailsPage;
