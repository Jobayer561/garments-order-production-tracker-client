import OrdersDataRow from "@/components/Dashboard/TableRows/OrdersDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const ManageAllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", searchText, status, currentPage],
    queryFn: async () => {
      const res = await axiosSecure(
        `/orders?searchText=${searchText}&status=${status}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const orders = data.orders || [];
  const totalOrders = data.totalOrders || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, status]);

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#3badcd] mb-2">
                All Orders
              </h1>
              <p className="font-semibold">
                Total Orders:{" "}
                <span className="text-[#3badcd] font-bold">{totalOrders}</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm border border-gray-300 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Search Orders
                </label>
                <input
                  type="search"
                  placeholder="Search by user or email..."
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg input input-info  "
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Filter By Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg select select-info focus:ring-2 focus:ring-[#3badcd]"
                >
                  <option value="">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border border-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left">Order ID</th>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Product</th>
                      <th className="px-6 py-4 text-left">Quantity</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <OrdersDataRow
                          key={order._id}
                          order={order}
                          refetch={refetch}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 p-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-4 py-2 rounded bg-slate-200 disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === page + 1
                          ? "bg-[#3badcd] text-white"
                          : "bg-slate-100"
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-4 py-2 rounded bg-slate-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAllOrders;
