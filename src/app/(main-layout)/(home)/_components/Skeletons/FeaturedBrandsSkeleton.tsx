const FeaturedBrandsSkeleton = () => (
  <div className="py-20">
    <div className="h-10 w-96 max-w-full bg-gray-200 animate-pulse rounded-lg mx-auto" />
    <div className="space-y-10 my-20 px-4 sm:px-8 md:px-16 lg:px-[10%]">
      <div className="flex items-center gap-10 md:gap-14 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 bg-gray-200 animate-pulse rounded shrink-0" />
        ))}
      </div>
      <div className="flex items-center gap-10 md:gap-14 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 bg-gray-200 animate-pulse rounded shrink-0" />
        ))}
      </div>
    </div>
  </div>
);

export default FeaturedBrandsSkeleton;
