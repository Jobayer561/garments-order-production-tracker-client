import ProductDataRow from "@/components/Dashboard/TableRows/ProductDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ManageProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", searchText, category],
    queryFn: async () => {
      const res = await axiosSecure(
        `/manager-created?email=${user?.email}&search=${searchText}&category=${category}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-2xl font-bold mb-2 text-center text-[#3badcd]">
                Manager Products
              </h1>
              <p className="font-semibold">
                Total Products:{" "}
                <span className="font-bold text-[#3badcd]">
                  {products.length}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Search Products
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by name or email..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3badcd] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Filter By Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3badcd] focus:border-transparent transition"
                >
                  <option value="" className="text-[#3badcd] font-semibold">
                    All categories
                  </option>
                  <option value="Shirt" className="text-[#3badcd] font-semibold">
                    Shirt
                  </option>
                  <option value="Pant" className="text-[#3badcd] font-semibold">
                    Pant
                  </option>
                  <option value="Jacket" className="text-[#3badcd] font-semibold">
                    Jacket
                  </option>
                  <option value="Blazer" className="text-[#3badcd] font-semibold">
                    Blazer
                  </option>
                  <option value="Saree" className="text-[#3badcd] font-semibold">
                    Saree
                  </option>
                  <option value="Gown" className="text-[#3badcd] font-semibold">
                    Gown
                  </option>
                  <option value="Palazoo" className="text-[#3badcd] font-semibold">
                    Palazoo
                  </option>
                  <option value="Belt" className="text-[#3badcd] font-semibold">
                    Belt
                  </option>
                  <option value="Other" className="text-[#3badcd] font-semibold">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="backdrop-blur border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Payment Mode
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <svg
                              className="h-12 w-12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6h-6M9 20h6m0 0h5v-2a3 3 0 00-5.856-1.487M9 6a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <p className="font-medium">No products found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <ProductDataRow
                          refetch={refetch}
                          key={product._id}
                          product={product}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

           
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
