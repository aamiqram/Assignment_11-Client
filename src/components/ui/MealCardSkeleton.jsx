const MealCardSkeleton = () => (
  <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden animate-pulse h-full">
    {/* Image Skeleton */}
    <div className="h-48 bg-neutral-200 dark:bg-neutral-700"></div>

    <div className="p-6 space-y-4">
      {/* Title Skeleton */}
      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
      </div>

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
      </div>

      {/* Chef Info Skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="flex-1">
          <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mb-1"></div>
          <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>

      {/* Location Skeleton */}
      <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>

      {/* Button Skeleton */}
      <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl"></div>
    </div>
  </div>
);

export default MealCardSkeleton;
