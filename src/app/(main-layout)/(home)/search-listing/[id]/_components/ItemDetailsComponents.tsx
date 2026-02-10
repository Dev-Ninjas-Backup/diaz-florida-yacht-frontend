'use client';
import {
  BoatDetails,
  transformBoatDetailsToSpecifications,
  transformBoatImagesToUrls,
} from '@/types/boat-details-types';
import ItemDescriptions from './ItemDescriptions';
import ItemDetailsGallery from './ItemsDetailsGallery';
import ItemSpecifications from './ItemSpecifications';
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
      <ShowItemsLocation
        city={boatDetails.city}
        state={boatDetails.state}
        name={boatDetails.name}
      />
    </div>
  );
};

export default ItemDetailsComponents;
