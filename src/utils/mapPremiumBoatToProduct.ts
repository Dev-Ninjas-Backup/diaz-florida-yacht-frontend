import { PremiumBoatApi } from '@/services/boats/premiumBoats';
import { YachtProduct } from '@/types/product-types-demo';

export const mapPremiumBoatToProduct = (boat: PremiumBoatApi): YachtProduct => {
  const priceNumber = Number(boat.Price?.replace(/[^\d]/g, ''));
  const primaryImage =
    boat.Images?.sort((a, b) => (a.Priority ?? 99) - (b.Priority ?? 99))?.[0]
      ?.Uri || '/images/placeholder.jpg';

  return {
    id: boat.DocumentID,
    name: boat.ListingTitle,
    image: primaryImage,
    images: boat.Images?.map((img) => img.Uri) || [primaryImage],
    location: `${boat.BoatLocation?.BoatCityName ?? 'Unknown'}, ${
      boat.BoatLocation?.BoatStateCode ?? ''
    }`,
    brand_make: boat.MakeString ?? 'N/A',
    model: boat.Model ?? 'N/A',
    built_year: boat.ModelYear ?? 0,
    length: 'N/A',
    number_of_engine: 0,
    class: 'Power',
    material: 'Fiberglass',
    number_of_cabin: 0,
    number_of_heads: 0,
    beam_size: 'N/A',
    fuel_type: 'Not specified',
    max_draft: 'N/A',
    condition: 'Used',
    price: isNaN(priceNumber) ? undefined : priceNumber,
    link: `/search-listing/${boat.DocumentID}`,
  };
};
