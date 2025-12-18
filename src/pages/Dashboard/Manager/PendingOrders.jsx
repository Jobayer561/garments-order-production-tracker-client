import PendingOrdersDataRow from "@/components/Dashboard/TableRows/PendingOrdersDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PendingOrders = () => {
  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", "pending"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/orders-pending`
      );
      return result.data;
    },
  });
  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-2xl font-bold mb-2 text-center text-[#3badcd]">
                Pending Orders
              </h1>
              <p className="font-semibold">
                Total Pending:{" "}
                <span className="font-bold text-[#3badcd]">
                  {orders.length}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="backdrop-blur border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Order Id
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        User
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Order Date
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200/20 [&>tr]:transition [&>tr]:bg-white/5 [&>tr:hover]:bg-white/10">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
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
                            <p className="font-medium">No pending orders</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <PendingOrdersDataRow
                          key={order._id}
                          order={order}
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

export default PendingOrders;
