import OrdersDataRow from "@/components/Dashboard/TableRows/OrdersDataRow";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ManageAllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", searchText, status],
    queryFn: async () => {
      const res = await axiosSecure(
        `/orders?searchText=${searchText}&status=${status}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-4">
                <div className="w-full md:w-1/4">
                  <p className="mb-2 font-semibold">Search User</p>
                  <label className="input input-info flex items-center gap-2 w-full">
                    <svg
                      className="h-4 w-4 opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </g>
                    </svg>
                    <input
                      type="search"
                      placeholder="Search by name or email"
                      className="grow"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </label>
                </div>

                <div className="w-full md:w-1/4">
                  <p className="mb-2 font-semibold">Filter By Role</p>
                  <select
                    className="select select-info w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All Orders</option>
                    <option value="pending">pending</option>
                    <option value="approve">approve</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6">
                        No Orders found
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAllOrders;
