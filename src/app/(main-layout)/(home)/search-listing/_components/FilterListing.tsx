'use client';
import { useSearchResults } from '@/context/SearchResultsContext';
import { postAiQuery } from '@/services/query';
import { FilterState } from '@/types/filter-types';
import { convertApiDataToYachtProduct } from '@/types/product-types-demo';
import { SearchQueryData } from '@/types/search-query-types';
import { useState } from 'react';
import { TbSparkles } from 'react-icons/tb';

const FilterListing = () => {
  const { setSearchResults, setIsSearchActive, queryData, setQueryData } =
    useSearchResults();
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    boatType: '',
    make: '',
    model: '',
    buildYearFrom: '',
    buildYearTo: '',
    priceMin: 12000,
    priceMax: 2250000,
    lengthFrom: '',
    lengthTo: '',
    beamFrom: '',
    beamTo: '',
    numberOfEngines: '',
    numberOfCabins: '',
    numberOfHeads: '',
    additionalUnit: '',
  });

  // Filter options
  const boatTypes = [
    'Yacht',
    'Sailboat',
    'Catamaran',
    'Motor Yacht',
    'Trawler',
    'Sportfish',
  ];
  const makes = [
    'Mercury',
    'Yamaha',
    'Honda',
    'Suzuki',
    'Evinrude',
    'Volvo Penta',
  ];
  const models = ['Volvo', 'Mercruiser', 'Yanmar', 'Cummins', 'Caterpillar'];
  const engineOptions = ['02', '03', '04', '05', '06'];
  const cabinOptions = ['02', '03', '04', '05', '06'];
  const headOptions = ['02', '03', '04', '05', '06'];
  const additionalUnits = [
    'Jet ski',
    'Tender',
    'Kayak',
    'Paddleboard',
    'Dinghy',
  ];

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
      priceMin: 12000,
      priceMax: 2250000,
      lengthFrom: '',
      lengthTo: '',
      beamFrom: '',
      beamTo: '',
      numberOfEngines: '',
      numberOfCabins: '',
      numberOfHeads: '',
      additionalUnit: '',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyFilters = async () => {
    try {
      setIsLoading(true);

      // Build filters object with only non-default values
      const changedFilters: Record<string, string | number> = {};

      if (filters.boatType) changedFilters.boat_type = filters.boatType;
      if (filters.make) changedFilters.make = filters.make;
      if (filters.model) changedFilters.model = filters.model;
      if (filters.buildYearFrom)
        changedFilters.build_year_min = Number(filters.buildYearFrom);
      if (filters.buildYearTo)
        changedFilters.build_year_max = Number(filters.buildYearTo);
      if (filters.priceMin && filters.priceMin !== 12000)
        changedFilters.price_min = filters.priceMin;
      if (filters.priceMax && filters.priceMax !== 2250000)
        changedFilters.price_max = filters.priceMax;
      if (filters.lengthFrom)
        changedFilters.length_min = Number(filters.lengthFrom);
      if (filters.lengthTo)
        changedFilters.length_max = Number(filters.lengthTo);
      if (filters.beamFrom) changedFilters.beam_min = Number(filters.beamFrom);
      if (filters.beamTo) changedFilters.beam_max = Number(filters.beamTo);
      if (filters.numberOfEngines)
        changedFilters.number_of_engine = Number(filters.numberOfEngines);
      if (filters.numberOfCabins)
        changedFilters.number_of_cabin = Number(filters.numberOfCabins);
      if (filters.numberOfHeads)
        changedFilters.number_of_heads = Number(filters.numberOfHeads);
      if (filters.additionalUnit)
        changedFilters.additional_unit = filters.additionalUnit;

      // Build query data
      const searchQueryData: SearchQueryData = {
        query: queryData?.query || '',
        filters: {
          boat_type: changedFilters.boat_type as string,
          make: changedFilters.make as string,
          model: changedFilters.model as string,
          build_year_min: changedFilters.build_year_min as number,
          build_year_max: changedFilters.build_year_max as number,
          price_min: changedFilters.price_min as number,
          price_max: changedFilters.price_max as number,
          length_min: changedFilters.length_min as number,
          length_max: changedFilters.length_max as number,
          beam_min: changedFilters.beam_min as number,
          beam_max: changedFilters.beam_max as number,
          number_of_engine: changedFilters.number_of_engine as number,
          number_of_cabin: changedFilters.number_of_cabin as number,
          number_of_heads: changedFilters.number_of_heads as number,
          additional_unit: changedFilters.additional_unit as string,
        },
      };

      // Call AI query API
      const response = await postAiQuery({ queryData: searchQueryData });

      // Convert and update context
      const yachtProducts = response.map(convertApiDataToYachtProduct);

      setSearchResults(yachtProducts);
      setIsSearchActive(true);
      setQueryData(searchQueryData);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 h-full top-4">
      {/* Header */}
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
        {/* Boat Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Boat Type
          </label>
          <select
            value={filters.boatType}
            onChange={(e) => handleInputChange('boatType', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Yacht</option>
            {boatTypes?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Mercury</option>
            {makes?.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
          <select
            value={filters.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Volvo</option>
            {models?.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Build Year */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Build Year
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="2005"
              value={filters.buildYearFrom}
              onChange={(e) =>
                handleInputChange('buildYearFrom', e.target.value)
              }
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="2008"
              value={filters.buildYearTo}
              onChange={(e) => handleInputChange('buildYearTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="5000000"
              step="1000"
              value={filters.priceMin}
              onChange={(e) =>
                handleInputChange('priceMin', Number(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-500 font-semibold">
                {formatPrice(filters.priceMin)}
              </span>
              <span className="text-cyan-500 font-semibold">
                {formatPrice(filters.priceMax)}
              </span>
            </div>
          </div>
        </div>

        {/* Lengths Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lengths Range (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="20"
              value={filters.lengthFrom}
              onChange={(e) => handleInputChange('lengthFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="40"
              value={filters.lengthTo}
              onChange={(e) => handleInputChange('lengthTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Beam Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beam Size (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="20"
              value={filters.beamFrom}
              onChange={(e) => handleInputChange('beamFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="40"
              value={filters.beamTo}
              onChange={(e) => handleInputChange('beamTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Number of Engines */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Engine
          </label>
          <select
            value={filters.numberOfEngines}
            onChange={(e) =>
              handleInputChange('numberOfEngines', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {engineOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Cabins */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Cabin
          </label>
          <select
            value={filters.numberOfCabins}
            onChange={(e) =>
              handleInputChange('numberOfCabins', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {cabinOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Heads */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Heads
          </label>
          <select
            value={filters.numberOfHeads}
            onChange={(e) => handleInputChange('numberOfHeads', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {headOptions?.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Unit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Unit
          </label>
          <select
            value={filters.additionalUnit}
            onChange={(e) =>
              handleInputChange('additionalUnit', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Jet ski</option>
            {additionalUnits?.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Filters Button */}
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
