const PremiumDealsSkeleton = () => (
  <div className="my-20 space-y-10">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="space-y-3 max-w-3xl">
        <div className="h-10 w-80 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-[500px] max-w-full bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gray-200 animate-pulse" />
        <div className="w-11 h-11 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse rounded-t-2xl" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PremiumDealsSkeleton;
