'use client';
import {
  BoatDetails,
  transformBoatDetailsToSpecifications,
  transformBoatImagesToUrls,
} from '@/types/boat-details-types';
import ShareWIth from '@/components/shared/ShareWith/ShareWIth';
import ItemDescriptions from './ItemDescriptions';
import ItemDetailsGallery from './ItemsDetailsGallery';
import ItemExtraDetails from './ItemExtraDetails';
import ItemSpecifications from './ItemSpecifications';
import ItemVideos from './ItemVideos';
import ShowItemsLocation from './ShowItemsLocation';

interface ItemDetailsComponentsProps {
  boatDetails: BoatDetails;
}

const ItemDetailsComponents = ({ boatDetails }: ItemDetailsComponentsProps) => {
  const images = transformBoatImagesToUrls(boatDetails);
  const specifications = transformBoatDetailsToSpecifications(boatDetails);

  return (
    <div>
      <ItemDetailsGallery name={boatDetails.name} images={images} />
      <ItemSpecifications specifications={specifications} />
      <ItemDescriptions description={boatDetails.description} />
      <ItemExtraDetails extraDetails={boatDetails.extraDetails} />
      {boatDetails.videoURL && <ItemVideos videoURL={boatDetails.videoURL} />}
      <ShowItemsLocation
        city={boatDetails.city}
        state={boatDetails.state}
      />
      <div className="px-1 md:px-4">
        <ShareWIth
          title={boatDetails.name}
          boatInfo={{
            title: boatDetails.name,
            price: boatDetails.price ? `$${boatDetails.price.toLocaleString()}` : 'Price on request',
            make: boatDetails.make,
            model: boatDetails.model,
            year: boatDetails.buildYear,
            location: [boatDetails.city, boatDetails.state].filter(Boolean).join(', ') || undefined,
          }}
        />
      </div>
    </div>
  );
};

export default ItemDetailsComponents;
