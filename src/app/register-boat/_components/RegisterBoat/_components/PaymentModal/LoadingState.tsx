export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      <p className="text-gray-600 text-sm">Loading payment form...</p>
      <p className="text-gray-400 text-xs">Please wait a moment</p>
    </div>
  );
};
