'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getAllBoats } from '@/services/boats';
import { YachtProduct } from '@/types/product-types-demo';
import { useEffect, useMemo, useState } from 'react';

interface ApiBoatResponse {
  DocumentID: string;
  MakeString?: string;
  Model?: string;
  ModelYear?: number;
  Price?: string | number;
  BeamMeasure?: string;
  BoatLocation?: {
    BoatCityName?: string;
    BoatStateCode?: string;
  };
  Engines?: Array<{
    Fuel?: string;
  }>;
  LengthOverall?: string;
  NominalLength?: string;
  Images?: Array<{
    Uri?: string;
  }>;
  Link?: string;
  BoatClassCode?: string[];
  HullMaterialCode?: string;
  NumberOfCabins?: number;
  NumberOfHeads?: number;
  MaxDraft?: string;
}

const AllListing = () => {
  const { searchResults, isSearchActive } = useSearchResults();
  const [page, setPage] = useState(1);
  const [initialBoats, setInitialBoats] = useState<YachtProduct[]>([]);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const perPage = 9;

  useEffect(() => {
    const fetchInitialBoats = async () => {
      if (!isSearchActive) {
        setIsLoadingBoats(true);
        try {
          const response = await getAllBoats({ page: 1, limit: 100 });
          if (response?.success && response?.data) {
            const convertedBoats: YachtProduct[] = response.data.map(
              (boat: ApiBoatResponse) => {
                let price: number | undefined;
                if (typeof boat.Price === 'string') {
                  const priceMatch = boat.Price.match(/([\d,.]+)/);
                  if (priceMatch) {
                    price = parseFloat(priceMatch[1].replace(/,/g, ''));
                  }
                } else if (typeof boat.Price === 'number') {
                  price = boat.Price;
                }

                return {
                  id: boat.DocumentID,
                  brand_make: boat.MakeString || 'Unknown',
                  model: boat.Model || 'Unknown',
                  built_year: boat.ModelYear || 0,
                  length: boat.LengthOverall || boat.NominalLength || 'N/A',
                  number_of_engine: boat.Engines?.length || 0,
                  class: boat.BoatClassCode?.[0] || 'Power',
                  material: boat.HullMaterialCode || 'Fiberglass',
                  number_of_cabin: boat.NumberOfCabins || 0,
                  number_of_heads: boat.NumberOfHeads || 0,
                  beam_size: boat.BeamMeasure || 'N/A',
                  fuel_type:
                    boat.Engines?.[0]?.Fuel?.toLowerCase() || 'Not specified',
                  max_draft: boat.MaxDraft || 'N/A',
                  name: `${boat.MakeString || 'Unknown'} ${boat.Model || 'Unknown'}`,
                  location: boat.BoatLocation
                    ? `${boat.BoatLocation.BoatCityName || ''}, ${boat.BoatLocation.BoatStateCode || ''}`
                    : 'Location not specified',
                  condition: 'Used',
                  price: price,
                  images: boat.Images?.[0]?.Uri ? [boat.Images[0].Uri] : [],
                  image: boat.Images?.[0]?.Uri || '/placeholder-boat.jpg',
                  link: boat.Link || `/search-listing/${boat.DocumentID}`,
                };
              },
            );
            setInitialBoats(convertedBoats);
          }
        } catch (error) {
          console.error('Error fetching initial boats:', error);
        } finally {
          setIsLoadingBoats(false);
        }
      }
    };

    fetchInitialBoats();
  }, [isSearchActive]);

  const dataToDisplay =
    isSearchActive && searchResults ? searchResults : initialBoats;
  const totalItems = dataToDisplay.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return dataToDisplay.slice(start, start + perPage);
  }, [page, dataToDisplay]);

  if (isLoadingBoats) {
    return (
      <div>
        <div className="h-5 w-48 bg-gray-200 animate-pulse rounded mb-3" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-400 font-medium text-sm md:text-lg">
        Showing {(page - 1) * perPage + 1} to{' '}
        {Math.min(page * perPage, totalItems)} of {totalItems} results
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-3">
        {pageItems?.map((data, idx) => (
          <ProductCard isPremium={false} key={idx} product={data} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default AllListing;
