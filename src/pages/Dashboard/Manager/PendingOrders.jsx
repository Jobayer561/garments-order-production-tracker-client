import PendingOrdersDataRow from "@/components/Dashboard/TableRows/PendingOrdersDataRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PendingOrders = () => {
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/orders-pending`
      );
      console.log(result.data);
      return result.data;
    },
  });
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Product
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Order Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200   text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <PendingOrdersDataRow
                      key={order._id}
                      order={order}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;
