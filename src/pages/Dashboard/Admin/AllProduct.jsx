import AllProductsDataRow from "@/components/Dashboard/TableRows/AllProductsDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllProduct = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/allProducts`);
      return result.data;
    },
    keepPreviousData: true,
  });
  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-2xl font-bold mb-2 text-[#3badcd]">
                All Products
              </h1>
              <p className="font-semibold">Total Products: {products.length}</p>
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
                <table className="min-w-full text-sm">
                  <thead className="backdrop-blur border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Product Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Created By
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Show On Home
                      </th>

                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200/20 [&>tr]:transition [&>tr]:bg-white/5 [&>tr:hover]:bg-white/10">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          No products found
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <AllProductsDataRow
                          key={product._id}
                          product={product}
                          refetch={refetch}
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

export default AllProduct;
