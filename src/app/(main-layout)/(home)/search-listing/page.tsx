'use client';
import banner from '@/assets/search-listing-image/banner.jpg';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { useSearchResults } from '@/context/SearchResultsContext';
import { postAiQuery } from '@/services/query';
import {
  ApiBoatData,
  convertApiDataToYachtProduct,
} from '@/types/product-types-demo';
import { SearchQueryData } from '@/types/search-query-types';
import { useEffect, useState } from 'react';
import { TbSparkles } from 'react-icons/tb';
import AllListing from './_components/AllListing';
import FilterListing from './_components/FilterListing';

const SearchListingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { queryData, setSearchResults, setIsSearchActive, setQueryData } =
    useSearchResults();
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryData?.query) {
      setSearchInput(queryData.query);
    }
  }, [queryData]);

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchResults(null);
    setIsSearchActive(false);
    setQueryData(null);
  };

  const handleAskAI = async () => {
    if (!searchInput.trim()) {
      setSearchResults(null);
      setIsSearchActive(false);
      setQueryData(null);
      return;
    }

    setIsLoading(true);
    try {
      const updatedQueryData: SearchQueryData = {
        query: searchInput,
        limit: 20,
      };

      const aiResponse = await postAiQuery({ queryData: updatedQueryData });

      if (
        aiResponse?.data &&
        Array.isArray(aiResponse.data) &&
        !aiResponse.error
      ) {
        const convertedData: ApiBoatData[] = aiResponse.data;
        const yachtProducts = convertedData.map((boat) =>
          convertApiDataToYachtProduct(boat),
        );

        setSearchResults(yachtProducts);
        setIsSearchActive(true);
        setQueryData(updatedQueryData);
      } else if (aiResponse?.error) {
        console.error('AI Query returned error:', aiResponse.error);
        setSearchResults(null);
        setIsSearchActive(false);
      }
    } catch (error) {
      console.error('AI Search Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center pt-10">
          <h1 className="text-white text-xl md:text-3xl xl:text-4xl 2xl:text-5xl uppercase font-bold md:tracking-[5px]">
            search FROM LISTING
          </h1>
          <div className="bg-white p-1 xl:p-2 2xl:p-3 rounded-2xl  w-full flex items-center gap-2 md:gap-5 mt-5">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 md:py-3 placeholder:text-sm md:placeholder:text-base rounded-lg focus:outline-none w-full bg-gray-100"
            />
            {searchInput.length > 0 && (
              <button
                onClick={handleClearSearch}
                className="text-gray-500 hover:text-gray-700 px-2"
              >
                ✕
              </button>
            )}
            <button
              onClick={handleAskAI}
              disabled={isLoading}
              className="bg-secondary text-sm md:text-base text-white px-2 md:px-4 py-2 md:py-3 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 min-w-max active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <TbSparkles className={isLoading ? 'animate-spin' : ''} />
              <span>{isLoading ? 'Searching...' : 'Ask AI'}</span>
            </button>
          </div>
        </div>
      </CustomBanner>

      <CustomContainer>
        <div className="md:hidden my-4 flex justify-end">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-10 py-4 h-full">
          <div className="hidden md:block w-1/4 h-full">
            <FilterListing />
          </div>
          <div className="w-full md:w-3/4">
            <AllListing />
          </div>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-900 font-semibold"
                >
                  ✕
                </button>
              </div>
              <FilterListing />
            </div>
          </div>
        )}
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

export default SearchListingPage;
