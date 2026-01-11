import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import MealCard from "../components/ui/MealCard";
import MealCardSkeleton from "../components/ui/MealCardSkeleton";
import FilterSection from "../components/ui/FilterSection";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiList,
} from "react-icons/fi";

const Meals = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    deliveryTime: "",
    rating: "",
    location: "",
  });

  // Build query string from filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (page) params.append("page", page);
    if (filters.category) params.append("category", filters.category);
    if (filters.priceRange) params.append("priceRange", filters.priceRange);
    if (filters.deliveryTime)
      params.append("deliveryTime", filters.deliveryTime);
    if (filters.rating) params.append("rating", filters.rating);
    if (filters.location) params.append("location", filters.location);
    params.append("limit", viewMode === "grid" ? "12" : "6");
    return params.toString();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["meals", search, sort, page, filters, viewMode],
    queryFn: async () => {
      const queryString = buildQueryString();
      const res = await axiosSecure.get(`/meals?${queryString}`);
      return res.data;
    },
  });

  const totalPages = data
    ? Math.ceil(data.total / (viewMode === "grid" ? 12 : 6))
    : 0;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Discover Delicious Meals
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Explore a variety of homemade meals crafted by passionate local
            chefs
          </p>
        </div>

        {/* Main Search & Controls */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search meals by name, ingredients, or chef..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
              />
            </div>

            {/* Sort & View Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors appearance-none"
                >
                  <option value="">Sort by: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary-500 text-white"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    viewMode === "list"
                      ? "bg-primary-500 text-white"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}
                >
                  <FiList className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <FilterSection onFilterChange={handleFilterChange} />

        {/* Results Summary */}
        {data && (
          <div className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            Showing {data.meals?.length || 0} of {data.total || 0} meals
          </div>
        )}

        {/* Meals Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {data?.meals?.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.meals.map((meal) => (
                      <MealCard key={meal._id} meal={meal} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data.meals.map((meal) => (
                      <div
                        key={meal._id}
                        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <Link to={`/meal/${meal._id}`} className="block">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-64 flex-shrink-0">
                              <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                    {meal.foodName}
                                  </h3>
                                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                    {meal.shortDescription ||
                                      "Delicious homemade meal prepared with fresh ingredients"}
                                  </p>
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-2xl font-bold text-primary-600">
                                      ৳{meal.price}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <FiFilter className="w-4 h-4 text-neutral-400" />
                                      <span className="text-neutral-600 dark:text-neutral-400">
                                        {meal.category || "Main Course"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-neutral-600 dark:text-neutral-400">
                                        By {meal.chefName}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="md:w-40">
                                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Page {page} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                        Previous
                      </button>

                      <div className="flex items-center gap-2">
                        {Array.from(
                          { length: Math.min(totalPages, 5) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (page <= 3) {
                              pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = page - 2 + i;
                            }
                            return (
                              <button
                                key={i}
                                onClick={() => setPage(pageNum)}
                                className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                                  page === pageNum
                                    ? "bg-primary-500 text-white shadow-lg"
                                    : "border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-primary-500"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                        {totalPages > 5 && (
                          <span className="px-3 text-neutral-500">...</span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={page === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
                  No meals found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Try adjusting your search or filter to find what you're
                  looking for
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSort("");
                    setFilters({
                      category: "",
                      priceRange: "",
                      deliveryTime: "",
                      rating: "",
                      location: "",
                    });
                    setPage(1);
                  }}
                  className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Meals;
