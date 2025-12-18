import BuyerOrderDataRow from "@/components/Dashboard/TableRows/BuyerOrderDataRow";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useStatus from "@/hooks/useStatus";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const { user } = useAuth();
  const [status] = useStatus();
  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure(`/my-orders?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log("from my order", user);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log("from status", status);
  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold  text-[#3badcd]">My Orders</h1>
            <p className="mt-2 ">Track and manage your orders</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200  shadow-sm">
            <table className="min-w-full d">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-center text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300   uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold border-b border-gray-300  uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 ">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-4 rounded-full ">
                          <svg
                            className="h-8 w-8 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold  ">
                            No Orders Found
                          </p>
                          <p className="text-sm  mt-1">
                            You haven't placed any orders yet
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <BuyerOrderDataRow
                      isLoading={isLoading}
                      refetch={refetch}
                      key={order._id}
                      order={order}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
