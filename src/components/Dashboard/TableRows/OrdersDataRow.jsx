import UpdateUserStatusModal from "@/components/Modal/UpdateUserStatusModal";
import { Link } from "react-router";

const OrdersDataRow = ({ order }) => {
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

      <td className="px-5 py-5 border-b border-gray-300  text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-2 font-normal md:font-semibold  leading-tight">
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
      </td>
    </tr>
  );
};

export default OrdersDataRow;
