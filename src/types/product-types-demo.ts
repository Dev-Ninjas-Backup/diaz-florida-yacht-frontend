import { StaticImageData } from 'next/image';

export interface YachtProduct {
  id?: string;
  brand_make: string;
  model: string;
  built_year: number;
  length: string;
  number_of_engine: number;
  class: string;
  material: string;
  number_of_cabin: number;
  number_of_heads: number;
  beam_size: string;
  fuel_type: string;
  max_draft: string;
  name: string;
  location: string;
  condition: string;
  price?: number; // Make optional to handle "Price on request"
  images: (string | StaticImageData)[];
  image: string | StaticImageData;
  link?: string;
  description?: string;
}

export interface CategoryImg {
  id: number;
  name: string;
  image: string | StaticImageData;
}

// API response type from AI search
export interface ApiBoatData {
  Source?: string;
  DocumentID: string;
  BeamMeasure?: string;
  TotalEnginePowerQuantity?: string;
  Price: string | number; // Handle "114900.00 USD" format
  BoatLocation?: {
    BoatCityName?: string;
    BoatCountryID?: string;
    BoatStateCode?: string;
  };
  Model: string;
  Engines?: Array<{
    Make?: string;
    Model?: string;
    Fuel?: string;
    EnginePower?: string;
    Type?: string;
    Year?: number;
    Hours?: number;
  }>;
  ModelYear: number;
  MakeString: string;
  LengthOverall?: string;
  NominalLength?: string;
  Images?: {
    Priority?: string;
    Caption?: string;
    Uri?: string;
  };
  Link?: string;
  BoatClassCode?: string[];
  HullMaterialCode?: string;
  NumberOfCabins?: number;
  NumberOfHeads?: number;
  MaxDraft?: string;
}

// Convert API boat data to YachtProduct
export function convertApiDataToYachtProduct(
  apiData: ApiBoatData,
): YachtProduct {
  // Parse price - handle "114900.00 USD" format
  let price: number | undefined;
  if (typeof apiData.Price === 'string') {
    const priceMatch = apiData.Price.match(/([\d,.]+)/);
    if (priceMatch) {
      price = parseFloat(priceMatch[1].replace(/,/g, ''));
    }
  } else if (typeof apiData.Price === 'number') {
    price = apiData.Price;
  }

  return {
    id: apiData.DocumentID,
    brand_make: apiData.MakeString || 'Unknown Make',
    model: apiData.Model || 'Unknown Model',
    built_year: apiData.ModelYear || 0,
    length: apiData.LengthOverall || apiData.NominalLength || 'N/A',
    number_of_engine: apiData.Engines?.length || 0,
    class: apiData.BoatClassCode?.[0] || 'Power',
    material: apiData.HullMaterialCode || 'Fiberglass',
    number_of_cabin: apiData.NumberOfCabins || 0,
    number_of_heads: apiData.NumberOfHeads || 0,
    beam_size: apiData.BeamMeasure || 'N/A',
    fuel_type: apiData.Engines?.[0]?.Fuel?.toLowerCase() || 'Not specified',
    max_draft: apiData.MaxDraft || 'N/A',
    name: `${apiData.MakeString} ${apiData.Model}`,
    location: apiData.BoatLocation
      ? `${apiData.BoatLocation.BoatCityName || ''}, ${apiData.BoatLocation.BoatStateCode || ''}`
      : 'Location not specified',
    condition: 'Used',
    price: price,
    images: apiData.Images?.Uri ? [apiData.Images.Uri] : [],
    image: apiData.Images?.Uri || '/placeholder-boat.jpg',
    link: apiData.Link || `/search-listing/${apiData.DocumentID}`,
  };
}
