import { ChefHat } from "lucide-react";

const LoadingSpinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
    <div className="relative mb-6">
      <div className="w-16 h-16 border-4 border-primary-100 rounded-full"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ChefHat className="w-8 h-8 text-primary-500" />
      </div>
    </div>

    <div className="text-center space-y-2">
      <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
        Loading delicious content...
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Fresh meals are worth the wait!
      </p>
    </div>
  </div>
);

export default LoadingSpinner;
