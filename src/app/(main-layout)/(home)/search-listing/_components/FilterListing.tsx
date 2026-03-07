/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useSearchResults } from '@/context/SearchResultsContext';
import {
  FilterOptions,
  getFilterOptions,
  getFilteredBoats,
} from '@/services/boats/filter-boats';
import { FilterState } from '@/types/filter-types';
import { convertApiDataToYachtProduct } from '@/types/product-types-demo';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { TbSparkles } from 'react-icons/tb';

const FilterListing = () => {
  const { setSearchResults, setIsSearchActive } = useSearchResults();
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    makes: [],
    models: [],
    years: [],
    cities: [],
    states: [],
    classes: [],
  });

  const [filters, setFilters] = useState<FilterState>({
    boatType: '',
    make: '',
    model: '',
    buildYearFrom: '',
    buildYearTo: '',
    priceMin: '',
    priceMax: '',
    lengthFrom: '',
    lengthTo: '',
    beamFrom: '',
    beamTo: '',
    numberOfEngines: '',
    numberOfCabins: '',
    numberOfHeads: '',
    additionalUnit: '',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState({
    boatType: '',
    make: '',
    model: '',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const engineOptions = ['1', '2', '3', '4', '5', '6'];
  const cabinOptions = ['1', '2', '3', '4', '5', '6'];
  const headOptions = ['1', '2', '3', '4', '5', '6'];

  const handleInputChange = (
    field: keyof FilterState,
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      boatType: '',
      make: '',
      model: '',
      buildYearFrom: '',
      buildYearTo: '',
      priceMin: '',
      priceMax: '',
      lengthFrom: '',
      lengthTo: '',
      beamFrom: '',
      beamTo: '',
      numberOfEngines: '',
      numberOfCabins: '',
      numberOfHeads: '',
      additionalUnit: '',
    });

    setSearchResults(null);
    setIsSearchActive(false);
  };

  const handleApplyFilters = async () => {
    try {
      setIsLoading(true);

      const filterParams: any = {
        page: 1,
        limit: 100,
      };

      if (filters.make) filterParams.make = filters.make;
      if (filters.model) filterParams.model = filters.model;
      if (filters.boatType) filterParams.class = filters.boatType;
      if (filters.buildYearFrom)
        filterParams.buildYearStart = Number(filters.buildYearFrom);
      if (filters.buildYearTo)
        filterParams.buildYearEnd = Number(filters.buildYearTo);
      if (filters.priceMin && Number(filters.priceMin) > 0)
        filterParams.priceStart = Number(filters.priceMin);
      if (filters.priceMax && Number(filters.priceMax) > 0)
        filterParams.priceEnd = Number(filters.priceMax);
      if (filters.lengthFrom)
        filterParams.lengthStart = Number(filters.lengthFrom);
      if (filters.lengthTo) filterParams.lengthEnd = Number(filters.lengthTo);
      if (filters.beamFrom)
        filterParams.beamSizeStart = Number(filters.beamFrom);
      if (filters.beamTo) filterParams.beamSizeEnd = Number(filters.beamTo);
      if (filters.numberOfEngines)
        filterParams.enginesNumber = Number(filters.numberOfEngines);
      if (filters.numberOfCabins)
        filterParams.cabinsNumber = Number(filters.numberOfCabins);
      if (filters.numberOfHeads)
        filterParams.headsNumber = Number(filters.numberOfHeads);

      const response = await getFilteredBoats(filterParams);

      if (response.success && response.data) {
        const yachtProducts = response.data.map((boat: any) =>
          convertApiDataToYachtProduct(boat),
        );

        setSearchResults(yachtProducts);
        setIsSearchActive(true);
      }
    } catch (error) {
      console.error('Error applying filters:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 h-full top-4">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Filter Listing
        </h2>
        <button
          onClick={handleReset}
          className="text-cyan-500 hover:text-cyan-600 font-medium text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5 pb-10">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Boat Class
          </label>
          <div className="relative">
            <input
              type="text"
              value={openDropdown === 'boatType' ? searchTerms.boatType : filters.boatType}
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, boatType: e.target.value });
                if (openDropdown !== 'boatType') setOpenDropdown('boatType');
              }}
              onFocus={() => {
                setOpenDropdown('boatType');
                setSearchTerms({ ...searchTerms, boatType: '' });
              }}
              placeholder="Search Class"
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-8"
            />
            <button
              onClick={() => {
                if (openDropdown === 'boatType') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, boatType: '' });
                } else {
                  setOpenDropdown('boatType');
                  setSearchTerms({ ...searchTerms, boatType: '' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <IoIosArrowDown className={`text-gray-500 transition-transform ${openDropdown === 'boatType' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {openDropdown === 'boatType' && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filterOptions.classes?.filter((type) =>
                type.toLowerCase().includes(searchTerms.boatType.toLowerCase())
              ).length > 0 ? (
                filterOptions.classes
                  ?.filter((type) =>
                    type.toLowerCase().includes(searchTerms.boatType.toLowerCase())
                  )
                  .map((type, index) => (
                    <button
                      key={`${type}-${index}`}
                      onClick={() => {
                        handleInputChange('boatType', type);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, boatType: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.boatType === type ? 'bg-cyan-100 text-cyan-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))
              ) : (
                <div className="px-3 py-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Make
          </label>
          <div className="relative">
            <input
              type="text"
              value={openDropdown === 'make' ? searchTerms.make : filters.make}
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, make: e.target.value });
                if (openDropdown !== 'make') setOpenDropdown('make');
              }}
              onFocus={() => {
                setOpenDropdown('make');
                setSearchTerms({ ...searchTerms, make: '' });
              }}
              placeholder="Search Make"
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-8"
            />
            <button
              onClick={() => {
                if (openDropdown === 'make') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, make: '' });
                } else {
                  setOpenDropdown('make');
                  setSearchTerms({ ...searchTerms, make: '' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <IoIosArrowDown className={`text-gray-500 transition-transform ${openDropdown === 'make' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {openDropdown === 'make' && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filterOptions.makes?.filter((make) =>
                make.toLowerCase().includes(searchTerms.make.toLowerCase())
              ).length > 0 ? (
                filterOptions.makes
                  ?.filter((make) =>
                    make.toLowerCase().includes(searchTerms.make.toLowerCase())
                  )
                  .map((make, index) => (
                    <button
                      key={`${make}-${index}`}
                      onClick={() => {
                        handleInputChange('make', make);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, make: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.make === make ? 'bg-cyan-100 text-cyan-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {make}
                    </button>
                  ))
              ) : (
                <div className="px-3 py-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
          <div className="relative">
            <input
              type="text"
              value={openDropdown === 'model' ? searchTerms.model : filters.model}
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, model: e.target.value });
                if (openDropdown !== 'model') setOpenDropdown('model');
              }}
              onFocus={() => {
                setOpenDropdown('model');
                setSearchTerms({ ...searchTerms, model: '' });
              }}
              placeholder="Search Model"
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-8"
            />
            <button
              onClick={() => {
                if (openDropdown === 'model') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, model: '' });
                } else {
                  setOpenDropdown('model');
                  setSearchTerms({ ...searchTerms, model: '' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <IoIosArrowDown className={`text-gray-500 transition-transform ${openDropdown === 'model' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {openDropdown === 'model' && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filterOptions.models?.filter((model) =>
                model.toLowerCase().includes(searchTerms.model.toLowerCase())
              ).length > 0 ? (
                filterOptions.models
                  ?.filter((model) =>
                    model.toLowerCase().includes(searchTerms.model.toLowerCase())
                  )
                  .map((model, index) => (
                    <button
                      key={`${model}-${index}`}
                      onClick={() => {
                        handleInputChange('model', model);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, model: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.model === model ? 'bg-cyan-100 text-cyan-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {model}
                    </button>
                  ))
              ) : (
                <div className="px-3 py-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Build Year
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="2000"
              value={filters.buildYearFrom}
              onChange={(e) =>
                handleInputChange('buildYearFrom', e.target.value)
              }
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="2026"
              value={filters.buildYearTo}
              onChange={(e) => handleInputChange('buildYearTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min Price"
              min="0"
              value={filters.priceMin || ''}
              onChange={(e) =>
                handleInputChange('priceMin', Number(e.target.value))
              }
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="Max Price"
              min="0"
              value={filters.priceMax || ''}
              onChange={(e) =>
                handleInputChange('priceMax', Number(e.target.value))
              }
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lengths Range (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.lengthFrom}
              onChange={(e) => handleInputChange('lengthFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="500"
              value={filters.lengthTo}
              onChange={(e) => handleInputChange('lengthTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beam Size (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.beamFrom}
              onChange={(e) => handleInputChange('beamFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="150"
              value={filters.beamTo}
              onChange={(e) => handleInputChange('beamTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Engine
          </label>
          <select
            value={filters.numberOfEngines}
            onChange={(e) =>
              handleInputChange('numberOfEngines', e.target.value)
            }
            aria-label="Select number of engines"
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Select</option>
            {engineOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Cabin
          </label>
          <select
            value={filters.numberOfCabins}
            onChange={(e) =>
              handleInputChange('numberOfCabins', e.target.value)
            }
            aria-label="Select number of cabins"
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Select</option>
            {cabinOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Heads
          </label>
          <select
            value={filters.numberOfHeads}
            onChange={(e) => handleInputChange('numberOfHeads', e.target.value)}
            aria-label="Select number of heads"
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Select</option>
            {headOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Applying...
            </>
          ) : (
            <>
              <TbSparkles className="text-xl" />
              Apply Filters
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FilterListing;
