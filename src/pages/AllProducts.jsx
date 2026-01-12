import Card from "@/components/Home/Card";
import CardSkeleton from "@/components/Home/CardSkeleton";
import Container from "@/components/Shared/Container";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      {
        searchTerm,
        category,
        priceFilter,
        availability,
        sortBy,
        currentPage,
        pageSize,
      },
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        limit: pageSize,
        sort: sortBy,
      };

      const trimmedSearch = searchTerm.trim();
      if (trimmedSearch) params.search = trimmedSearch;
      if (category !== "all") params.category = category;
      if (availability !== "all") params.availability = availability;
      if (priceFilter !== "all") params.priceRange = priceFilter;

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/allProducts`,
        { params }
      );
      return result.data;
    },
    keepPreviousData: true,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? items.length;
  const totalPages = data?.pages ?? 1;

  const categories = useMemo(() => {
    const unique = new Set();
    items.forEach((item) => {
      if (item?.category) {
        unique.add(item.category);
      }
    });
    return ["all", ...Array.from(unique)];
  }, [items]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, priceFilter, availability, sortBy]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev") return Math.max(1, prev - 1);
      return Math.min(totalPages, prev + 1);
    });
  };

  if (isLoading) {
    return (
      <Container>
        <div className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#3BADCD] mt-8">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-2 md:px-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} index={index} />
            ))}
          </div>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#3BADCD] mt-8">
          All Products
        </h2>
        <div className="mx-auto max-w-7xl px-2 md:px-6">
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur shadow-sm ring-1 ring-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description"
                  aria-label="Search products"
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur input input-info text-sm shadow-sm hover:shadow-md transition-all duration-300 ease-out focus:border-[#3BADCD] focus:ring-4 focus:ring-[#3BADCD]/30 focus:shadow-[0_8px_24px_rgba(59,173,205,0.25)] placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white select select-info text-sm shadow-sm transition focus:border-[#3BADCD] focus:ring-2 focus:ring-[#3BADCD]/30 text-gray-500"
                >
                  {categories.map((option) => (
                    <option
                      className="text-gray-500"
                      key={option}
                      value={option}
                    >
                      {option === "all" ? "All categories" : option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white select select-info text-sm shadow-sm transition focus:border-[#3BADCD] focus:ring-2 focus:ring-[#3BADCD]/30 text-gray-500"
                >
                  <option value="all">Any price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-250">$100 - $250</option>
                  <option value="250+">$250+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Availability
                </span>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white select select-info text-sm shadow-sm transition focus:border-[#3BADCD] focus:ring-2 focus:ring-[#3BADCD]/30 text-gray-500"
                >
                  <option value="all">Availability</option>
                  <option value="in-stock">In stock</option>
                  <option value="out-of-stock">Out of stock</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-gray-100 px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3BADCD]/10 px-3 py-1 font-semibold text-[#0f172a]">
                  <span className="h-2 w-2 rounded-full bg-[#3BADCD]"></span>
                  {total} products
                </span>
                <span className="hidden md:inline text-gray-400">|</span>
                <span className="text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-[#3BADCD] focus:ring-2 focus:ring-[#3BADCD]/30 text-gray-500"
                >
                  <option value="name-asc">Sort: Name A-Z</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="stock-desc">Stock: High to Low</option>
                </select>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("all");
                    setPriceFilter("all");
                    setAvailability("all");
                    setSortBy("name-asc");
                    setCurrentPage(1);
                  }}
                  className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#3BADCD] hover:text-[#3BADCD]"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-2 md:px-6">
            {items.map((product, idx) => (
              <Card
                key={product._id}
                product={product}
                index={(currentPage - 1) * pageSize + idx}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-gray-500 shadow-sm">
            No products match your filters.
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#3BADCD] hover:text-[#3BADCD]"
            >
              Prev
            </button>
            <span className="text-sm font-semibold text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#3BADCD] hover:text-[#3BADCD]"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default AllProducts;
