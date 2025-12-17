import { useState } from "react";
import CancelOrder from "@/components/Modal/CancelOrder";
import { Link } from "react-router";

const BuyerOrderDataRow = ({ order, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className=" transition-colors duration-150">
      <td className="px-5 py-4 border-b border-slate-200  text-sm font-medium  ">
        <span className="font-medium text-xs">{order._id}</span>
      </td>

      <td className="px-5 py-4 border-b border-slate-200  text-sm">
        <p className="  font-medium truncate max-w-xs">
          {order?.product?.name}
        </p>
      </td>

      <td className="px-5 py-4 border-b border-slate-200  text-sm text-center">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100  text-blue-700 font-semibold">
          {order?.quantity}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            order?.status === "approved"
              ? "bg-green-100 text-green-600"
              : order?.status === "rejected"
              ? "bg-red-100 text-red-600"
              : order?.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {order?.status}
        </span>
      </td>

      <td className="px-5 py-4 border-b border-slate-200 font-semibold  text-sm">
        <p className="">{order?.paymentMethod}</p>
      </td>

      <td className="px-5 py-4 border-b border-slate-200  text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 font-normal md:font-semibold  leading-tight mr-2">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] opacity-80  rounded-full"
          ></span>
          <Link
            to={`/dashboard/orders/${order._id}`}
            className="relative whitespace-nowrap text-white"
          >
            View Details
          </Link>
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1 font-semibold text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Cancel</span>
        </button>

        <CancelOrder
          isOpen={isOpen}
          closeModal={closeModal}
          order={order}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default BuyerOrderDataRow;
