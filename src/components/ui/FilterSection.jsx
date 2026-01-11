import { useState } from "react";
import {
  FiFilter,
  FiDollarSign,
  FiTag,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    deliveryTime: "",
    rating: "",
    location: "",
  });

  const categories = [
    "All",
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Dessert",
    "Appetizer",
  ];
  const priceRanges = [
    "Any",
    "Under ৳500",
    "৳500 - ৳1000",
    "৳1000 - ৳2000",
    "৳2000+",
  ];
  const deliveryTimes = [
    "Any",
    "Under 30 mins",
    "30-45 mins",
    "45-60 mins",
    "60+ mins",
  ];
  const ratings = ["Any", "4+ Stars", "3+ Stars", "2+ Stars"];
  const locations = ["Any", "City Center", "Suburbs", "Downtown", "Uptown"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const reset = {
      category: "",
      priceRange: "",
      deliveryTime: "",
      rating: "",
      location: "",
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <FiFilter className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white">
              Filter Options
            </h3>
            <p className="text-sm text-neutral-500">Refine your meal search</p>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
          >
            {priceRanges.map((range) => (
              <option key={range} value={range === "Any" ? "" : range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Time Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Delivery Time
          </label>
          <select
            value={filters.deliveryTime}
            onChange={(e) => handleFilterChange("deliveryTime", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
          >
            {deliveryTimes.map((time) => (
              <option key={time} value={time === "Any" ? "" : time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
          >
            {ratings.map((rating) => (
              <option key={rating} value={rating === "Any" ? "" : rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === "Any" ? "" : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applied Filters */}
      {Object.values(filters).some((f) => f) && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Applied Filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(
              ([key, value]) =>
                value && (
                  <span
                    key={key}
                    className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-500 rounded-full text-sm flex items-center gap-2"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(key, "")}
                      className="hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
