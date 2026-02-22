const PopularCategoriesSkeleton = () => (
  <div>
    <div className="h-10 w-96 max-w-full bg-gray-200 animate-pulse rounded-lg mx-auto" />
    <div className="flex flex-wrap justify-center items-center gap-7 2xl:gap-10 my-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  </div>
);

export default PopularCategoriesSkeleton;
