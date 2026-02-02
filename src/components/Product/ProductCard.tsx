import { YachtProduct } from '@/types/product-types-demo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

interface ProductCardProps {
  product: YachtProduct;
  isPremium: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isPremium }) => {
  const formatPrice = (price: number | undefined) => {
    if (!price || price === 0) {
      return 'Price on request';
    }
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <Link
      href={product.link || `/search-listing/${product.id || 2}`}
      className="relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Image Section with Bookmark */}
      <div className="relative w-full aspect-[4/2.6] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          height={500}
          width={900}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
        {isPremium && (
          <button
            className="absolute -top-1 right-2 sm:right-3 lg:right-4"
            aria-label="Bookmark"
          >
            <BsBookmarkFill className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-accent" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-5 pb-2 sm:pb-3 md:pb-4 lg:pb-5">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 mb-1 sm:mb-2 md:mb-3">
          <IoLocationOutline className="text-xs sm:text-sm md:text-base lg:text-lg text-black flex-shrink-0" />
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal truncate">
            {product.location}
          </span>
        </div>

        {/* Product Name - Truncated */}
        <h3
          className="truncate text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Specs Grid */}
        <div className="flex flex-row items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10 border-y border-gray-200 py-1.5 sm:py-2 md:py-3 lg:py-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">
              Make
            </p>
            <p
              className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-gray-900 truncate"
              title={product.brand_make}
            >
              {product.brand_make}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">
              Model
            </p>
            <p
              className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-gray-900 truncate"
              title={product.model}
            >
              {product.model}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">
              Year
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-gray-900">
              {product.built_year}
            </p>
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 md:p-4 lg:p-5">
        <p
          className="text-xs sm:text-sm md:text-base lg:text-xl font-semibold text-primary truncate"
          title={`Price: ${formatPrice(product.price)}`}
        >
          Price: {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
