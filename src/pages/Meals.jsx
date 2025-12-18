import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import MealCard from "../components/ui/MealCard";
import { Link } from "react-router-dom";

const Meals = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["meals", search, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meals?page=${page}&limit=10&search=${search}&sort=${sort}`
      );
      return res.data;
    },
  });

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">All Meals</h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input input-bordered w-full md:w-96"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="select select-bordered"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Meals Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data?.meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn ${
                page === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
