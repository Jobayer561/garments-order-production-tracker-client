import ApproveOrdersDataRow from "@/components/Dashboard/TableRows/ApproveOrdersDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ApproveOrders = () => {
  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", "approved"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/approve-orders`
      );
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
              <h1 className="text-3xl sm:text-2xl font-bold mb-2 text-center text-[#3badcd]">
                Approved Orders
              </h1>
              <p className="font-semibold">
                Total Approved:{" "}
                <span className="font-bold text-[#3badcd]">
                  {orders.length}
                </span>
              </p>
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
                        Approved Date
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide uppercase text-xs ">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200/20 [&>tr]:transition [&>tr]:bg-white/5 [&>tr:hover]:bg-white/10">
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-12 text-center text-slate-200"
                        >
                          No approved orders
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <ApproveOrdersDataRow
                          key={order._id}
                          order={order}
                          refetch={refetch}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {isFetching && (
                <div className="flex justify-center py-6 border-t border-slate-200">
                  <LoadingSpinner />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveOrders;
