import React from "react";
import { Link } from "react-router";

const ApproveOrdersDataRow = ({ order, refetch }) => {

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
        <p className=" font-semibold">{order?.approvedAt}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 mr-2 mb-2  font-normal md:font-semibold  leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] opacity-80 rounded-full"
          ></span>
          <Link
            // to={`/dashboard/orders/${order._id}`}
            className="relative whitespace-nowrap text-white"
          >
            View Tracking
          </Link>
        </span>

        <button
          //   onClick={() => handleUpdateStatus("approved")}
          //   disabled={order.status !== "pending"}
          className="relative inline-block px-3 py-1 mr-2 mb-2 font-semibold leading-tight disabled:opacity-50"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-400 rounded-full"
          ></span>
          <span className="relative text-white">Add Tracking</span>
        </button>
      </td>
    </tr>
  );
};

export default ApproveOrdersDataRow;
