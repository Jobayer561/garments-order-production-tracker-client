import UpdateUserStatusModal from "@/components/Modal/UpdateUserStatusModal";

const OrdersDataRow = ({ refetch, order }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="font-semibold">{order?._id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="text-gray-500 font-semibold">{order?.buyer?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="text-gray-500 font-semibold">{order?.product.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <p className="text-gray-500 font-semibold">{order?.quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            order?.status === "approve"
              ? "bg-green-100 text-green-600"
              : order?.status === "suspend"
              ? "bg-red-100 text-red-600"
              : order?.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {order?.status}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-2 font-normal md:font-semibold text-white leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#3badcd] opacity-80 rounded-full"
          ></span>
          <span className="relative">UpdateStatus</span>
        </span>
      </td>
    </tr>
  );
};

export default OrdersDataRow;
