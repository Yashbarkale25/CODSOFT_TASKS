function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-7 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-300"></div>

        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
      </div>

      <div className="mt-8">
        <div className="h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
}

export default JobCardSkeleton;