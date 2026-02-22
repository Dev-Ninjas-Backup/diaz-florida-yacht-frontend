const DockSideBlogSkeleton = () => (
  <div className="my-20 space-y-10">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="text-left space-y-3 max-w-3xl">
        <div className="h-10 w-80 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-5 w-[480px] max-w-full bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="h-11 w-28 bg-gray-200 animate-pulse rounded-xl" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse rounded-t-2xl" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3 mt-3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DockSideBlogSkeleton;
