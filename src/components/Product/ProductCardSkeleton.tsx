const ProductCardSkeleton = () => (
  <div className="relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md overflow-hidden">
    <div className="w-full aspect-[4/2.6] bg-gray-200 animate-pulse" />
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 pb-2 sm:pb-3 md:pb-4 lg:pb-5">
      <div className="h-3 w-24 bg-gray-200 animate-pulse rounded mb-2 sm:mb-3" />
      <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded mb-3 sm:mb-4" />
      <div className="flex flex-row items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10 border-y border-gray-100 py-1.5 sm:py-2 md:py-3 lg:py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 space-y-1">
            <div className="h-3 w-10 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-14 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 md:p-4 lg:p-5">
      <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
    </div>
  </div>
);

export default ProductCardSkeleton;
