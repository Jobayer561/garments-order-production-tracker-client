import DeleteModal from "@/components/Modal/DeleteModal";
import UpdateProductModal from "@/components/Modal/UpdateProductModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const PendingOrdersDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleUpdateStatus = (status) => {
    axiosSecure
      .get(`/orders-pending/${order._id}`, { status })
      .then(() => {
        toast.success(`Order ${status} successfully`);
        refetch();
      })
      .catch(() => {
        toast.error("Failed to update order status");
      });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className="font-semibold">{order?._id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className=" font-semibold">{order?.buyer?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className=" font-semibold">{order?.buyer?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className=" font-semibold">{order?.product.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className=" font-semibold">{order?.quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <p className=" font-semibold">{order?.createdAt}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 mr-2 mb-2  font-normal md:font-semibold  leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] opacity-80 rounded-full"
          ></span>
          <Link
            to={`/dashboard/orders/${order._id}`}
            className="relative whitespace-nowrap text-white"
          >
            View
          </Link>
        </span>

        <button
          onClick={() => handleUpdateStatus("approved")}
          disabled={order.status !== "pending"}
          className="relative inline-block px-3 py-1 mr-2 mb-2 font-semibold leading-tight disabled:opacity-50"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-400 rounded-full"
          ></span>
          <span className="relative text-white">Approve</span>
        </button>

        <button
          onClick={() => handleUpdateStatus("rejected")}
          disabled={order.status !== "pending"}
          className="relative inline-block px-3 py-1 font-semibold leading-tight disabled:opacity-50"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-400 rounded-full"
          ></span>
          <span className="relative text-white">Reject</span>
        </button>
      </td>
    </tr>
  );
};

export default PendingOrdersDataRow;
