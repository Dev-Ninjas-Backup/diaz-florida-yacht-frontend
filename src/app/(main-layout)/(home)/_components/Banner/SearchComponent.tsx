'use client';
import { useSearchResults } from '@/context/SearchResultsContext';
import { postAiQuery } from '@/services/query';
import {
  ApiBoatData,
  convertApiDataToYachtProduct,
} from '@/types/product-types-demo';
import { SearchQueryData } from '@/types/search-query-types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { TbSparkles } from 'react-icons/tb';

const INITIAL_VALUES = {
  year: '2008',
  make: 'Viking (CCV)',
  model: '80 Enclosed',
  length: '60',
  maxPrice: '$22,000',
  boatType: 'Flybridge',
  location: 'Florida',
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
};

const SearchComponent = () => {
  const router = useRouter();
  const { setSearchResults, setIsSearchActive, setQueryData } =
    useSearchResults();

  const [year, setYear] = useState(INITIAL_VALUES.year);
  const [make, setMake] = useState(INITIAL_VALUES.make);
  const [model, setModel] = useState(INITIAL_VALUES.model);
  const [length, setLength] = useState(INITIAL_VALUES.length);
  const [maxPrice, setMaxPrice] = useState(INITIAL_VALUES.maxPrice);
  const [boatType, setBoatType] = useState(INITIAL_VALUES.boatType);
  const [location, setLocation] = useState(INITIAL_VALUES.location);
  const [aiPrompt, setAiPrompt] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const makes = [
    'Viking (CCV)',
    'Sea Ray',
    'Boston Whaler',
    'Bayliner',
    'Grady-White',
  ];
  const models = ['80 Enclosed', '75 Sport', '60 Convertible', '55 Express'];
  const boatTypes = [
    'Flybridge',
    'Cruiser',
    'Sportfish',
    'Express',
    'Center Console',
  ];
  const locations = [
    'Florida',
    'California',
    'Texas',
    'New York',
    'Massachusetts',
  ];

  // Close dropdown when clicking outside
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

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const askAiQuery = async () => {
    if (!aiPrompt.trim()) return;

    setIsLoading(true);
    try {
      // Build filters - only send changed values
      const changedFilters: Record<string, string | number> = {};

      if (boatType && boatType !== INITIAL_VALUES.boatType) {
        changedFilters.boat_type = boatType;
      }
      if (make && make !== INITIAL_VALUES.make) {
        changedFilters.make = make;
      }
      if (model && model !== INITIAL_VALUES.model) {
        changedFilters.model = model;
      }
      if (year && year !== INITIAL_VALUES.year) {
        const yearNum = parseInt(year);
        if (!isNaN(yearNum)) {
          changedFilters.build_year_min = yearNum;
          changedFilters.build_year_max = yearNum;
        }
      }
      if (maxPrice && maxPrice !== INITIAL_VALUES.maxPrice) {
        const priceNum = parseFloat(maxPrice.replace(/[$,]/g, ''));
        if (!isNaN(priceNum)) {
          changedFilters.price_max = priceNum;
        }
      }
      if (length && length !== INITIAL_VALUES.length) {
        const lengthNum = parseFloat(length);
        if (!isNaN(lengthNum)) {
          changedFilters.length_min = lengthNum;
          changedFilters.length_max = lengthNum;
        }
      }

      const queryData: SearchQueryData = {
        query: aiPrompt,
        filters: {
          boat_type: (changedFilters.boat_type as string) ?? null,
          make: (changedFilters.make as string) ?? null,
          model: (changedFilters.model as string) ?? null,
          build_year_min: (changedFilters.build_year_min as number) ?? null,
          build_year_max: (changedFilters.build_year_max as number) ?? null,
          price_min: (changedFilters.price_min as number) ?? null,
          price_max: (changedFilters.price_max as number) ?? null,
          length_min: (changedFilters.length_min as number) ?? null,
          length_max: (changedFilters.length_max as number) ?? null,
          beam_min: (changedFilters.beam_min as number) ?? null,
          beam_max: (changedFilters.beam_max as number) ?? null,
          number_of_engine: (changedFilters.number_of_engine as number) ?? null,
          number_of_cabin: (changedFilters.number_of_cabin as number) ?? null,
          number_of_heads: (changedFilters.number_of_heads as number) ?? null,
          additional_unit: (changedFilters.additional_unit as string) ?? null,
        },
      };

      console.log('AI Query Data:', queryData);

      const aiResponse = await postAiQuery({ queryData });
      if (aiResponse?.success && aiResponse?.data) {
        const convertedData: ApiBoatData[] = aiResponse.data;
        const yachtProducts = convertedData.map((boat) =>
          convertApiDataToYachtProduct(boat),
        );

        setSearchResults(yachtProducts);
        setIsSearchActive(true);
        setQueryData(queryData);
        router.push('/search-listing');
      }
    } catch (error) {
      console.error('AI Search Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const DropdownField = ({
    label,
    value,
    options,
    onChange,
    name,
    isLast = false,
  }: {
    label: string;
    value: string;
    options: (string | number)[];
    onChange: (val: string) => void;
    name: string;
    isLast?: boolean;
  }) => (
    <div
      className={`${!isLast ? ' border-gray-200' : ''} p-2 xl:p-3 2xl:p-4 hover:bg-gray-50 transition-colors relative`}
    >
      <button
        onClick={() => toggleDropdown(name)}
        className="w-full text-left text-sm md:text-base"
      >
        <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">
          {label}{' '}
          <IoIosArrowDown
            className={`inline ml-1 text-gray-500  transition-transform ${openDropdown === name ? 'rotate-180' : ''}`}
          />
        </label>
        <div className="text-gray-400 ">{value}</div>
      </button>

      {openDropdown === name && (
        <div className="absolute text-sm md:text-base bottom-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-100 max-h-60 overflow-y-auto">
          {options?.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option.toString());
                setOpenDropdown(null);
              }}
              className={`w-full text-left text-sm md:text-base px-2 py-1 md:px-4 md:py-2 hover:bg-blue-50 transition-colors ${
                value === option.toString()
                  ? 'bg-blue-100 text-blue-700 font-medium '
                  : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full mx-auto" ref={dropdownRef}>
      {/* Main Search Container */}
      <div className="bg-white rounded-3xl shadow-lg overflow-visible p-2 xl:p-3 2xl:p-6 relative">
        <div className="absolute -top-5 right-4 text-gray-700  sm:hidden bg-white rounded-full p-1 cursor-pointer shadow-md">
          <IoIosArrowUp
            onClick={() => setFilterOpen(!filterOpen)}
            className={`${filterOpen ? 'rotate-180' : ''} transition-transform text-2xl`}
          />
        </div>
        {/* Filters Row */}
        <div
          className={`${filterOpen ? 'grid' : 'hidden'} sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-0 pb-2`}
        >
          {/* Year */}
          <DropdownField
            label="Year"
            value={year}
            options={years}
            onChange={setYear}
            name="year"
          />

          {/* Make */}
          <DropdownField
            label="Make"
            value={make}
            options={makes}
            onChange={setMake}
            name="make"
          />

          {/* Model */}
          <DropdownField
            label="Model"
            value={model}
            options={models}
            onChange={setModel}
            name="model"
          />

          {/* Length */}
          <div className=" border-gray-200 p-2 xl:p-3 2xl:p-4 hover:bg-gray-50 transition-colors">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (ft)
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full text-sm md:text-base text-gray-900 font-normal focus:outline-none bg-transparent"
              placeholder="60"
            />
          </div>

          {/* Max Price */}
          <div className=" border-gray-200 p-2 xl:p-3 2xl:p-4 hover:bg-gray-50 transition-colors">
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
              Max Price ($)
            </label>
            <input
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-sm md:text-base text-gray-900 font-normal focus:outline-none bg-transparent placeholder:text-sm md:placeholder:text-base"
              placeholder="$22,000"
            />
          </div>

          {/* Boat Type */}
          <DropdownField
            label="Boat Type"
            value={boatType}
            options={boatTypes}
            onChange={setBoatType}
            name="boatType"
          />

          {/* Location */}
          <DropdownField
            label="Location"
            value={location}
            options={locations}
            onChange={setLocation}
            name="location"
            isLast={true}
          />
        </div>

        {/* AI Search Row */}
        <div className="flex flex-col sm:flex-row md:gap-3 items-stretch sm:items-center md:border-t border-gray-200 md:pt-4">
          <div className="flex-1 relative bg-gray-100 rounded-2xl px-2 py-2 md:py-3">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: find me a Viking for sale from 2005 to 2008"
              className="w-full md:px-3 focus:outline-none bg-transparent text-gray-700 placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-base"
            />
            <button
              className="absolute top-1/2 mx-3 text-sm md:text-base transform -translate-y-1/2 right-0 px-2 md:px-3 py-1 md:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={askAiQuery}
              disabled={isLoading}
            >
              <TbSparkles
                className={`text-sm md:text-lg ${isLoading ? 'animate-spin' : ''}`}
              />
              {isLoading ? 'Searching...' : 'Ask AI'}
            </button>
          </div>

          <button className="px-8 py-2 md:py-3 bg-secondary hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors hidden items-center justify-center gap-2 whitespace-nowrap shadow-md md:flex">
            <IoSearch className="md:text-lg" />
            Find My Boat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
