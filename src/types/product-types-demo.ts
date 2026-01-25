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
  document_id: string;
  make: string;
  model: string;
  model_year: number;
  price: number;
  location?: {
    BoatCityName?: string;
    BoatCountryID?: string;
    BoatStateCode?: string;
  };
  images?: Array<{
    Priority: number;
    Uri: string;
    LastModifiedDateTime?: string;
  }>;
  link?: string;
  // Legacy fields for backward compatibility
  Source?: string;
  DocumentID?: string;
  BeamMeasure?: string;
  TotalEnginePowerQuantity?: string;
  Price?: string | number;
  BoatLocation?: {
    BoatCityName?: string;
    BoatCountryID?: string;
    BoatStateCode?: string;
  };
  Model?: string;
  Engines?: Array<{
    Make?: string;
    Model?: string;
    Fuel?: string;
    EnginePower?: string;
    Type?: string;
    Year?: number;
    Hours?: number;
  }>;
  ModelYear?: number;
  MakeString?: string;
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
  // Handle both new lowercase format and legacy format
  const documentId = apiData.document_id || apiData.DocumentID || '';
  const make = apiData.make || apiData.MakeString || 'Unknown Make';
  const model = apiData.model || apiData.Model || 'Unknown Model';
  const modelYear = apiData.model_year || apiData.ModelYear || 0;
  const location = apiData.location || apiData.BoatLocation;
  const link = apiData.link || apiData.Link || `/search-listing/${documentId}`;

  // Parse price - handle both new number format and legacy "114900.00 USD" format
  let price: number | undefined;
  if (typeof apiData.price === 'number') {
    price = apiData.price;
  } else if (typeof apiData.Price === 'string') {
    const priceMatch = apiData.Price.match(/([\d,.]+)/);
    if (priceMatch) {
      price = parseFloat(priceMatch[1].replace(/,/g, ''));
    }
  } else if (typeof apiData.Price === 'number') {
    price = apiData.Price;
  }

  // Handle images - prioritize new format, sort by Priority (ascending)
  let imageUrls: string[] = [];
  let primaryImage = 'https://via.placeholder.com/400x300?text=No+Image';

  if (Array.isArray(apiData.images) && apiData.images.length > 0) {
    // New format with Priority field
    const sortedImages = [...apiData.images].sort(
      (a, b) => a.Priority - b.Priority,
    );
    imageUrls = sortedImages.map((img) => img.Uri).filter(Boolean);
    primaryImage = imageUrls[0] || primaryImage;
  } else if (Array.isArray(apiData.Images)) {
    // Legacy format
    imageUrls = apiData.Images.map((img) => img.Uri).filter(Boolean);
    primaryImage = imageUrls[0] || primaryImage;
  }

  return {
    id: documentId,
    brand_make: make,
    model: model,
    built_year: modelYear,
    length: apiData.LengthOverall || apiData.NominalLength || 'N/A',
    number_of_engine: apiData.Engines?.length || 0,
    class: apiData.BoatClassCode?.[0] || 'Power',
    material: apiData.HullMaterialCode || 'Fiberglass',
    number_of_cabin: apiData.NumberOfCabins || 0,
    number_of_heads: apiData.NumberOfHeads || 0,
    beam_size: apiData.BeamMeasure || 'N/A',
    fuel_type: apiData.Engines?.[0]?.Fuel?.toLowerCase() || 'Not specified',
    max_draft: apiData.MaxDraft || 'N/A',
    name: `${make} ${model}`,
    location: location
      ? `${location.BoatCityName || ''}, ${location.BoatStateCode || ''}`
      : 'Location not specified',
    condition: 'Used',
    price: price,
    images: imageUrls,
    image: primaryImage,
    link: link,
  };
}
