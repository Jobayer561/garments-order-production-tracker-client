import useAxiosSecure from "@/hooks/useAxiosSecure";
import useStatus from "@/hooks/useStatus";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const PendingOrdersDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [status] = useStatus();
  const handleUpdateStatus = (status) => {
    axiosSecure
      .patch(`/orders-pending/${order._id}`, { status })
      .then(() => {
        refetch();
        toast.success(`Order ${status} successfully`);
      })
      .catch(() => {
        toast.error("Failed to update order status");
      });
  };
  return (
    <tr>
      <td className="px-6 py-4 text-sm  border-b border-gray-300 font-semibold align-middle truncate max-w-[150px]">
        {order?._id}
      </td>
      <td className="px-6 py-4 text-sm  border-b border-gray-300 font-semibold align-middle ">
        {order?.buyer?.name}
      </td>
      <td className="px-6 py-4 text-sm  border-b border-gray-300 font-semibold align-middle ">
        {order?.buyer?.email}
      </td>
      <td className="px-6 py-4 text-sm  border-b border-gray-300 font-semibold align-middle ">
        {order?.product.name}
      </td>
      <td className="px-5 py-4 border-b border-slate-200  text-sm text-center">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100  text-blue-700 font-semibold">
          {order?.quantity}
        </span>
      </td>
      <td className="px-6 py-4 text-sm  border-b border-gray-300 font-semibold align-middle whitespace-nowrap ">
        {order?.createdAt}
      </td>

      <td className="px-6 py-4 text-sm  border-b border-gray-300 align-middle whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Link
            to={`/dashboard/orders/${order._id}`}
            className="inline-flex items-center rounded-full bg-[#3badcd] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3badcd]"
          >
            View
          </Link>
          <button
            onClick={() => handleUpdateStatus("approved")}
            disabled={status !== "approve"}
            className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
          >
            Approve
          </button>

          <button
            onClick={() => handleUpdateStatus("rejected")}
            disabled={status !== "approve"}
            className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PendingOrdersDataRow;
